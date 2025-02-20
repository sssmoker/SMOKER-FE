import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Map from "@/components/HomeMap/Map"
import SearchBar from "@/components/common/SearchBar"
import AgreementToast from "@/components/common/toast/AgreementToast"
import ComButton from "@/components/common/button/ComButton"
import MarkerInfoCard from "@/components/HomeMap/MarkerInfoCard"
import MarkerPopup from "@/components/HomeMap/MarkerPopup"

export default function HomePage() {
	// currentLocation: 실제 사용자의 위치 (geolocation 결과)
	const [currentLocation, setCurrentLocation] = useState(null)
	// lookLocation: 지도 중심으로 사용되는 좌표 (사용자가 드래그하거나, 마커 클릭 시 업데이트)
	const [lookLocation, setLookLocation] = useState({
		userLat: 37.546,
		userLng: 127.071,
	})
	const [showAgreementToast, setShowAgreementToast] = useState(
		localStorage.getItem("locationAgreement") !== "true",
	)
	const [selectedMarker, setSelectedMarker] = useState(null)
	const [showInfoCard, setShowInfoCard] = useState(false)
	const navigate = useNavigate()

	// 1. 사용자의 현재 위치 받아오기 (Geolocation API)
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				({ coords: { latitude, longitude } }) => {
					console.log("Current location:", latitude, longitude)
					const loc = { userLat: latitude, userLng: longitude }
					setCurrentLocation(loc)
					// 위치 사용 동의한 경우 초기 지도 중심도 사용자의 위치로 설정
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

	// 2. "내 주변" 버튼: 동의 여부에 따라 현재 위치(또는 기본 좌표)를 지도 중심(lookLocation)으로 설정
	const handleMoveToCurrentLocation = () => {
		const loc =
			localStorage.getItem("locationAgreement") === "true" && currentLocation
				? currentLocation
				: { userLat: 37.546, userLng: 127.071 }
		console.log("Moving to location:", loc)
		setLookLocation(loc)
	}

	// 3. 동의 처리: 동의 시 현재 위치를, 아니면 기본 좌표를 지도 중심으로 설정
	const handleAgreementConfirm = (isChecked) => {
		localStorage.setItem("locationAgreement", isChecked ? "true" : "false")
		const loc =
			isChecked && currentLocation
				? currentLocation
				: { userLat: 37.546, userLng: 127.071 }
		setLookLocation(loc)
		setShowAgreementToast(false)
	}

	// 4. 마커 클릭: 클릭한 마커의 정보를 HomePage의 상태로 저장하고, 지도 중심(lookLocation)을 해당 마커 위치로 변경
	const handleMarkerClick = (maker) => {
		const marker = {
			id: maker.smokingId,
			title: maker.name,
			rating: maker.rating || 0,
			reviews: maker.reviews || 0,
			distance: maker.distance || 0,
			latitude: maker.location.latitude,
			longitude: maker.location.longitude,
		}
		console.log("Converted marker:", marker)
		setSelectedMarker(marker)
		setShowInfoCard(true)
		// 마커 클릭 시 지도 중심을 해당 마커 위치로 변경하여, 이후 1km 반경 계산에 반영
		setLookLocation({
			userLat: maker.location.latitude,
			userLng: maker.location.longitude,
		})
	}

	// 5. MarkerInfoCard 닫기
	const handleCloseMarkerInfo = () => {
		setShowInfoCard(false)
		// 만약 MarkerPopup도 함께 닫고 싶다면 setSelectedMarker(null) 호출 가능
	}

	// API 조회 및 마커 필터링 기준은 "lookLocation"을 사용함
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
			{selectedMarker && <MarkerPopup marker={selectedMarker} />}
			<div className="fixed bottom-[12vh] left-1/2 z-50 flex w-auto max-w-[380px] -translate-x-1/2 justify-center px-4">
				<ComButton size="m" color="purple" onClick={() => navigate("/list")}>
					목록 보기
				</ComButton>
			</div>
			<div className="fixed bottom-[12vh] left-1/2 z-50 flex w-auto max-w-[380px] -translate-x-1/2 justify-center px-4">
				{selectedMarker && showInfoCard && (
					<div className="fixed bottom-[12vh] left-1/2 z-50 flex w-auto max-w-[380px] -translate-x-1/2 justify-center px-4">
						<MarkerInfoCard
							{...selectedMarker}
							onClose={handleCloseMarkerInfo}
						/>
					</div>
				)}
			</div>
		</div>
	)
}
