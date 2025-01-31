import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SearchBar from "@/components/common/SearchBar"
import Map from "@/components/HomeMap/Map"
import Toast from "@/components/common/toast/Toast"
import MarkerInfoCard from "@/components/HomeMap/MarkerInfoCard"
import Button from "@/components/common/button/ComButton"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
	const [markerData, setMarkerData] = useState([])
	const [currentLocation, setCurrentLocation] = useState(null)
	const [loading, setLoading] = useState(true)
	const [moveToLocation, setMoveToLocation] = useState(null)
	const [showAgreementToast, setShowAgreementToast] = useState(true)

	const navigate = useNavigate()

	// API에서 현재 위치 & 마커 데이터 가져오기
	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
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
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	// "다음" 버튼 클릭 시 위치 동의 모달 닫기 (현재 위치 이동 X)
	const handleNext = () => {
		setShowAgreementToast(false)
		console.log("약관 동의 후 진행")
	}

	// "내 주변" 버튼 클릭 시 현재 위치로 이동
	const handleMoveToCurrentLocation = () => {
		if (currentLocation) {
			console.log(
				"내 주변 이동:",
				currentLocation.userLat,
				currentLocation.userLng,
			)
			setMoveToLocation({
				lat: currentLocation.userLat,
				lng: currentLocation.userLng,
			})
		} else {
			console.error("현재 위치 데이터 없음!")
		}
	}

	return (
		<div className="relative h-[100vh] w-full bg-gray-100">
			{/* 위치 동의 모달 */}
			<Toast
				isVisible={showAgreementToast}
				type="agreement"
				message="스모커 이용을 위한 이용약관 동의"
				onConfirm={handleNext}
				onCancel={() => navigate("/login")}
				confirmText="다음"
				cancelText="로그인"
			/>

			<SearchBar onMoveToCurrentLocation={handleMoveToCurrentLocation} />

			<Map
				markers={markerData}
				currentLocation={currentLocation}
				moveToLocation={moveToLocation}
			/>
		</div>
	)
}
