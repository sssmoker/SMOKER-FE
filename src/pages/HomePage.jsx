import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SearchBar from "@/components/common/SearchBar"
import Map from "@/components/HomeMap/Map"
import AgreementToast from "@/components/common/toast/AgreementToast"
import ComButton from "@/components/common/button/ComButton"
import MarkerInfoCard from "@/components/HomeMap/MarkerInfoCard"
import MarkerPopup from "@/components/HomeMap/MarkerPopup"

export default function HomePage() {
	const [markerData, setMarkerData] = useState([])
	const [currentLocation, setCurrentLocation] = useState(null)
	const [moveToLocation, setMoveToLocation] = useState(null)
	const [showAgreementToast, setShowAgreementToast] = useState(
		localStorage.getItem("locationAgreement") !== "true",
	)
	const [selectedMarker, setSelectedMarker] = useState(null)

	const navigate = useNavigate()

	// ✅ 마커 데이터를 가져오는 useEffect
	useEffect(() => {
		const fetchData = async () => {
			await fetchLocationData()
			await fetchMarkerData()
		}
		fetchData()
	}, [])

	// ✅ 현재 위치 데이터를 불러오는 함수
	const fetchLocationData = async () => {
		try {
			const res = await fetch("http://localhost:3001/currentLocation")
			if (!res.ok) throw new Error("Failed to fetch current location")
			const data = await res.json()
			setCurrentLocation(data)
		} catch (error) {
			console.error("🚨 현재 위치 데이터 로드 실패:", error)
		}
	}

	// ✅ 흡연 구역 마커 데이터를 불러오는 함수
	const fetchMarkerData = async () => {
		try {
			const res = await fetch("http://localhost:3001/smokingAreas")
			if (!res.ok) throw new Error("Failed to fetch marker data")
			const data = await res.json()
			setMarkerData(
				data.map((marker) => ({
					id: marker.smoking_id,
					title: marker.smoking_name,
					region: marker.region,
					latitude: marker.latitude,
					longitude: marker.longitude,
					rating: marker.rating,
					distance: marker.distance || 0,
					image: marker.image,
				})),
			)
		} catch (error) {
			console.error("🚨 마커 데이터 로드 실패:", error)
		}
	}

	// ✅ 위치 동의 확인 후 이동
	const handleAgreementConfirm = (isChecked) => {
		localStorage.setItem("locationAgreement", isChecked ? "true" : "false")
		setMoveToLocation(
			isChecked ? currentLocation : { lat: 37.5665, lng: 126.978 },
		)
		setShowAgreementToast(false)
	}

	// ✅ 현재 위치로 이동
	const handleMoveToCurrentLocation = () => {
		if (!currentLocation) return
		setMoveToLocation({
			lat: currentLocation.userLat,
			lng: currentLocation.userLng,
		})
	}

	// ✅ 리스트 페이지 이동
	const handleListPageNavigation = () => navigate("/list")

	// ✅ 마커 클릭 시 동작
	const handleMarkerClick = (marker) => {
		console.log("📍 마커 클릭됨:", marker) // ✅ 디버깅 로그 추가
		setSelectedMarker(marker)
	}

	// ✅ 마커 정보 카드 닫기
	const handleCloseMarkerInfo = () => {
		console.log("❌ 마커 정보 카드 닫기")
		setSelectedMarker(null)
	}

	return (
		<div className="relative h-screen w-full bg-gray-100">
			{/* ✅ 위치 동의 팝업 */}
			{showAgreementToast && (
				<AgreementToast
					isVisible={showAgreementToast}
					onConfirm={handleAgreementConfirm}
					onCancel={() => navigate("/login")}
				/>
			)}

			{/* ✅ 검색 바 */}
			<SearchBar onMoveToCurrentLocation={handleMoveToCurrentLocation} />

			{/* ✅ 지도 */}
			<Map
				markers={markerData}
				currentLocation={currentLocation}
				moveToLocation={moveToLocation}
				onMarkerClick={handleMarkerClick}
			/>

			{/* ✅ 마커 팝업 */}
			{selectedMarker && <MarkerPopup marker={selectedMarker} />}

			{/* ✅ 하단 UI (목록 버튼 & 마커 정보 카드) */}
			<div className="fixed bottom-[12vh] left-1/2 z-50 flex w-auto max-w-[380px] -translate-x-1/2 justify-center px-4">
				{selectedMarker ? (
					<div className="translate-y-0 opacity-100 transition-all duration-500">
						<MarkerInfoCard
							{...selectedMarker}
							onClose={handleCloseMarkerInfo}
						/>
					</div>
				) : (
					<div className="opacity-100 transition-opacity duration-500">
						<ComButton
							size="m"
							color="purple"
							onClick={handleListPageNavigation}
						>
							목록 보기
						</ComButton>
					</div>
				)}
			</div>
		</div>
	)
}
