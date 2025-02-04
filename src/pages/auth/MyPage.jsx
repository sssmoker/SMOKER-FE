import React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import BackButton from "@/components/common/button/BackButton"
import { useAuthContext } from "@/contexts/AuthContext" // ✅ AuthContext 가져오기

export default function MyPage() {
	const navigate = useNavigate()
	const { member, logout, deactivateAccount } = useAuthContext() // ✅ member 정보 추가

	console.log("✅ [MyPage] 현재 로그인된 member:", member) // 🔍 로그인된 멤버 확인

	// ✅ 메뉴 리스트 유지 (로그아웃과 탈퇴하기 포함)
	const menuItems = [
		{ label: "회원 정보", path: "/my-page/info" },
		{ label: "공지사항", path: "/notices" },
		{ label: "자주 묻는 질문", path: "/faq" },
		{ label: "1:1 문의", path: "/inquiry" },
		{ label: "서비스 이용 약관", path: "/terms" },
		{ label: "위치 기반 서비스 이용 약관", path: "/location-terms" },
		{ label: "개인정보처리방침", path: "/privacy-policy" },
	]

	// ✅ 로그아웃 버튼 클릭 시 실행
	const handleLogout = () => {
		console.log("🚪 [MyPage] 로그아웃 시도 중...")
		logout()
		navigate("/login") // 로그아웃 후 로그인 페이지로 이동
	}

	// ✅ 탈퇴하기 버튼 클릭 시 실행
	const handleDeactivate = async () => {
		const confirmDeactivate = window.confirm("정말 탈퇴하시겠습니까?")
		if (confirmDeactivate) {
			console.log("⚠️ [MyPage] 탈퇴 진행 중...")
			await deactivateAccount()
			navigate("/login") // 탈퇴 후 로그인 페이지로 이동
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
