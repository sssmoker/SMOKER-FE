import React, { useState, useEffect } from "react"
import SearchBar from "@/components/common/SearchBar"
import Button from "@/components/common/button/ComButton"
import SmokingAreaList from "@/components/area-list/card-list/SmokingAreaList"
import Filter from "@/components/area-list/filter/Filter"
import { useNavigate } from "react-router-dom"

export default function ListPage() {
	const navigate = useNavigate()
	const [smokingAreas, setSmokingAreas] = useState([]) // 흡연 구역 데이터
	const [setSmokingAreas] = useState([]) // 흡연 구역 데이터
	const [userLat, setUserLat] = useState(null) // 사용자 위도
	const [userLng, setUserLng] = useState(null) // 사용자 경도
	const FILTER_OPTIONS = {
		DISTANCE: "거리순",
		RATING: "평점순",
	}
	const [selectedFilter, setSelectedFilter] = useState(FILTER_OPTIONS.DISTANCE) // "거리순", "평점순"

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
			try {
				const response = await fetch(
					`http://localhost:3001/list`,
					// `http://localhost:3001/api/smoking-area/list?userLat=${userLat}&userLng=${userLng}&filter=${filter}`,
				)
				const data = await response.json()
				console.log(data)
				setSmokingAreas(data || [])
			} catch (error) {
				console.error("흡연 구역 데이터를 가져오지 못했습니다.", error)
			}
		}

		if (userLat && userLng) {
			fetchSmokingAreas()
		}
	}, [userLat, userLng])

	const handleMoveToHome = () => {
		navigate("/")
	}

	return (
		<div className="relative h-[100vh] bg-white">
			{/* 상단 검색바 */}
			<div className="absolute left-0 top-[env(safe-area-inset-top)] z-50 w-full px-4">
				<SearchBar placeholder="내 주변에 흡연구역을 검색해보세요 (예시) LG타워 사당역" />
			</div>

			{/* 필터 버튼 */}
			<div className="fixed left-[20px] top-[92px]">
				<Filter
					FILTER_OPTIONS={FILTER_OPTIONS}
					selectedFilter={selectedFilter}
					setSelectedFilter={setSelectedFilter}
				/>
			</div>

			{/* 흡연 구역 목록 */}
			<div className="h-[calc(100%-84px)] w-full pt-32">
				<ul className="h-full w-full overflow-y-scroll pb-[11vh]">
					<SmokingAreaList
						selectedFilter={selectedFilter}
						smokingAreas={smokingAreas}
					/>
				</ul>
			</div>

			{/* 하단 네비게이션 */}
			<div className="fixed bottom-[12vh] left-0 right-0 z-50 mx-auto flex w-full max-w-[500px] justify-center">
				<Button onClick={handleMoveToHome} size="m" color="purple">
					지도 보기
				</Button>
			</div>
		</div>
	)
}
