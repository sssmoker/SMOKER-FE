import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"
import ProfileSection from "@/components/member-info/ProfileSection"
import ReviewSection from "@/components/member-info/ReviewSection"

export default function MemberReviewsPage() {
	const navigate = useNavigate()
	const { memberId } = useParams()
	const [memberInfo, setMemberInfo] = useState(null)
	const [reviews, setReviews] = useState([])

	useEffect(() => {
		const fetchMemberInfo = async () => {
			try {
				const response = await fetch(
					`http://localhost:3001/members?memberId=${memberId}`,
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
					`http://localhost:3001/reviews?memberId=${memberId}`,
				)
				const data = await response.json()
				setReviews(data)
			} catch (error) {
				console.error("리뷰 정보 불러오기 실패:", error)
			}
		}

		fetchMemberInfo()
		fetchReviews()
	}, [memberId])

	return (
		<div className="flex h-screen flex-col bg-white">
			<header className="flex items-center bg-white p-4 text-lg font-bold">
				<BackButton className="mr-2" />
				<span>회원 리뷰</span>
			</header>

			<ProfileSection memberInfo={memberInfo} navigate={navigate} />

			<div className="mt-2 flex w-full justify-center border-b bg-white">
				<button
					onClick={() => navigate(`/my-page/${memberId}/info`)}
					className="w-1/2 px-4 py-2 text-sm text-gray-500"
				>
					상세 정보
				</button>
				<button className="w-1/2 border-b-2 border-blue-500 px-4 py-2 text-sm text-blue-500">
					리뷰
				</button>
			</div>

			<ReviewSection reviews={reviews} />
		</div>
	)
}
