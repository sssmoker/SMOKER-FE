import React from "react"
import { createBrowserRouter, Outlet } from "react-router-dom"
import RootLayout from "@/layouts/root-layout"
import HomePage from "@/pages/HomePage"
import ListPage from "@/pages/ListPage"
import SmokingAreaPage from "@/pages/SmokingAreaPage"
import WritingReviewPage from "@/pages/WritingReviewPage"
import AddSmokingAreaPage from "@/pages/AddSmokingAreaPage"
import MyPage from "@/pages/MyPage"

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
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <ListPage />,
					},
					{
						path: "smoking-area",
						element: <Outlet />,
						children: [
							{
								index: true,
								element: <SmokingAreaPage />,
							},
							{
								path: "writing-review",
								element: <WritingReviewPage />,
							},
						],
					},
				],
			},
			{
				path: "add-smoking-area",
				element: <AddSmokingAreaPage />,
			},
			{
				path: "my-page",
				element: <MyPage />
			}
		],
	},
])
