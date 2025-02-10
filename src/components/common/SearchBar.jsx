import React, { useState } from "react"
import PropTypes from "prop-types"
import { Search } from "lucide-react"
import AroundMeBtn from "@/components/common/AroundMeButton"

export default function SearchBar({ onMoveToCurrentLocation }) {
	const [searchTerm, setSearchTerm] = useState("")

	const handleInputChange = (e) => {
		setSearchTerm(e.target.value)
	}

	return (
		<div className="fixed left-0 right-0 top-[calc(env(safe-area-inset-top)+20px)] z-50 mx-5 flex w-[calc(100%-40px)] items-center space-x-3 rounded-lg bg-white px-4 py-2 shadow-md">
			<Search className="h-5 w-5 text-[#4517FF]" />
			<input
				type="text"
				placeholder="내 근처 흡연구역이 궁금하다면"
				value={searchTerm}
				onChange={handleInputChange}
				className="flex-grow border-none text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
			/>
			<div className="mx-3 h-5 w-[1px] bg-[#4517FF]"></div>
			<AroundMeBtn onClick={onMoveToCurrentLocation} />
		</div>
	)
}

SearchBar.propTypes = {
	onMoveToCurrentLocation: PropTypes.func.isRequired,
}
