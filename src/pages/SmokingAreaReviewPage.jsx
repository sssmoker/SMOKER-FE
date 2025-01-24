import React, { useEffect, useState } from "react"

export default function SmokingAreaReviewPage({ smokingAreaId }) {
	const [reviews, setReviews] = useState([])

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const response = await fetch(
					`http://localhost:3001/reviews?smoking_id=${smokingAreaId}`,
				)
				const data = await response.json()
				setReviews(data)
			} catch (error) {
				console.error("Error fetching reviews:", error)
			}
		}

		fetchReviews()
	}, [smokingAreaId])

	return (
		<div>
			<h2 className="text-lg font-bold">리뷰</h2>
			{reviews.length ? (
				reviews.map((review) => (
					<div key={review.id} className="border-b py-2">
						<p>{review.body}</p>
						<p className="text-xs text-gray-500">
							⭐ {review.score} -{" "}
							{new Date(review.created_at).toLocaleDateString()}
						</p>
					</div>
				))
			) : (
				<p>리뷰가 없습니다.</p>
			)}
		</div>
	)
}
