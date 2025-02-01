import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SearchBar from "@/components/common/SearchBar"
import Map from "@/components/HomeMap/Map"
import AgreementToast from "@/components/common/toast/AgreementToast"

export default function HomePage() {
	const [markerData, setMarkerData] = useState([])
	const [currentLocation, setCurrentLocation] = useState(null)
	const [moveToLocation, setMoveToLocation] = useState(null)
	const [showAgreementToast, setShowAgreementToast] = useState(false)

	const navigate = useNavigate()

	// ✅ 로컬 스토리지에서 약관 동의 여부 확인
	useEffect(() => {
		const isAgreed = localStorage.getItem("locationAgreement") === "true"
		if (!isAgreed) {
			setShowAgreementToast(true)
		}
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const locationResponse = await fetch(
					"http://localhost:3001/currentLocation",
				)
				if (!locationResponse.ok)
					throw new Error("Failed to fetch current location")

				const locationData = await locationResponse.json()
				setCurrentLocation(locationData)

				const markersResponse = await fetch(
					"http://localhost:3001/smokingAreas",
				)
				if (!markersResponse.ok) throw new Error("Failed to fetch marker data")

				const markersData = await markersResponse.json()

				const formattedMarkers = markersData.map((marker) => ({
					id: marker.smoking_id,
					title: marker.smoking_name,
					region: marker.region,
					latitude: marker.latitude,
					longitude: marker.longitude,
				}))

				setMarkerData(formattedMarkers)
			} catch (error) {
				console.error("Error fetching data:", error)
			}
		}

		fetchData()
	}, [])

	const handleAgreementConfirm = (isChecked) => {
		setShowAgreementToast(false)

		// ✅ 위치 기반 서비스 동의 시 로컬 스토리지에 저장
		localStorage.setItem("locationAgreement", "true")

		setMoveToLocation(
			isChecked ? currentLocation : { lat: 37.5665, lng: 126.978 },
		)
	}

	const handleMoveToCurrentLocation = () => {
		if (currentLocation) {
			console.log("내 주변 이동 실행:", currentLocation)
			setMoveToLocation({
				lat: currentLocation.userLat,
				lng: currentLocation.userLng,
			})
		} else {
			console.error("현재 위치 정보 없음!")
		}
	}

	return (
		<div className="relative h-[100vh] w-full bg-gray-100">
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
				draggable={true}
			/>
		</div>
	)
}
