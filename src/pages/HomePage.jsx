import React from "react"
import SearchBar from "@/components/home/SearchBar"

export default function HomePage() {
	return (
		<>
			<div className="container h-[100%] bg-white text-black">
				<SearchBar />
				<p>home page</p>
			</div>
		</>
	)
}
