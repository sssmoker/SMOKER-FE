import React from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Navbar from "@/components/common/Navbar"

const RootLayout = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const handleRefresh = () => {
		if (location.pathname === "/") {
			console.log("Refreshing HomePage...")
			window.location.reload() // 홈 페이지에서만 강제 새로고침
		} else {
			console.log("Navigating to HomePage...")
			navigate("/", { replace: true })
		}
	}

	return (
		<>
			<Outlet />
			<Navbar onRefresh={handleRefresh} />
		</>
	)
}

export default RootLayout
