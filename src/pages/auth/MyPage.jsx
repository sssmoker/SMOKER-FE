import React from "react"
import { useNavigate } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import BackButton from "@/components/common/button/BackButton"

export default function MyPage() {
	const navigate = useNavigate()
	const isLoggedIn = !!sessionStorage.getItem("user") // 로그인 여부 확인

	const menuItems = [
		{
			label: isLoggedIn ? "회원 정보" : "회원가입/로그인",
			path: isLoggedIn ? "/my-page/info" : "/my-page/login",
		},
		{ label: "공지사항", path: "/notices" },
		{ label: "자주 묻는 질문", path: "/faq" },
		{ label: "1:1 문의", path: "/inquiry" },
		{ label: "서비스 이용 약관", path: "/terms" },
		{ label: "위치 기반 서비스 이용 약관", path: "/location-terms" },
		{ label: "개인정보처리방침", path: "/privacy-policy" },
		...(isLoggedIn ? [{ label: "로그아웃", path: "/logout" }] : []), // 로그인 상태일 때만 로그아웃 표시
	]

	const handleMenuClick = (path) => {
		navigate(path)
	}

	return (
		<div className="flex h-screen flex-col bg-gray-100">
			<header className="flex items-center border-b border-gray-300 p-4 text-lg font-bold">
				<BackButton className="mr-2" />
				<span>마이페이지</span>
			</header>
			<ul className="flex-1 overflow-y-auto bg-white">
				{menuItems.map((item, index) => (
					<li
						key={index}
						className="flex cursor-pointer items-center justify-between border-b px-4 py-3 hover:bg-gray-50"
						onClick={() => handleMenuClick(item.path)}
					>
						<span>{item.label}</span>
						<ChevronRight className="h-4 w-4 text-gray-400" />
					</li>
				))}
			</ul>
		</div>
	)
}
