import React from "react"
import { useNavigate } from "react-router-dom"

export default function MyPage() {
	const navigate = useNavigate()

	const menuItems = [
		{ label: "회원 정보", path: "/my-page/info" },
		{ label: "공지사항", path: "/notices" },
		{ label: "자주 묻는 질문", path: "/faq" },
		{ label: "1:1 문의", path: "/inquiry" },
		{ label: "서비스 이용 약관", path: "/terms" },
		{ label: "위치 기반 서비스 이용 약관", path: "/location-terms" },
		{ label: "개인정보처리방침", path: "/privacy-policy" },
		{ label: "로그아웃", path: "/logout" },
	]

	const handleMenuClick = (path) => {
		navigate(path)
	}

	return (
		<div className="flex h-screen flex-col bg-gray-100">
			<header className="border-b border-gray-300 p-4 text-lg font-bold">
				마이페이지
			</header>
			<ul className="flex-1 overflow-y-auto bg-white">
				{menuItems.map((item, index) => (
					<li
						key={index}
						className="cursor-pointer border-b px-4 py-3 hover:bg-gray-50"
						onClick={() => handleMenuClick(item.path)}
					>
						{item.label}
					</li>
				))}
			</ul>
		</div>
	)
}
