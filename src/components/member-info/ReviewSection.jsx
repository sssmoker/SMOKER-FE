import React, { useState, useEffect, useRef } from "react"
import { Star } from "lucide-react"

export default function ReviewSection({ reviews }) {
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 5
	const containerRef = useRef(null)
	const [containerHeight, setContainerHeight] = useState("auto")

	useEffect(() => {
		if (containerRef.current) {
			const screenHeight = window.innerHeight
			setContainerHeight(`${screenHeight - 180}px`)
		}
	}, [])

	if (!Array.isArray(reviews) || reviews.length === 0) {
		return (
			<p className="mt-4 text-center text-gray-500">작성한 리뷰가 없습니다.</p>
		)
	}

	const formatDate = (dateString) => {
		const date = new Date(dateString)
		return date
			.toLocaleDateString("ko-KR", {
				year: "2-digit",
				month: "2-digit",
				day: "2-digit",
			})
			.replace(/\./g, ".")
	}

	const totalPages = Math.max(1, Math.ceil(reviews.length / itemsPerPage))
	const startIndex = (currentPage - 1) * itemsPerPage
	const paginatedReviews = reviews.slice(startIndex, startIndex + itemsPerPage)

	return (
		<div className="relative flex h-full flex-col overflow-auto bg-white pb-20">
			<div
				ref={containerRef}
				className="px-1"
				style={{ height: containerHeight }}
			>
				<ul className="w-full bg-white">
					{paginatedReviews.map((review, index) => (
						<li
							key={review.reviewId}
							className={`flex items-center justify-between border-t border-gray-300 bg-white px-4 py-3 ${
								index === paginatedReviews.length - 1 ? "border-b" : ""
							}`}
						>
							<div className="flex-1">
								<div className="flex items-center gap-2">
									<h3 className="text-sm font-semibold text-gray-800">
										{review.smokingAreaName}
									</h3>
									<p className="text-xs text-gray-300">
										{formatDate(review.createdAt)}
									</p>
								</div>

								<div className="mt-1 flex">
									{Array.from({ length: review.rating }, (_, index) => (
										<Star
											key={index}
											className="h-3 w-3 fill-[#FFDD00] text-[#FFDD00]"
										/>
									))}
								</div>

								<p className="text-sm text-gray-600">{review.body}</p>
							</div>

							{review.imgUrl ? (
								<img
									src={review.imgUrl}
									alt="이미지"
									className="ml-4 h-[50px] w-[50px] rounded-md border object-cover"
								/>
							) : (
								<div className="ml-4 flex h-[50px] w-[50px] items-center justify-center rounded-md border text-xs text-gray-400">
									이미지
								</div>
							)}
						</li>
					))}
				</ul>
			</div>

			{totalPages > 1 && (
				<div className="bottom-0 left-0 right-0 flex items-center justify-center space-x-4 bg-white py-3 text-sm">
					<span
						className={`cursor-pointer ${currentPage === 1 ? "text-gray-400" : "hover:text-blue-500"}`}
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
					>
						{"<"}
					</span>

					{[...Array(totalPages)].map((_, i) => (
						<span
							key={i}
							className={`cursor-pointer px-2 ${currentPage === i + 1 ? "font-bold" : "hover:text-blue-500"}`}
							onClick={() => setCurrentPage(i + 1)}
						>
							{i + 1}
						</span>
					))}

					<span
						className={`cursor-pointer ${currentPage === totalPages ? "text-gray-400" : "hover:text-blue-500"}`}
						onClick={() =>
							setCurrentPage((prev) => Math.min(prev + 1, totalPages))
						}
					>
						{">"}
					</span>
				</div>
			)}
		</div>
	)
}
