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
	const [loading, setLoading] = useState(true) // 로딩 상태
	const [moveToLocation, setMoveToLocation] = useState(null)

	// API에서 현재 위치와 마커 데이터를 가져옴
	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)

				// 현재 위치 데이터 가져오기
				const locationResponse = await fetch(
					"http://localhost:3001/currentLocation",
				)
				if (!locationResponse.ok) {
					throw new Error("Failed to fetch current location")
				}
				const locationData = await locationResponse.json()
				setCurrentLocation(locationData)

				// 마커 데이터 가져오기
				const markersResponse = await fetch(
					"http://localhost:3001/smokingAreas",
				)
				if (!markersResponse.ok) {
					throw new Error("Failed to fetch marker data")
				}
				const markersData = await markersResponse.json()

				// 마커 데이터를 포맷팅
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
				console.error("Error fetching data:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	const navigate = useNavigate()

	const handleMarkerClick = (marker) => {
		setFadeIn(false)
		setTimeout(() => {
			setSelectedMarker(marker)
			setIsMarkerSelected(true)
			setFadeIn(true)
		}, 300)
	}

	const handleMapClick = () => {
		setSelectedMarker(null)
		setIsMarkerSelected(false) // MarkerInfoCard 숨기기 및 목록 보기 버튼 표시
	}

	const handleListClick = () => {
		setIsMarkerSelected(false) // "목록 보기" 클릭 시 MarkerInfoCard 숨기기
	}

	if (loading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<p className="text-lg text-gray-600">로딩 중...</p>
			</div>
		)
	}

	const handleMoveToCurrentLocation = () => {
		if (currentLocation) {
			console.log(
				"현재 위치로 이동:",
				currentLocation.userLat,
				currentLocation.userLng,
			) // 디버깅 로그 추가
			setMoveToLocation({
				lat: currentLocation.userLat,
				lng: currentLocation.userLng,
			})
		} else {
			console.error("현재 위치 데이터가 없습니다!")
		}
	}

	return (
		<div className="relative h-[100vh] w-full bg-gray-100">
			<div className="absolute left-0 top-[env(safe-area-inset-top)] z-50 w-full px-4">
				<SearchBar onMoveToCurrentLocation={handleMoveToCurrentLocation} />
			</div>

			<div className="absolute top-0 z-10 h-[calc(100%-60px)] w-full">
				<Map
					markers={markerData}
					currentLocation={currentLocation}
					moveToLocation={moveToLocation}
					onMarkerClick={handleMarkerClick}
				/>
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
