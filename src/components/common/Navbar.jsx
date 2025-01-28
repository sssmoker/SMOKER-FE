import React, { useState } from "react"
import { MapPin, PencilLine, Star, User } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Navbar({ onRefresh }) {
	const [activeIndex, setActiveIndex] = useState(0)
	const navigate = useNavigate()

	const menuItems = [
		{ icon: <MapPin className="h-6 w-6" />, label: "지도", path: "/" },
		{
			icon: <PencilLine className="h-6 w-6" />,
			label: "등록",
			path: "/add-smoking-area",
		},
		{
			icon: <Star className="h-6 w-6" />,
			label: "저장",
			path: "/favorites",
		},
		{
			icon: <User className="h-6 w-6" />,
			label: "마이페이지",
			path: "/my-page",
		},
	]

	const handleMenuClick = (index, path) => {
		setActiveIndex(index)

		if (path === "/") {
			// "지도" 버튼 클릭 시 onRefresh 호출
			navigate(path) // 메인 페이지(`/`)로 이동

			onRefresh?.() // onRefresh가 전달되었을 경우에만 실행
		} else {
			navigate(path)
		}
	}

	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-full">
			<div className="relative z-50 flex h-[10vh] items-center justify-between rounded-t-xl bg-white px-4 pb-2 shadow-lg">
				{menuItems.map((item, index) => (
					<button
						key={index}
						onClick={() => handleMenuClick(index, item.path)}
						className={`flex w-full flex-col items-center justify-center rounded-lg transition-all duration-300 hover:text-[#4517FF] ${
							activeIndex === index
								? "h-[6vh] bg-[#F6F3FF] text-[#4517FF]"
								: "text-gray-600"
						}`}
					>
						{item.icon}
						<span
							className={`mt-1 text-xs font-medium transition-opacity duration-300 ${
								activeIndex === index ? "opacity-100" : "opacity-50"
							}`}
						>
							{item.label}
						</span>
					</button>
				))}
			</div>
		</div>
	)
}
