import React from "react"
import SearchBar from "@/components/home/SearchBar"
import SmokingAreaList from "@/components/list/card-list/SmokingAreaList"

export default function ListPage() {
	return (
		<>
			<div className="container h-[100%] bg-white text-black">
				<SearchBar />

				<div className="pb-[60px] pt-28">
					{/* 필터 */}
					<SmokingAreaList />
				</div>
			</div>
		</>
	)
}
