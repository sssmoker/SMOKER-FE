import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Map from "@/components/HomeMap/Map"
import SearchBar from "@/components/common/SearchBar"
import AgreementToast from "@/components/common/toast/AgreementToast"
import ComButton from "@/components/common/button/ComButton"
import MarkerInfoCard from "@/components/HomeMap/MarkerInfoCard"
import MarkerPopup from "@/components/HomeMap/MarkerPopup"
import { calculateDistance } from "@/utils/calculateDistance"

export default function HomePage() {
	const [currentLocation, setCurrentLocation] = useState(null)
	const [lookLocation, setLookLocation] = useState({
		userLat: 37.468105670805606,
		userLng: 127.03926498444508,
	})
	const [moveToLocation, setMoveToLocation] = useState(null)
	const [showAgreementToast, setShowAgreementToast] = useState(
		localStorage.getItem("locationAgreement") !== "true",
	)
	const [selectedMarker, setSelectedMarker] = useState(null)
	const [showInfoCard, setShowInfoCard] = useState(false)
	const navigate = useNavigate()

	// 🔥 추가: 검색 결과 저장을 위한 상태
	const [searchResults, setSearchResults] = useState([])

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				({ coords: { latitude, longitude } }) => {
					const loc = { userLat: latitude, userLng: longitude }
					setCurrentLocation(loc) // 🔥 현재 위치(GPS) 값 업데이트
					console.log("📍 현재 위치 업데이트됨:", loc) // 디버깅 로그 추가
				},
				(error) => console.error("Geolocation error:", error),
				{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
			)
		} else {
			console.error("Geolocation not supported.")
		}
	}, [])

	const handleMoveToCurrentLocation = () => {
		if (currentLocation) {
			setLookLocation(currentLocation)
		}
	}

	const handleAgreementConfirm = (isChecked) => {
		localStorage.setItem("locationAgreement", isChecked ? "true" : "false")
		const loc =
			isChecked && currentLocation
				? currentLocation
				: { userLat: 37.468105670805606, userLng: 127.03926498444508 }
		setLookLocation(loc)
		setShowAgreementToast(false)
	}

	const handleMarkerClick = (marker) => {
		// 현재 위치와 마커 간 거리 계산
		const distance = calculateDistance(
			currentLocation.userLat,
			currentLocation.userLng,
			marker.location.latitude,
			marker.location.longitude,
		)

		setLookLocation({
			userLat: marker.location.latitude,
			userLng: marker.location.longitude,
		})

		setTimeout(() => {
			setSelectedMarker({
				id: marker.smokingId,
				title: marker.name,
				rating: marker.rating || 4.3,
				reviews: marker.reviews || 11,
				distance: distance.toFixed(1),
				latitude: marker.location.latitude,
				longitude: marker.location.longitude,
			})
			setShowInfoCard(true)
		}, 300)
	}

	const handleCloseMarkerInfo = () => {
		setShowInfoCard(false)
	}

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
			{/* 🔥 setData prop 추가 */}
			<SearchBar
				onMoveToCurrentLocation={handleMoveToCurrentLocation}
				setData={setSearchResults}
			/>
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
			{selectedMarker && showInfoCard && (
				<div className="fixed bottom-[22vh] left-1/2 z-50 w-full max-w-[500px] -translate-x-1/2 px-4">
					<MarkerInfoCard {...selectedMarker} onClose={handleCloseMarkerInfo} />
				</div>
			)}
		</div>
	)
}
