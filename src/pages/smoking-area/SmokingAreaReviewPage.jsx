import React from "react"
import ReviewCard from "@/components/smoking-area/review/ReviewCard"
import StarRatingStatistics from "@/components/smoking-area/review/StarRatingStatistics"

export default function SmokingAreaReviewPage({
	starRatingData,
	reviewListData = [],
}) {
	// 리뷰 없는 경우 스타일 추가 필요!!!
	return (
		<div className="pb-[20vh]">
			{reviewListData.reviews.length > 0 ? (
				<>
					<StarRatingStatistics {...starRatingData} />

					{reviewListData.reviews.map((review) => (
						<ReviewCard key={review.id} {...review} />
					))}
				</>
			) : (
				<p>리뷰가 없습니다.</p>
			)}
		</div>
	)
}
