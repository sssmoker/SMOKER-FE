import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"
import { Camera, Plus } from "lucide-react"

export default function MemberInfoPage() {
	const navigate = useNavigate()
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
			<header className="flex items-center p-4 text-lg font-bold">
				<BackButton className="mr-2" />
				<span>회원정보</span>
			</header>

			{/* 프로필 영역 */}
			<div className="flex flex-col items-center py-6">
				<div className="relative flex flex-col items-center">
					{/* 프로필 이미지 */}
					{/*서버에서 프로필 불러오기 추가구현 예정*/}
					<div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
						<Camera className="h-6 w-6 text-gray-500" />
						<div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-white bg-gray-200">
							<Plus className="h-4 w-4" />
						</div>
					</div>

					{/* 닉네임 + 수정 버튼 */}
					<div className="mt-2 flex flex-row items-center">
						{/* 닉네임 */}
						<div className="text-center text-lg font-bold">
							{memberInfo ? memberInfo.user_name : "닉네임을 입력하시오"}
						</div>

						{/* 수정 버튼 */}
						<div className="ml-2">
							<span
								className="cursor-pointer text-xs text-gray-500 underline hover:text-gray-700"
								onClick={() => navigate("/edit-name")}
							>
								수정
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* 탭 메뉴 (상세정보 / 리뷰) */}
			<div className="mt-2 flex w-full justify-center border-b">
				<button
					onClick={() => setTab("info")}
					className={`w-1/2 px-4 py-2 text-center ${
						tab === "info"
							? "border-b-2 border-blue-500 text-sm text-blue-500"
							: "text-sm"
					}`}
				>
					상세 정보
				</button>
				<button
					onClick={() => setTab("reviews")}
					className={`w-1/2 px-4 py-2 text-center ${
						tab === "reviews"
							? "border-b-2 border-blue-500 text-sm text-blue-500"
							: "text-sm"
					}`}
				>
					리뷰
				</button>
			</div>

			{/* 상세 정보 */}
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

			{/* 리뷰 탭 */}
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
