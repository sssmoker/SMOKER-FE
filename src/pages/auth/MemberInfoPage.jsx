import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"
import ProfileSection from "@/components/member-info/ProfileSection"
import InfoSection from "@/components/member-info/InfoSection"
import ReviewSection from "@/components/member-info/ReviewSection"

export default function MemberInfoPage() {
	const navigate = useNavigate()
	const [memberInfo, setMemberInfo] = useState(null)
	const [reviews, setReviews] = useState([])
	const [tab, setTab] = useState("info")

	useEffect(() => {
		const fetchMemberInfo = async () => {
			try {
				const response = await fetch("http://localhost:3001/member")
				const data = await response.json()
				setMemberInfo(data)
			} catch (error) {
				console.error("Failed to fetch member info:", error)
			}
		}

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

			<ProfileSection memberInfo={memberInfo} navigate={navigate} />

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

			{tab === "info" ? (
				<InfoSection memberInfo={memberInfo} />
			) : (
				<ReviewSection reviews={reviews} />
			)}
		</div>
	)
}
