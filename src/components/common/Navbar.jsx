import React, { useState } from "react"
import { MapPin, PencilLine, Star, User } from "lucide-react"

export default function Navbar() {
	const [activeIndex, setActiveIndex] = useState(null)

	const menuItems = [
		{ icon: <MapPin className="h-6 w-6" />, label: "Map" },
		{ icon: <PencilLine className="h-6 w-6" />, label: "Edit" },
		{ icon: <Star className="h-6 w-6" />, label: "Favorites" },
		{ icon: <User className="h-6 w-6" />, label: "Profile" },
	]

	return (
		<div className="fixed bottom-0 left-0 right-0 mx-auto w-[400px] max-w-[400px]">
			<div className="h-[30px] rounded-t-lg bg-gradient-to-t from-white to-transparent"></div>
			<div className="flex h-[6vh] items-center justify-between rounded-b-lg bg-white p-4 shadow-lg">
				{menuItems.map((item, index) => (
					<button
						key={index}
						onClick={() => setActiveIndex(index)}
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
