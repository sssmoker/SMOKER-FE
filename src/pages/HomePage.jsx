import React, { useState, useEffect } from "react"
import SearchBar from "@/components/common/SearchBar" // 절대경로 사용
import Map from "@/components/HomeMap/Map"
import MarkerInfoCard from "@/components/HomeMap/MarkerInfoCard"
import BottomNavigation from "@/components/common/Navbar"

export default function HomePage() {
	const [markerData, setMarkerData] = useState(null) // 전체 마커 데이터
	const [selectedMarker, setSelectedMarker] = useState(null) // 선택된 마커 데이터

	// 마커 데이터를 가져오는 API 호출
	useEffect(() => {
		const fetchMarkerData = async () => {
			try {
				const response = await fetch("/api/markers") // API 호출
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
		<div className="relative h-[100dvh] w-full bg-gray-100">
			{/* Search Bar */}
			<SearchBar />

			{/* 지도 */}
			<div className="absolute top-[env(safe-area-inset-top)] h-[calc(100%_-_120px)] w-full">
				<Map markers={markerData} onMarkerClick={handleMarkerClick} />
			</div>

			{/* 선택된 마커 정보 카드 */}
			{selectedMarker && (
				<MarkerInfoCard
					title={selectedMarker.title}
					address={selectedMarker.address}
					rating={selectedMarker.rating}
					distance={selectedMarker.distance}
				/>
			)}

			{/* 하단 네비게이션 */}
			<BottomNavigation />
		</div>
	)
}
