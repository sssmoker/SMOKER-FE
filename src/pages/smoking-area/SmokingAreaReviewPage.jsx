import ReviewCard from "@/components/smoking-area/review/ReviewCard"
import React, { useEffect, useState } from "react"

export default function SmokingAreaReviewPage({ reviewListData }) {
	const [reviews, setReviews] = useState(reviewListData)

	return (
		<div className="">
			{reviews.length ? (
				reviews.map((review) => <ReviewCard key={review.id} {...review} />)
			) : (
				<p>리뷰가 없습니다.</p>
			)}
		</div>
	)
}
