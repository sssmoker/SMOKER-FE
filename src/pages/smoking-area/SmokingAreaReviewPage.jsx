import React, { useState } from "react"
import ReviewCard from "@/components/smoking-area/review/ReviewCard"
import StarRatingStatistics from "@/components/smoking-area/review/StarRatingStatistics"

export default function SmokingAreaReviewPage({ reviewListData }) {
	const [reviews] = useState(reviewListData)

	return (
		<div className="pb-[84px]">
			<StarRatingStatistics />

			{reviews.length ? (
				reviews.map((review) => <ReviewCard key={review.id} {...review} />)
			) : (
				<p>리뷰가 없습니다.</p>
			)}
		</div>
	)
}
