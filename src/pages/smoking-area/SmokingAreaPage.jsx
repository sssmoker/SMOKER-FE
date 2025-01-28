import React, { useEffect, useState } from "react"
import Topbar from "@/components/smoking-area/upper-info/Topbar"
import BackgroundImg from "@/components/smoking-area/upper-info/BackgroundImg"
import SmokingAreaInfo from "@/components/smoking-area/upper-info/SmokingAreaInfo"
import PageNavBtn from "@/components/smoking-area/PageNavBtn"
import SmokingAreaDetailPage from "./SmokingAreaDetailPage"
import SmokingAreaReviewPage from "./SmokingAreaReviewPage"

import DummyPng from "@/assets/dummy/SM_01_img1.png" // imageUrl

export default function SmokingAreaPage() {
	const [bgImg, setBgImg] = useState(DummyPng) // imageUrl
	const [currentPage, setCurrentPage] = useState("detail")
	const [smokingAreaData, setSmokingAreaData] = useState({})
	const [reviewListData, setReviewListData] = useState([])

	useEffect(() => {
		const fetchSmokingArea = async () => {
			try {
				const response = await fetch(`http://localhost:3001/smokingAreas`)
				const data = await response.json()
				setSmokingAreaData(data[0] || {})
			} catch (error) {
				console.error("흡연 구역 데이터를 가져오지 못했습니다.", error)
			}
		}

		fetchSmokingArea()
	}, [])

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const response = await fetch(`http://localhost:3001/reviews`)
				const data = await response.json()
				setReviewListData(data || [])
			} catch (error) {
				console.error("흡연 구역 데이터를 가져오지 못했습니다.", error)
			}
		}

		fetchReviews()
	}, [])

	return (
		<div className="bg-white pb-[84px]">
			<Topbar />
			{/* 이미지 연결 예정 */}
			{bgImg && <BackgroundImg bgImg={bgImg} />}

			{/* api 추후 수정 예정 */}
			<SmokingAreaInfo {...smokingAreaData} />

			<div className="h-[8px] w-full bg-[#E0E0E0]" />
			<div className="flex justify-evenly gap-[20px]">
				<PageNavBtn
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					btnName="detail"
				/>
				<PageNavBtn
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					btnName="review"
				/>
			</div>

			{currentPage == "detail" ? (
				<SmokingAreaDetailPage />
			) : (
				<SmokingAreaReviewPage reviewListData={reviewListData} />
			)}
		</div>
	)
}
