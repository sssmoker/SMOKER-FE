import React from "react"
import Search from "../components/home/SearchBar"

export default function HomePage() {
	return (
		<>
			<div className="container h-[100%] bg-white text-black">
				<Search />
				<p>home page</p>
			</div>
		</>
	)
}
