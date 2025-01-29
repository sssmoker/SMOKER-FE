import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Button from "@/components/common/button/ComButton"

export default function SmokingAreaDetailPage() {
	// api 연결 예정
	const options = [
		"밀폐형 흡연부스예요",
		"깔끔해요",
		"쓰레기통이 있어요",
		"의자가 있어요",
		"장애인 편의시설이에요",
		"냉난방이 가능해요",
		"야외에 있어요",
	]
	// const { smokingAreaId } = useParams()
	// const [smokingArea, setSmokingArea] = useState(null)
	// const [reviews, setReviews] = useState([])
	// const navigate = useNavigate()

	// useEffect(() => {
	// 	const fetchSmokingAreaDetails = async () => {
	// 		try {
	// 			const response = await fetch(
	// 				`http://localhost:3001/smokingAreas/${smokingAreaId}`,
	// 			)
	// 			const data = await response.json()
	// 			setSmokingArea(data)

	// 			const reviewsResponse = await fetch(
	// 				`http://localhost:3001/reviews?smoking_id=${smokingAreaId}`,
	// 			)
	// 			const reviewsData = await reviewsResponse.json()
	// 			setReviews(reviewsData)
	// 		} catch (error) {
	// 			console.error("Error fetching smoking area details:", error)
	// 		}
	// 	}
	// 	fetchSmokingAreaDetails()
	// }, [smokingAreaId])

	return (
		<>
			<div className="mx-[20px] mt-[16px] flex-wrap justify-center gap-x-[12px] gap-y-[8px]">
				{options.map((option) => (
					<div
						key={option}
						className={`mx-[6px] my-[4px] inline-block rounded-[10px] border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 shadow-[0px_2px_2px_0px_rgba(69,23,255,0.20)] transition-all`}
					>
						{option}
					</div>
				))}
			</div>

			<p className="mx-[20px] mt-[28px] text-[16px] font-bold text-[#252525]">
				흡연 부스 위치
			</p>
		</>
	)
}
