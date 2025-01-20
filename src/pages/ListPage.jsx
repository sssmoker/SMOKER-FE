import SearchBar from "@/components/common/SearchBar"
import SmokingAreaList from "@/components/AreaList/SmokingAreaList"
import React from "react"

export default function ListPage() {
	return (
		<>
			<SearchBar />

			<div className="pt-28">
				<SmokingAreaList />
			</div>
		</>
	)
}
