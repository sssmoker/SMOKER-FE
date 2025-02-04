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

	// 🔍 현재 로그인된 사용자 정보 확인
	console.log("🔍 [MemberInfoPage] 현재 로그인된 member:", member)

	useEffect(() => {
		if (!member) {
			console.log("⚠️ [MemberInfoPage] member가 없음! API 호출 안함.")
			return
		}

		// ✅ 회원 정보 불러오기
		const fetchMemberInfo = async () => {
			try {
				console.log("📡 [MemberInfoPage] 회원 정보 요청 중...")
				const response = await fetch(
					`http://localhost:3001/members?member_id=${member.member_id}`,
				)
				const data = await response.json()
				console.log("✅ [MemberInfoPage] 불러온 회원 정보:", data[0]) // 🔹 데이터 확인
				setMemberInfo(data[0])
			} catch (error) {
				console.error("❌ [MemberInfoPage] 회원 정보 불러오기 실패:", error)
			}
		}

		// ✅ 회원 리뷰 불러오기
		const fetchReviews = async () => {
			try {
				console.log("📡 [MemberInfoPage] 리뷰 정보 요청 중...")
				const response = await fetch(
					`http://localhost:3001/reviews?member_id=${member.member_id}`,
				)
				const data = await response.json()
				console.log("✅ [MemberInfoPage] 불러온 리뷰:", data)
				setReviews(data)
			} catch (error) {
				console.error("❌ [MemberInfoPage] 리뷰 정보 불러오기 실패:", error)
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

			{/* ✅ memberInfo가 정상적으로 넘어오는지 확인 */}
			<ProfileSection memberInfo={memberInfo} navigate={navigate} />

			<div className="mt-2 flex w-full justify-center border-b bg-white">
				<button
					onClick={() => setTab("info")}
					className={`w-1/2 bg-white px-4 py-2 ${tab === "info" ? "border-b-2 border-blue-500 text-sm text-blue-500" : "text-sm"}`}
				>
					상세 정보
				</button>
				<button
					onClick={() => setTab("reviews")}
					className={`w-1/2 px-4 py-2 text-center ${tab === "reviews" ? "border-b-2 border-blue-500 text-sm text-blue-500" : "text-sm"}`}
				>
					리뷰
				</button>
			</div>

			{tab === "info" ? (
				<DetailSection memberInfo={memberInfo} /> // ✅ 변경된 컴포넌트 사용
			) : (
				<ReviewSection reviews={reviews} />
			)}
		</div>
	)
}
