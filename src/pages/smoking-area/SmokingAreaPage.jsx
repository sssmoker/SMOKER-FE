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

export default function SmokingAreaPage() {
	const location = useLocation()
	const [currentPage, setCurrentPage] = useState("detail")

	const queryParams = new URLSearchParams(location.search)
	const smokingAreaId = queryParams.get("id")

	const results = useQueries({
		queries: [
			{
				queryKey: ["smokingAreas", smokingAreaId],
				queryFn: async () => {
					const response = await fetch("http://localhost:3001/list")
					if (!response.ok) throw new Error("데이터 호출 실패")
					return response.json()
				},
			},
			{
				queryKey: ["detail", smokingAreaId],
				queryFn: async () => {
					const response = await fetch("http://localhost:3001/detail")
					// `https://api.smoker.my/api/smoking-area/${smokingAreaId}`,
					if (!response.ok) throw new Error("데이터 호출 실패")
					return response.json()
				},
			},
			{
				queryKey: ["reviews", smokingAreaId],
				queryFn: async () => {
					const response = await fetch("http://localhost:3001/reviews")
					if (!response.ok) throw new Error("데이터 호출 실패")
					return response.json()
				},
			},
			{
				queryKey: ["starRating", smokingAreaId],
				queryFn: async () => {
					const response = await fetch("http://localhost:3001/starRating")
					if (!response.ok) throw new Error("데이터 호출 실패")
					return response.json()
				},
			},
		],
	})
	const smokingAreasData = results[0].data
	const detailData = results[1].data?.result
	const reviewListData = results[2].data
	const starRatingData = results[3].data
	console.log(detailData) //

	const isLoading = results.some((result) => result.isLoading)
	const isError = results.some((result) => result.isError)

	if (isLoading) return <div>로딩 중...</div>
	if (isError) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>

	return (
		<div className="min-h-[100vh] bg-white">
			<Topbar isBookmarked={smokingAreasData.is_bookmarked} />
			{smokingAreasData.area_image && (
				<BackgroundImg bgImg={smokingAreasData.area_image} />
			)}

			<SmokingAreaInfo {...smokingAreasData} />

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
