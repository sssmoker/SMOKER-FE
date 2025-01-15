import SearchBar from "@/components/HM/SearchBar"
import SmokingAreaList from "@/components/LS_01/SmokingAreaList"
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
