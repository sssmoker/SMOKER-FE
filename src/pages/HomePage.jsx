import React from "react"
import Search from "../components/HM/SearchBar"

export default function HomePage() {
	return (
		<>
			<div className="container h-[100vh] bg-white text-black">
				<Search />
				<p>home page</p>
			</div>
		</>
	)
}
