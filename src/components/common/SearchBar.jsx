import React, { useState } from "react"
import { Search } from "lucide-react"
import AroundMeBtn from "./AroundMeBtn"

export default function SearchBar() {
	const [searchTerm, setSearchTerm] = useState("")

	const handleInputChange = (e) => {
		const value = e.target.value
		setSearchTerm(value)
		console.log("Search Term:", value)
	}

	return (
		<div className="container fixed left-[4vw] right-[4vw] top-[env(safe-area-inset-top)] mx-5 flex items-center space-x-3 rounded-lg bg-white px-4 py-2 shadow-md">
			<Search className="h-5 w-5 text-[#4517FF]" />
			<input
				type="text"
				placeholder="내 근처 흡연구역이 궁금하다면"
				value={searchTerm}
				onChange={handleInputChange}
				className="flex-grow border-none text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
			/>
			<div className="mx-3 h-5 w-[1px] bg-[#4517FF]"></div>
			<AroundMeBtn />
		</div>
	)
}
