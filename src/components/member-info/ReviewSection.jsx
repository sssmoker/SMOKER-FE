import React from "react"

export default function ReviewSection({ reviews }) {
	return (
		<div className="p-4">
			{reviews.length > 0 ? (
				reviews.map((review) => (
					<div key={review.id} className="mb-4 rounded-md border bg-white p-4">
						<h3 className="font-bold">{review.smoking_area_name}</h3>
						<p className="text-sm text-gray-500">{review.body}</p>
						<div className="flex justify-between text-gray-400">
							<span>⭐ {review.score}</span>
							<span>{new Date(review.created_at).toLocaleDateString()}</span>
						</div>
					</div>
				))
			) : (
				<div className="flex h-full items-center justify-center">
					<p className="text-center text-gray-500">작성한 리뷰가 없습니다.</p>
				</div>
			)}
		</div>
	)
}
