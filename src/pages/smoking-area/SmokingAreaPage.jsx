import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import Topbar from "@/components/smoking-area/upper-info/Topbar"
import BackgroundImg from "@/components/smoking-area/upper-info/BackgroundImg"
import SmokingAreaInfo from "@/components/smoking-area/upper-info/SmokingAreaInfo"
import PageNavButton from "@/components/smoking-area/PageNavButton"
import SmokingAreaDetailPage from "./SmokingAreaDetailPage"
import SmokingAreaReviewPage from "./SmokingAreaReviewPage"
import FloatingButton from "@/components/smoking-area/review/FloatingButton"
import { useQueries } from "@tanstack/react-query"
import { useSmokingAreaDetailsPage } from "@/utils/queries"

export default function SmokingAreaPage() {
	const location = useLocation()
	const [currentPage, setCurrentPage] = useState("detail") //detail //review

	const queryParams = new URLSearchParams(location.search)
	const smokingAreaId = queryParams.get("id")

	// api 연결
	const results = useSmokingAreaDetailsPage(smokingAreaId)

	// const smokingAreasData
	const detailData = results[0].data?.result
	const reviewListData = results[1].data?.result
	const starRatingData = results[2].data?.result

	const isLoading = results.some((result) => result.isLoading)
	const isError = results.some((result) => result.isError)

	if (isLoading) return <div>로딩 중...</div>
	if (isError) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>

	return (
		<div className="min-h-[100vh] bg-white">
			<Topbar isBookmarked={false} />
			{/* {smokingAreasData.area_image && (
				<BackgroundImg bgImg={smokingAreasData.area_image} />
			)} */}

			<SmokingAreaInfo
				smokingAreaId={smokingAreaId}
				smoking_name={detailData.smokingAreaName}
				region={detailData.location.address}
				review_num={starRatingData.count}
				rating={starRatingData.avg}
			/>

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
				<SmokingAreaDetailPage detailInfoList={detailData} />
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
