import React from "react"
import MainPage from "./pages/MainPage"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainPage />,
		// errorElement: <NotFound />,
	},
])
