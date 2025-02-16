import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Map from "@/components/HomeMap/Map"
import SearchBar from "@/components/common/SearchBar"
import AgreementToast from "@/components/common/toast/AgreementToast"
import ComButton from "@/components/common/button/ComButton"
import MarkerInfoCard from "@/components/HomeMap/MarkerInfoCard"
import MarkerPopup from "@/components/HomeMap/MarkerPopup"

export default function HomePage() {
	const [currentLocation, setCurrentLocation] = useState(null)
	const [moveToLocation, setMoveToLocation] = useState(null)
	const [showAgreementToast, setShowAgreementToast] = useState(
		localStorage.getItem("locationAgreement") !== "true",
	)
	const [selectedMarker, setSelectedMarker] = useState(null)
	const [showInfoCard, setShowInfoCard] = useState(false)
	const navigate = useNavigate()

	// 현재 위치 받아오기 (Geolocation API)
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				({ coords: { latitude, longitude } }) => {
					console.log("Current location:", latitude, longitude)
					setCurrentLocation({ userLat: latitude, userLng: longitude })
				},
				(error) => console.error("Geolocation error:", error),
				{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
			)
		} else {
			console.error("Geolocation not supported.")
		}
	}, [])

	// "내 주변" 버튼 클릭 시 사용 위치(동의 여부에 따라)를 moveToLocation에 업데이트
	const handleMoveToCurrentLocation = () => {
		const loc =
			localStorage.getItem("locationAgreement") === "true" && currentLocation
				? currentLocation
				: { userLat: 37.546, userLng: 127.071 }
		console.log("Moving to location:", loc)
		setMoveToLocation({ lat: loc.userLat, lng: loc.userLng })
	}

	// 동의 처리: 동의 시 currentLocation, 아니면 기본 좌표 사용
	const handleAgreementConfirm = (isChecked) => {
		localStorage.setItem("locationAgreement", isChecked ? "true" : "false")
		const loc =
			isChecked && currentLocation
				? currentLocation
				: { userLat: 37.546, userLng: 127.071 }
		setMoveToLocation({ lat: loc.userLat, lng: loc.userLng })
		setShowAgreementToast(false)
	}

	// 마커 클릭 시 API에서 받은 maker 데이터를 MarkerPopup/MarkerInfoCard에서 요구하는 형태로 변환
	const handleMarkerClick = (maker) => {
		const marker = {
			id: maker.smokingId,
			title: maker.name,
			rating: maker.rating || 0,
			reviews: maker.reviews || 0,
			distance: maker.distance || 0,
			latitude: maker.latitude, // 필요시 maker.Location.latitude로 수정
			longitude: maker.longitude,
		}
		console.log("Converted marker:", marker)
		setSelectedMarker(marker)
		setShowInfoCard(true)
	}

	const handleCloseMarkerInfo = () => {
		setShowInfoCard(false)
		setTimeout(() => setSelectedMarker(null), 300)
	}

	// API 조회 및 지도 중심에 사용할 좌표:
	const apiLocation =
		localStorage.getItem("locationAgreement") === "true" && currentLocation
			? currentLocation
			: { userLat: 37.546, userLng: 127.071 }

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
					moveToLocation={moveToLocation}
					onMarkerClick={handleMarkerClick}
				/>
			</div>
			{selectedMarker && (
				<MarkerPopup marker={selectedMarker} currentLocation={apiLocation} />
			)}
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
