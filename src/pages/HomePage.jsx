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

	useEffect(() => {
		const fetchData = async () => {
			await fetchLocationData()
			await fetchMarkerData()
		}
		fetchData()
	}, [])

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

	const handleAgreementConfirm = (isChecked) => {
		localStorage.setItem("locationAgreement", isChecked ? "true" : "false")
		setMoveToLocation(
			isChecked ? currentLocation : { lat: 37.5665, lng: 126.978 },
		)
		setShowAgreementToast(false)
	}

	const handleMoveToCurrentLocation = () => {
		if (!currentLocation) return
		setMoveToLocation({
			lat: currentLocation.userLat,
			lng: currentLocation.userLng,
		})
	}

	const handleListPageNavigation = () => navigate("/list")

	const handleMarkerClick = (marker) => {
		console.log(
			`[🟢] 마커 클릭됨: ${marker.title}, ${marker.latitude}, ${marker.longitude}`,
		)
		setSelectedMarker(marker)
	}

	const handleCloseMarkerInfo = () => {
		setSelectedMarker(null)
	}

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

			<Map
				markers={markerData}
				currentLocation={currentLocation}
				moveToLocation={moveToLocation}
				onMarkerClick={handleMarkerClick}
			/>

			{selectedMarker && <MarkerPopup marker={selectedMarker} />}

			{selectedMarker ? (
				<div className="fixed bottom-[12vh] left-1/2 w-full max-w-[380px] -translate-x-1/2 px-4">
					<MarkerInfoCard {...selectedMarker} onClose={handleCloseMarkerInfo} />
				</div>
			) : (
				<div className="fixed bottom-[12vh] left-1/2 z-50 flex w-full max-w-[320px] -translate-x-1/2 justify-center px-4">
					<ComButton size="m" color="purple" onClick={handleListPageNavigation}>
						목록 보기
					</ComButton>
				</div>
			)}
		</div>
	)
}
