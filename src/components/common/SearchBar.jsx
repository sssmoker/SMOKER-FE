import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Search } from "lucide-react"
import AroundMeBtn from "@/components/common/AroundMeButton"
import { useSearchSmokingAreas } from "@/utils/queries"

export default function SearchBar({ setData, onMoveToCurrentLocation }) {
	const [searchTerm, setSearchTerm] = useState("")

	const handleInputChange = (e) => {
		setSearchTerm(e.target.value)
	}

	const { mutate, data, error, isLoading } = useSearchSmokingAreas()

	const handleSearchSubmit = (e) => {
		e.preventDefault()
		mutate({
			search: searchTerm,
			userLat: 37.546, // 여기에 현재 위치 추가....
			userLng: 127.071,
			filter: "거리순",
		})
	}
	useEffect(() => {
		if (data) {
			setData(data)
		}
	}, [data])

	if (isLoading) {
		return <div>로딩 중...</div>
	}

	if (error) {
		return <div>에러 발생: {error.message}</div>
	}

	return (
		<form
			onSubmit={handleSearchSubmit}
			className="fixed left-0 right-0 top-[calc(env(safe-area-inset-top)+20px)] z-50 mx-5 flex w-[calc(100%-40px)] items-center space-x-3 rounded-lg bg-white px-4 py-2 shadow-md"
		>
			<Search className="h-5 w-5 text-[#4517FF]" />
			<input
				type="text"
				placeholder="내 근처 흡연구역이 궁금하다면"
				value={searchTerm}
				onChange={handleInputChange}
				className="flex-grow border-none text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
			/>
			{/* <div className="mx-3 h-5 w-[1px] bg-[#4517FF]"></div>
			<AroundMeBtn onClick={onMoveToCurrentLocation} /> */}
		</form>
	)
}

SearchBar.propTypes = {
	onMoveToCurrentLocation: PropTypes.func.isRequired,
}
