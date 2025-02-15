import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import BackButton from "@/components/common/button/BackButton"
import { useAuthContext } from "@/contexts/AuthContext"

export default function MyPage() {
	const navigate = useNavigate()
	const { member, logout, deactivateAccount } = useAuthContext()

	useEffect(() => {
		if (!member) navigate("/login")
	}, [member, navigate])

	if (!member) return null

	const menuItems = [
		{ label: "회원 정보", path: `/my-page/${member.memberId}/info` },
		{ label: "공지사항", path: "/my-page/notices" },
		{ label: "자주 묻는 질문", path: "/my-page/questions" },
		{ label: "1:1 문의", path: "/inquiry" },
		{ label: "서비스 이용 약관", path: "/terms" },
		{ label: "위치 기반 서비스 이용 약관", path: "/location-terms" },
		{ label: "개인정보처리방침", path: "/privacy-policy" },
	]

	const handleLogout = () => {
		logout()
		navigate("/login")
	}

	const handleDeactivate = async () => {
		const confirmDeactivate = window.confirm("정말 탈퇴하시겠습니까?")
		if (confirmDeactivate) {
			await deactivateAccount()
			navigate("/login")
		}
	}

	return (
		<div className="flex h-screen flex-col bg-white">
			<header className="flex items-center bg-white p-4 text-lg font-bold">
				<BackButton className="mr-2" />
				<span>마이페이지</span>
			</header>

			<ul className="flex-1 overflow-y-auto">
				{menuItems.map((item, index) => (
					<li
						key={index}
						className="flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-gray-50"
						onClick={() => navigate(item.path)}
					>
						<span>{item.label}</span>
						<ChevronRight className="h-4 w-4 text-gray-400" />
					</li>
				))}

				<li
					className="flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-gray-50"
					onClick={handleLogout}
				>
					<span>로그아웃</span>
					<ChevronRight className="h-4 w-4 text-gray-400" />
				</li>

				<li
					className="flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-gray-50"
					onClick={handleDeactivate}
				>
					<span>탈퇴하기</span>
					<ChevronRight className="h-4 w-4 text-gray-400" />
				</li>
			</ul>
		</div>
	)
}
