import React from "react"
import { MapPin, PencilLine, Star, User } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

export default function Navbar() {
	const navigate = useNavigate()
	const location = useLocation()

	const menuItems = [
		{ icon: <MapPin className="h-6 w-6" />, label: "지도", path: "/" },
		{
			icon: <PencilLine className="h-6 w-6" />,
			label: "등록",
			path: "/add-smoking-area/location",
		},
		{ icon: <Star className="h-6 w-6" />, label: "저장", path: "/favorites" },
		{
			icon: <User className="h-6 w-6" />,
			label: "마이페이지",
			path: "/my-page",
		},
	]
	const activeIndex = menuItems.findIndex(
		(item) => location.pathname === item.path,
	)

	return (
		<div className="fixed bottom-0 left-0 right-0 z-10 mx-auto w-full">
			<div className="relative z-50 flex h-[10vh] items-center justify-between rounded-t-xl bg-white px-4 pb-2 shadow-lg">
				{menuItems.map((item, index) => {
					const isActive = activeIndex === index

					return (
						<button
							key={index}
							onClick={() => navigate(item.path)}
							className={`flex w-full flex-col items-center justify-center rounded-lg transition-all duration-300 ${
								isActive
									? "h-[6vh] bg-[#F6F3FF] text-[#4517FF]"
									: "text-gray-600"
							}`}
						>
							<div className={`rounded-lg p-2`}>{item.icon}</div>
							<span
								className={`mt-1 text-xs font-medium ${isActive ? "text-[#4517FF]" : "text-gray-600"}`}
							>
								{item.label}
							</span>
						</button>
					)
				})}
			</div>
		</div>
	)
}
