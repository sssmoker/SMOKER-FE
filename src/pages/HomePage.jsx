import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Map from "@/components/HomeMap/Map"
import SearchBar from "@/components/common/SearchBar"
import AgreementToast from "@/components/common/toast/AgreementToast"
import ComButton from "@/components/common/button/ComButton"
import MarkerInfoCard from "@/components/HomeMap/MarkerInfoCard"
import MarkerPopup from "@/components/HomeMap/MarkerPopup"

export default function HomePage() {
	// 실제 위치 (geolocation API 결과)
	const [currentLocation, setCurrentLocation] = useState(null)
	// 지도 중심(lookLocation): 사용자가 드래그/줌 또는 마커 클릭 시 업데이트됨
	const [lookLocation, setLookLocation] = useState({
		userLat: 37.546,
		userLng: 127.071,
	})
	// "내 주변" 버튼 등으로 사용될 좌표 (필요시)
	const [moveToLocation, setMoveToLocation] = useState(null)
	const [showAgreementToast, setShowAgreementToast] = useState(
		localStorage.getItem("locationAgreement") !== "true",
	)
	// 마커 클릭 시 선택된 마커 정보 (MarkerPopup 및 MarkerInfoCard 렌더링 조건)
	const [selectedMarker, setSelectedMarker] = useState(null)
	// MarkerInfoCard 표시 여부 (닫기 버튼 클릭 시 false로 변경)
	const [showInfoCard, setShowInfoCard] = useState(false)
	const navigate = useNavigate()

	// ① 사용자의 현재 위치 받아오기
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				({ coords: { latitude, longitude } }) => {
					const loc = { userLat: latitude, userLng: longitude }
					setCurrentLocation(loc)
					// 위치 동의한 경우 초기 지도 중심을 사용자의 위치로 설정
					if (localStorage.getItem("locationAgreement") === "true") {
						setLookLocation(loc)
					}
				},
				(error) => console.error("Geolocation error:", error),
				{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
			)
		} else {
			console.error("Geolocation not supported.")
		}
	}, [])

	// ② "내 주변" 버튼 클릭 시
	const handleMoveToCurrentLocation = () => {
		const loc =
			localStorage.getItem("locationAgreement") === "true" && currentLocation
				? currentLocation
				: { userLat: 37.546, userLng: 127.071 }
		setLookLocation(loc)
	}

	// ③ 동의 처리 시
	const handleAgreementConfirm = (isChecked) => {
		localStorage.setItem("locationAgreement", isChecked ? "true" : "false")
		const loc =
			isChecked && currentLocation
				? currentLocation
				: { userLat: 37.546, userLng: 127.071 }
		setLookLocation(loc)
		setShowAgreementToast(false)
	}

	// ④ 마커 클릭 시: 먼저 중심을 업데이트한 후 300ms 후에 팝업/InfoCard를 띄운다.
	const handleMarkerClick = (maker) => {
		// 중심 업데이트
		setLookLocation({
			userLat: maker.location.latitude,
			userLng: maker.location.longitude,
		})
		// 300ms 후에 마커 정보를 저장하고 InfoCard를 띄움
		setTimeout(() => {
			const marker = {
				id: maker.smokingId,
				title: maker.name,
				rating: maker.rating || 0,
				reviews: maker.reviews || 0,
				distance: maker.distance || 0,
				latitude: maker.location.latitude,
				longitude: maker.location.longitude,
			}
			setSelectedMarker(marker)
			setShowInfoCard(true)
		}, 300)
	}

	// ⑤ InfoCard 닫기 시: InfoCard만 닫고, Popup은 계속 유지하려면 selectedMarker는 그대로 둔다.
	const handleCloseMarkerInfo = () => {
		setShowInfoCard(false)
	}

	// API 조회 및 마커 필터링 기준은 lookLocation을 사용함
	const apiLocation = lookLocation

	return (
		<div className="relative h-screen w-full bg-gray-100">
			{showAgreementToast && (
				<AgreementToast
					isVisible={showAgreementToast}
					onConfirm={handleAgreementConfirm}
					onCancel={() => navigate("/login")}
				/>
			)}
			<SearchBar onMoveToCurrentLocation={handleMoveToCurrentLocation} />
			<div className="h-full">
				<Map
					currentLocation={apiLocation}
					onMarkerClick={handleMarkerClick}
					onLookLocationChange={setLookLocation}
				/>
			</div>
			{/* MarkerPopup은 selectedMarker가 있으면 항상 표시 */}
			{selectedMarker && <MarkerPopup marker={selectedMarker} />}
			<div className="fixed bottom-[12vh] left-1/2 z-50 flex w-auto max-w-[380px] -translate-x-1/2 justify-center px-4">
				<ComButton size="m" color="purple" onClick={() => navigate("/list")}>
					목록 보기
				</ComButton>
			</div>
			{/* MarkerInfoCard는 selectedMarker와 showInfoCard가 true일 때 하단 중앙에 표시 */}
			{selectedMarker && showInfoCard && (
				<div className="fixed bottom-[22vh] left-1/2 z-50 w-full max-w-[500px] -translate-x-1/2 px-4">
					<MarkerInfoCard {...selectedMarker} onClose={handleCloseMarkerInfo} />
				</div>
			)}
		</div>
	)
}
