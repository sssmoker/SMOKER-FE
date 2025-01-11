import React from "react"
import { createBrowserRouter } from "react-router-dom"
import RootLayout from "./layouts/root-layout"
import HomePage from "./pages/HomePage"
import ListPage from "./pages/ListPage"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		// errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "list",
				element: <ListPage />,
			},
		],
	},
])
