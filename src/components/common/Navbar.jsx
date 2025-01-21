import React, { useState } from "react"
import { MapPin, PencilLine, Star, User } from "lucide-react"
import { useNavigate } from "react-router-dom" // useNavigate 추가

export default function Navbar() {
	const [activeIndex, setActiveIndex] = useState(0)
	const navigate = useNavigate() // navigate 함수 사용

	const menuItems = [
		{ icon: <MapPin className="h-6 w-6" />, label: "Map", path: "/" },
		{
			icon: <PencilLine className="h-6 w-6" />,
			label: "Edit",
			path: "/add-smoking-area",
		},
		{
			icon: <Star className="h-6 w-6" />,
			label: "Favorites",
			path: "/favorites",
		},
		{ icon: <User className="h-6 w-6" />, label: "Profile", path: "/my-page" },
	]

	const handleMenuClick = (index, path) => {
		setActiveIndex(index)
		navigate(path) // 클릭 시 해당 경로로 이동
	}

	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-[500px]">
			{/* 상단 그라데이션 */}
			<div className="absolute inset-x-0 -top-24 z-40 h-24 bg-gradient-to-t from-white to-transparent"></div>

			{/* NavBar */}
			<div className="relative z-50 flex h-[6vh] items-center justify-between rounded-t-lg bg-white p-4 shadow-lg">
				{menuItems.map((item, index) => (
					<button
						key={index}
						onClick={() => handleMenuClick(index, item.path)} // path를 전달하여 라우팅
						className={`flex items-center rounded-lg px-3 py-2 transition-all duration-300 hover:text-[#4517FF] ${
							activeIndex === index
								? "bg-[#F6F3FF] text-[#4517FF]"
								: "text-gray-600"
						}`}
					>
						{item.icon}
						<span
							className={`ml-2 text-sm font-medium transition-opacity duration-300 ${
								activeIndex === index ? "opacity-100" : "opacity-0"
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
