import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"
import ProfileSection from "@/components/member-info/ProfileSection"
import DetailSection from "@/components/member-info/DetailSection"

export default function MemberInfoPage() {
	const navigate = useNavigate()
	const { memberId } = useParams()
	const [memberInfo, setMemberInfo] = useState(null)

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

		fetchMemberInfo()
	}, [memberId])

	return (
		<div className="flex h-screen flex-col bg-white">
			<header className="flex items-center bg-white p-4 text-lg font-bold">
				<BackButton className="mr-2" />
				<span>회원정보</span>
			</header>

			<ProfileSection memberInfo={memberInfo} navigate={navigate} />

			<div className="mt-2 flex w-full justify-center border-b bg-white">
				<button className="w-1/2 border-b-2 border-blue-500 px-4 py-2 text-sm text-blue-500">
					상세 정보
				</button>
				<button
					onClick={() => navigate(`/my-page/${memberId}/reviews`)}
					className="w-1/2 px-4 py-2 text-sm text-gray-500"
				>
					리뷰
				</button>
			</div>

			<DetailSection memberInfo={memberInfo} />
		</div>
	)
}
