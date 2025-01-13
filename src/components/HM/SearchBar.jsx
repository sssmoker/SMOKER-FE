// eslint-disable-next-line no-unused-vars
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
		<div className="container fixed left-[5vh] right-[5vh] top-5 mx-5 mt-5 flex items-center space-x-3 rounded-lg bg-white p-4 shadow-md">
			<Search className="h-6 w-6 text-[#4517FF]" />
			<input
				type="text"
				placeholder="내 근처 흡연구역이 궁금하다면"
				value={searchTerm}
				onChange={handleInputChange}
				className="flex-grow border-none text-gray-700 placeholder-gray-400 focus:outline-none"
			/>
			<div className="mx-4 h-6 w-[1px] bg-[#4517FF]"></div>
			<AroundMeBtn />
		</div>
	)
}
