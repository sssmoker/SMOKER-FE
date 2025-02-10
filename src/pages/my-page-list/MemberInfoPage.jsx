import React, { useState, useEffect } from "react"

export default function MemberInfoPage() {
	const [memberInfo, setMemberInfo] = useState(null)
	const [reviews, setReviews] = useState([])
	const [tab, setTab] = useState("info") // "info" or "reviews"

	useEffect(() => {
		// Fetch member information
		const fetchMemberInfo = async () => {
			try {
				const response = await fetch("http://localhost:3001/member")
				const data = await response.json()
				setMemberInfo(data)
			} catch (error) {
				console.error("Failed to fetch member info:", error)
			}
		}

		// Fetch member reviews
		const fetchReviews = async () => {
			try {
				const response = await fetch("http://localhost:3001/member/reviews")
				const data = await response.json()
				setReviews(data)
			} catch (error) {
				console.error("Failed to fetch reviews:", error)
			}
		}

		fetchMemberInfo()
		fetchReviews()
	}, [])

	return (
		<div className="flex h-screen flex-col bg-gray-100">
			<header className="border-b border-gray-300 p-4 text-lg font-bold">
				회원정보
			</header>
			<div className="mt-4 flex justify-center">
				<button
					onClick={() => setTab("info")}
					className={`px-4 py-2 ${
						tab === "info" ? "border-b-2 border-blue-500 text-blue-500" : ""
					}`}
				>
					상세 정보
				</button>
				<button
					onClick={() => setTab("reviews")}
					className={`px-4 py-2 ${
						tab === "reviews" ? "border-b-2 border-blue-500 text-blue-500" : ""
					}`}
				>
					리뷰
				</button>
			</div>
			{tab === "info" && memberInfo && (
				<div className="p-4">
					<h2 className="text-xl font-bold">{memberInfo.user_name}</h2>
					<p className="text-gray-600">{memberInfo.email}</p>
					<ul className="mt-4 space-y-2">
						<li>
							회원 가입일:{" "}
							{new Date(memberInfo.created_at).toLocaleDateString()}
						</li>
						<li>
							마지막 업데이트:{" "}
							{new Date(memberInfo.updated_at).toLocaleDateString()}
						</li>
						<li>업데이트 횟수: {memberInfo.update_count}</li>
					</ul>
				</div>
			)}
			{tab === "reviews" && (
				<div className="p-4">
					{reviews.length > 0 ? (
						reviews.map((review) => (
							<div
								key={review.id}
								className="mb-4 rounded-md border bg-white p-4"
							>
								<h3 className="font-bold">{review.smoking_area_name}</h3>
								<p className="text-sm text-gray-500">{review.body}</p>
								<div className="flex justify-between text-gray-400">
									<span>⭐ {review.score}</span>
									<span>
										{new Date(review.created_at).toLocaleDateString()}
									</span>
								</div>
							</div>
						))
					) : (
						<p className="text-center text-gray-500">작성한 리뷰가 없습니다.</p>
					)}
				</div>
			)}
		</div>
	)
}
