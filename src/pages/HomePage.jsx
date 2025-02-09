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
	const [selectedMarker, setSelectedMarker] = useState(null)
	const [isMarkerSelected, setIsMarkerSelected] = useState(false)
	const [fadeIn, setFadeIn] = useState(false)

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
		setFadeIn(false)
		setTimeout(() => {
			setSelectedMarker(marker)
			setIsMarkerSelected(true)
			setFadeIn(true)
		}, 300)
	}

	const handleListClick = () => {
		setIsMarkerSelected(false) // "목록 보기" 클릭 시 MarkerInfoCard 숨기기
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

			<div
				className={`fixed bottom-[12vh] left-1/2 z-50 flex w-auto max-w-[380px] -translate-x-1/2 justify-center px-4 transition-opacity duration-300 ${
					showInfoCard ? "pointer-events-none opacity-0" : "opacity-100"
				}`}
			>
				<ComButton size="m" color="purple" onClick={handleListPageNavigation}>
					목록 보기
				</ComButton>
			</div>

			{!isMarkerSelected && (
				<div className="absolute bottom-[12vh] left-0 right-0 z-10 flex justify-center">
					<Button
						size="m"
						color="purple"
						onClick={handleListClick}
						className="rounded-full"
					>
						목록 보기
					</Button>
				</div>
			)}

			{isMarkerSelected && selectedMarker && (
				<div
					className={`absolute bottom-12 left-0 right-0 z-20 flex justify-center transition-opacity duration-500 ${
						fadeIn ? "opacity-100" : "opacity-0"
					}`}
				>
					<MarkerInfoCard
						title={selectedMarker.title}
						region={selectedMarker.region}
						rating={selectedMarker.rating}
						distance={selectedMarker.distance}
					/>
				</div>
			)}
		</div>
	)
}
