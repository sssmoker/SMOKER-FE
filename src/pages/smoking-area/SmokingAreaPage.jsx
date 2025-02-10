import React, { useEffect, useState } from "react"
import Topbar from "@/components/smoking-area/upper-info/Topbar"
import BackgroundImg from "@/components/smoking-area/upper-info/BackgroundImg"
import SmokingAreaInfo from "@/components/smoking-area/upper-info/SmokingAreaInfo"
import PageNavButton from "@/components/smoking-area/PageNavButton"
import SmokingAreaDetailPage from "./SmokingAreaDetailPage"
import SmokingAreaReviewPage from "../update-smoking-area/SmokingAreaHistoryPage"
import FloatingButton from "@/components/smoking-area/review/FloatingButton"

export default function SmokingAreaPage() {
	const [currentPage, setCurrentPage] = useState("detail")
	const [smokingAreaData, setSmokingAreaData] = useState({})
	const [reviewListData, setReviewListData] = useState([])
	const [starRatingData, setStarRatingData] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [smokingAreasResponse, reviewsResponse, starRatingResponse] =
					await Promise.all([
						fetch(`http://localhost:3001/smokingAreas`),
						fetch(`http://localhost:3001/reviews`),
						fetch(`http://localhost:3001/starRating`),
					])
				const [smokingAreasData, reviewsData, starRatingData] =
					await Promise.all([
						smokingAreasResponse.json(),
						reviewsResponse.json(),
						starRatingResponse.json(),
					])

				setSmokingAreaData(smokingAreasData[0] || {})
				setReviewListData(reviewsData || [])
				setStarRatingData(starRatingData || [])
			} catch (error) {
				console.error("흡연 구역 데이터를 가져오지 못했습니다.", error)
			}
		}

		fetchData()
	}, [])

	return (
		<div className="min-h-[100vh] bg-white">
			<Topbar isBookmarked={smokingAreaData.is_bookmarked} />
			{smokingAreaData.area_image && (
				<BackgroundImg bgImg={smokingAreaData.area_image} />
			)}

			<SmokingAreaInfo {...smokingAreaData} />

			<div className="h-[8px] w-full bg-[#E0E0E0]" />
			<div className="flex justify-evenly gap-[20px]">
				<PageNavButton
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					buttonName="detail"
				/>
				<PageNavButton
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					buttonName="review"
				/>
			</div>

			{currentPage == "detail" ? (
				<SmokingAreaDetailPage detailInfoList={smokingAreaData.detail_info} />
			) : (
				<>
					<SmokingAreaReviewPage
						starRatingData={starRatingData}
						reviewListData={reviewListData}
					/>
					<FloatingButton />
				</>
			)}
		</div>
	)
}
