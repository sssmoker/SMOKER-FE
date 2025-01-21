import React, { useState, useEffect } from "react"
import SearchBar from "@/components/common/SearchBar" // 절대경로 사용
import Map from "@/components/HomeMap/Map"
import MarkerInfoCard from "@/components/HomeMap/MarkerInfoCard"

export default function HomePage() {
	const [markerData, setMarkerData] = useState(null) // 전체 마커 데이터
	const [selectedMarker, setSelectedMarker] = useState(null) // 선택된 마커 데이터

	// 마커 데이터를 가져오는 API 호출
	useEffect(() => {
		const fetchMarkerData = async () => {
			try {
				const response = await fetch("http://localhost:3001/markers") // API 호출
				const data = await response.json()
				setMarkerData(data)
			} catch (error) {
				console.error("Failed to fetch marker data:", error)
			}
		}

		fetchMarkerData()
	}, [])

	// 마커 클릭 시 선택된 데이터 업데이트
	const handleMarkerClick = (marker) => {
		setSelectedMarker(marker)
	}

	return (
		<div className="relative h-[100vh] w-full bg-gray-100">
			{/* Search Bar */}
			<div className="absolute left-0 top-[env(safe-area-inset-top)] z-50 w-full px-4">
				<SearchBar />
			</div>

			{/* 지도: SearchBar 아래에 위치 */}
			<div className="absolute top-[60px] z-10 h-[calc(100%-120px)] w-full">
				<Map markers={markerData} onMarkerClick={handleMarkerClick} />
			</div>

			{/* Marker Info Card */}
			{selectedMarker && (
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
