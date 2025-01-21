import React, { useState, useEffect } from "react"
import SearchBar from "@/components/common/SearchBar"
import Map from "@/components/HomeMap/Map"
import MarkerInfoCard from "@/components/HomeMap/MarkerInfoCard"
import Button from "@/components/common/button/ComButton" // 버튼 컴포넌트

export default function HomePage() {
	const [markerData, setMarkerData] = useState(null) // 전체 마커 데이터
	const [selectedMarker, setSelectedMarker] = useState(null) // 선택된 마커 데이터
	const [isMarkerSelected, setIsMarkerSelected] = useState(false) // Marker 상태

	// 마커 데이터를 가져오는 API 호출
	useEffect(() => {
		const fetchMarkerData = async () => {
			try {
				const response = await fetch("http://localhost:3001/markers") // Mock 데이터 API 호출
				const data = await response.json()
				setMarkerData(data)
			} catch (error) {
				console.error("Failed to fetch marker data:", error)
			}
		}

		fetchMarkerData()
	}, [])

	const handleMarkerClick = (marker) => {
		setSelectedMarker(marker)
		setIsMarkerSelected(true) // 마커 선택 시 "목록 보기" 버튼 숨기기
	}

	// Map 버튼 클릭 이벤트
	const handleMapClick = () => {
		setSelectedMarker(null)
		setIsMarkerSelected(false) // MarkerInfoCard 숨기기, "목록 보기" 표시
	}

	const handleListClick = () => {
		setIsMarkerSelected(false) // "목록 보기" 클릭 시 MarkerInfoCard 숨기기
	}

	return (
		<div className="relative h-[100vh] w-full bg-gray-100">
			{/* Search Bar */}
			<div className="absolute left-0 top-[env(safe-area-inset-top)] z-50 w-full px-4">
				<SearchBar />
			</div>

			{/* 지도 */}
			<div className="absolute top-0 z-10 h-[calc(100%-60px)] w-full">
				<Map markers={markerData} onMarkerClick={handleMarkerClick} />
			</div>

			{/* 목록 보기 버튼 */}
			{!isMarkerSelected && (
				<div className="absolute bottom-20 left-0 right-0 z-20 flex justify-center">
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
				<MarkerInfoCard
					title={selectedMarker.title}
					address={selectedMarker.address}
					rating={selectedMarker.rating}
					distance={selectedMarker.distance}
				/>
			)}
		</div>
	)
}
