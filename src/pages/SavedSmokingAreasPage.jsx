import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SearchBar from "@/components/common/SearchBar"
import SmokingAreaCard from "@/components/AreaList/SmokingAreaCard"
import Button from "@/components/common/button/ComButton"

export default function SavedSmokingAreasPage() {
	const [savedAreas, setSavedAreas] = useState([])
	const [sortOption, setSortOption] = useState("distance")
	const navigate = useNavigate()

	// Mock 데이터 Fetch
	useEffect(() => {
		const fetchSavedAreas = async () => {
			try {
				const response = await fetch("http://localhost:3001/savedSmokingAreas")
				const data = await response.json()
				setSavedAreas(data)
			} catch (error) {
				console.error("Failed to fetch saved areas:", error)
			}
		}

		fetchSavedAreas()
	}, [])

	// 정렬 로직
	const handleSortChange = (option) => {
		setSortOption(option)
		const sortedAreas = [...savedAreas].sort((a, b) => {
			if (option === "distance") return a.distance - b.distance
			if (option === "rating") return b.rating - a.rating
			return 0
		})
		setSavedAreas(sortedAreas)
	}

	return (
		<div className="relative min-h-screen bg-gray-100">
			{/* Header */}
			<div className="sticky top-0 z-10 bg-white shadow-md">
				<div className="flex items-center justify-between p-4">
					<button onClick={() => navigate(-1)} className="text-gray-600">
						←
					</button>
					<h1 className="text-lg font-bold text-gray-800">저장한 흡연 구역</h1>
					<div></div>
				</div>
				<SearchBar placeholder="저장한 흡연 구역에서 검색해보세요!" />
			</div>

			{/* 정렬 버튼 */}
			<div className="p-4">
				<Button
					size="s"
					color="gray"
					onClick={() => handleSortChange("distance")}
					className={`mr-2 ${
						sortOption === "distance" ? "bg-gray-200 text-gray-800" : ""
					}`}
				>
					거리순
				</Button>
				<Button
					size="s"
					color="gray"
					onClick={() => handleSortChange("rating")}
					className={sortOption === "rating" ? "bg-gray-200 text-gray-800" : ""}
				>
					평점순
				</Button>
			</div>

			{/* 저장된 흡연 구역 리스트 */}
			<div className="space-y-4 p-4">
				{savedAreas.length > 0 ? (
					savedAreas.map((area) => (
						<SmokingAreaCard
							key={area.smoking_id}
							title={area.name}
							address={area.address}
							rating={area.rating}
							distance={area.distance}
							imageUrl="/path/to/image" // Placeholder image
							isBookmarked={true}
							onBookmarkClick={() => {
								console.log(`Unbookmark area: ${area.smoking_id}`)
							}}
							onClick={() => navigate(`/smoking-area/${area.smoking_id}`)}
						/>
					))
				) : (
					<p className="text-center text-gray-600">
						저장된 흡연 구역이 없습니다.
					</p>
				)}
			</div>
		</div>
	)
}
