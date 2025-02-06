import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "@/components/common/Navbar"

const RootLayout = () => {
	const handleRefresh = () => {
		// 새로고침 로직
		console.log("Refreshing HomePage...")
		window.location.reload() // 페이지 새로고침
	}

	return (
		<>
			<Outlet />
			<Navbar onRefresh={handleRefresh} />
		</>
	)
}

export default RootLayout
