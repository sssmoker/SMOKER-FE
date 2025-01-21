import React, { useState, useEffect } from "react"
import SearchBar from "@/components/common/SearchBar"
import Button from "@/components/common/button/ComButton"

export default function ListPage() {
	const [smokingAreas, setSmokingAreas] = useState([]) // 흡연 구역 데이터
	const [userLat, setUserLat] = useState(null) // 사용자 위도
	const [userLng, setUserLng] = useState(null) // 사용자 경도
	const [filter, setFilter] = useState("nearest") // 기본 필터: 가장 가까운 순

	// 현재 위치 가져오기
	useEffect(() => {
		const fetchUserLocation = () => {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setUserLat(position.coords.latitude)
					setUserLng(position.coords.longitude)
				},
				(error) => {
					console.error("위치 정보를 가져오지 못했습니다.", error)
				},
			)
		}

		fetchUserLocation()
	}, [])

	// API를 통해 흡연 구역 목록 가져오기
	useEffect(() => {
		const fetchSmokingAreas = async () => {
			if (userLat && userLng) {
				try {
					const response = await fetch(
						`http://localhost:3001/api/smoking-area/list?userLat=${userLat}&userLng=${userLng}&filter=${filter}`,
					)
					const data = await response.json()
					setSmokingAreas(data.data.smoking_area || [])
				} catch (error) {
					console.error("흡연 구역 데이터를 가져오지 못했습니다.", error)
				}
			}
		}

		fetchSmokingAreas()
	}, [userLat, userLng, filter])

	return (
		<div className="relative h-[100vh] bg-gray-100">
			{/* 상단 검색바 */}
			<div className="absolute left-0 top-[env(safe-area-inset-top)] z-50 w-full px-4">
				<SearchBar placeholder="내 주변에 흡연구역을 검색해보세요 (예시) LG타워 사당역" />
			</div>

			{/* 필터 버튼 */}
			<div className="absolute top-20 z-50 flex w-full justify-end px-4">
				<Button
					size="m"
					color="purple"
					className="rounded-lg"
					onClick={() =>
						setFilter(filter === "nearest" ? "popular" : "nearest")
					}
				>
					{filter === "nearest" ? "거리순" : "인기순"}
				</Button>
			</div>

			{/* 흡연 구역 목록 */}
			<div className="mt-32 px-4">
				{smokingAreas.map((area) => (
					<div
						key={area.smoking_area_Id}
						className="mb-6 flex items-center rounded-lg border bg-white p-4 shadow"
					>
						<img
							src={`/images/smoking-area-${area.smoking_area_Id}.jpg`}
							alt={area.name}
							className="mr-4 h-20 w-20 rounded-lg object-cover"
						/>
						<div className="flex flex-col justify-between">
							<h3 className="text-lg font-semibold">{area.name}</h3>
							<p className="text-sm text-gray-500">{area.Location.address}</p>
							<div className="flex items-center text-sm text-gray-500">
								<span className="mr-2">
									⭐ {area.rating}({area.review_count})
								</span>
								<span>저장 {area.saved_count}</span>
							</div>
						</div>
						<button className="ml-auto text-gray-500">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="h-6 w-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</button>
					</div>
				))}
			</div>

			{/* 하단 네비게이션 */}
			<div className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-[500px] bg-white shadow-lg">
				<div className="flex justify-between px-6 py-4">
					<Button size="m" color="purple">
						Map
					</Button>
					<Button size="m" color="gray">
						List
					</Button>
				</div>
			</div>
		</div>
	)
}
