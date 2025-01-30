import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"
import { Camera, Plus } from "lucide-react"

export default function MemberInfoPage() {
	const navigate = useNavigate()
	const [memberInfo, setMemberInfo] = useState(null)
	const [reviews, setReviews] = useState([])
	const [tab, setTab] = useState("info") // "info" or "reviews"
	const [profileImage, setProfileImage] = useState(null) // 추가된 상태

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

	// 📌 이미지 업로드 핸들러
	const handleImageUpload = (event) => {
		const file = event.target.files[0]
		if (file) {
			const imageUrl = URL.createObjectURL(file)
			setProfileImage(imageUrl) // 프로필 이미지 상태 업데이트
		}
	}

	return (
		<div className="flex h-screen flex-col bg-gray-100">
			{/* 헤더 */}
			<header className="flex items-center p-4 text-lg font-bold">
				<BackButton className="mr-2" />
				<span>회원정보</span>
			</header>

			{/* 프로필 영역 */}
			<div className="flex flex-col items-center py-6">
				<div className="relative flex flex-col items-center">
					{/* 프로필 이미지, 이미지 저장api 추가예정 */}
					<div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-200">
						{profileImage ? (
							<img
								src={profileImage}
								alt="Profile"
								className="h-full w-full object-cover"
							/>
						) : (
							<Camera className="h-6 w-6 text-gray-500" />
						)}
					</div>

					{/* + 버튼 (파일 업로드 or 기본이미지로 다시 바꾸기(질문할 것)) */}
					<label
						htmlFor="file-upload"
						className="absolute -bottom-1 -right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-white bg-gray-200"
					>
						<Plus className="h-4 w-4" />
					</label>
					<input
						id="file-upload"
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleImageUpload}
					/>
				</div>

				{/* 닉네임 + 수정 버튼 */}
				<div className="mt-2 flex flex-row items-center">
					<div className="text-center text-lg font-bold">
						{memberInfo ? memberInfo.user_name : "이름을 입력하시오"}
					</div>
					<div className="ml-2">
						<span
							className="cursor-pointer text-xs text-gray-500 underline hover:text-gray-700"
							onClick={() => navigate("/my-page/info/edit-name")}
						>
							수정
						</span>
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
