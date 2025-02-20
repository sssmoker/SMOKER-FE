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
	const [lookLocation, setLookLocation] = useState({
		userLat: 37.546,
		userLng: 127.071,
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
					setCurrentLocation(loc)
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

	const handleMoveToCurrentLocation = () => {
		const loc =
			localStorage.getItem("locationAgreement") === "true" && currentLocation
				? currentLocation
				: { userLat: 37.546, userLng: 127.071 }
		setLookLocation(loc)
	}

	const handleAgreementConfirm = (isChecked) => {
		localStorage.setItem("locationAgreement", isChecked ? "true" : "false")
		const loc =
			isChecked && currentLocation
				? currentLocation
				: { userLat: 37.546, userLng: 127.071 }
		setLookLocation(loc)
		setShowAgreementToast(false)
	}

	const handleMarkerClick = (marker) => {
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
				distance: marker.distance || 250,
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
