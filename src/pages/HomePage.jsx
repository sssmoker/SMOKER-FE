import React, { useState, useEffect } from "react"
import SearchBar from "@/components/common/SearchBar"
import Map from "@/components/HomeMap/Map"
import MarkerInfoCard from "@/components/HomeMap/MarkerInfoCard"
import Button from "@/components/common/button/ComButton"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
	const [markerData, setMarkerData] = useState([]) // 전체 마커 데이터
	const [currentLocation, setCurrentLocation] = useState(null) // 현재 위치 데이터
	const [selectedMarker, setSelectedMarker] = useState(null) // 선택된 마커 데이터
	const [isMarkerSelected, setIsMarkerSelected] = useState(false) // Marker 상태
	const [fadeIn, setFadeIn] = useState(false) // 애니메이션 효과

	// 현재 위치와 마커 데이터를 가져오는 API 호출
	useEffect(() => {
		const fetchData = async () => {
			try {
				// 현재 위치 데이터 가져오기
				const locationResponse = await fetch(
					"http://localhost:3001/currentLocation",
				)
				const locationData = await locationResponse.json()
				setCurrentLocation(locationData)

				// 마커 데이터 가져오기
				const markersResponse = await fetch(
					"http://localhost:3001/smokingAreas",
				)
				const markersData = await markersResponse.json()
				// `smokingAreas`에 맞춰 데이터 포맷 변경
				const formattedMarkers = markersData.map((marker) => ({
					id: marker.smoking_id,
					title: marker.smoking_name,
					region: marker.region,
					rating: marker.rating || "N/A",
					distance: marker.distance || 0,
					latitude: marker.latitude,
					longitude: marker.longitude,
				}))
				setMarkerData(formattedMarkers)
			} catch (error) {
				console.error("Failed to fetch data:", error)
			}
		}

		fetchData()
	}, [])

	const navigate = useNavigate()

	const handleMarkerClick = (marker) => {
		setFadeIn(false) // 기존 카드 서서히 사라지기
		setTimeout(() => {
			setSelectedMarker(marker)
			setIsMarkerSelected(true)
			setFadeIn(true) // 새 카드 서서히 나타나기
		}, 300)
	}

	const handleMapClick = () => {
		setSelectedMarker(null)
		setIsMarkerSelected(false) // MarkerInfoCard 숨기기
	}

	const handleListClick = () => {
		setIsMarkerSelected(false) // "목록 보기" 클릭 시 MarkerInfoCard 숨기기
		navigate("/list")
	}

	return (
		<div className="relative h-[100vh] w-full bg-gray-100">
			{/* Search Bar */}
			<div className="absolute left-0 top-[env(safe-area-inset-top)] z-50 w-full px-4">
				<SearchBar />
			</div>

			{/* 지도 */}
			<div className="absolute top-0 z-10 h-[calc(100%-60px)] w-full">
				<Map
					markers={markerData}
					currentLocation={currentLocation}
					onMarkerClick={handleMarkerClick}
				/>
			</div>

			{/* 목록 보기 버튼 */}
			{!isMarkerSelected && (
				<div className="absolute bottom-28 left-0 right-0 z-10 flex justify-center">
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

			{/* Marker Info Card */}
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
