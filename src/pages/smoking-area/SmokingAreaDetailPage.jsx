import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Button from "@/components/common/button/ComButton"

export default function SmokingAreaDetailPage() {
	const { smokingAreaId } = useParams()
	const [smokingArea, setSmokingArea] = useState(null)
	const [reviews, setReviews] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		const fetchSmokingAreaDetails = async () => {
			try {
				const response = await fetch(
					`http://localhost:3001/smokingAreas/${smokingAreaId}`,
				)
				const data = await response.json()
				setSmokingArea(data)

				const reviewsResponse = await fetch(
					`http://localhost:3001/reviews?smoking_id=${smokingAreaId}`,
				)
				const reviewsData = await reviewsResponse.json()
				setReviews(reviewsData)
			} catch (error) {
				console.error("Error fetching smoking area details:", error)
			}
		}
		fetchSmokingAreaDetails()
	}, [smokingAreaId])

	return (
		<div className="p-4">
			{smokingArea && (
				<div>
					<h1 className="text-xl font-bold">{smokingArea.smoking_name}</h1>
					<p>{smokingArea.region}</p>
					<div className="my-4">
						<Button
							size="m"
							color="purple"
							onClick={() => navigate(`/update-smoking-area/${smokingAreaId}`)}
						>
							정보 수정하기
						</Button>
					</div>
					<div>
						<h2 className="text-lg font-semibold">리뷰</h2>
						{reviews.map((review) => (
							<div key={review.id} className="border-b py-2">
								<p className="text-sm">{review.body}</p>
								<p className="text-xs text-gray-500">
									⭐ {review.score} -{" "}
									{new Date(review.created_at).toLocaleDateString()}
								</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
