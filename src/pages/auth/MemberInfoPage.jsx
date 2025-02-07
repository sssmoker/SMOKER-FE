import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"
import ProfileSection from "@/components/member-info/ProfileSection"
import DetailSection from "@/components/member-info/DetailSection"
import ReviewSection from "@/components/member-info/ReviewSection"
import { useAuthContext } from "@/contexts/AuthContext"

export default function MemberInfoPage() {
	const navigate = useNavigate()
	const { member } = useAuthContext()
	const [memberInfo, setMemberInfo] = useState(null)
	const [reviews, setReviews] = useState([])
	const [tab, setTab] = useState("info")

	useEffect(() => {
		if (!member) return

		const fetchMemberInfo = async () => {
			try {
				const response = await fetch(
					`http://localhost:3001/members?memberId=${member.memberId}`,
				)
				const data = await response.json()
				if (data.length > 0) setMemberInfo(data[0])
			} catch (error) {
				console.error("회원 정보 불러오기 실패:", error)
			}
		}

		const fetchReviews = async () => {
			try {
				const response = await fetch(
					`http://localhost:3001/reviews?memberId=${member.memberId}`,
				)
				const data = await response.json()
				setReviews(data)
			} catch (error) {
				console.error("리뷰 정보 불러오기 실패:", error)
			}
		}

		fetchMemberInfo()
		fetchReviews()
	}, [member])

	return (
		<div className="flex h-screen flex-col bg-white">
			<header className="flex items-center bg-white p-4 text-lg font-bold">
				<BackButton className="mr-2" />
				<span>회원정보</span>
			</header>

			<ProfileSection memberInfo={memberInfo} navigate={navigate} />

			<div className="mt-2 flex w-full justify-center border-b bg-white">
				<button
					onClick={() => setTab("info")}
					className={`w-1/2 bg-white px-4 py-2 ${
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
				<DetailSection memberInfo={memberInfo} />
			) : (
				<ReviewSection reviews={reviews} />
			)}
		</div>
	)
}
