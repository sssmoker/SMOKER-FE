import React from "react"
import { createBrowserRouter, Outlet } from "react-router-dom"
import RootLayout from "@/layouts/root-layout"
import HomePage from "@/pages/main/HomePage"
import ListPage from "@/pages/main/ListPage"
import SmokingAreaDetailPage from "@/pages/smoking-area/SmokingAreaDetailPage"
import SmokingAreaHistoryPage from "@/pages/smoking-area/SmokingAreaReviewPage"
import WritingReviewPage from "@/pages/smoking-area/WritingReviewPage"
import SmokingAreaReviewPage from "@/pages/update-smoking-area/SmokingAreaHistoryPage"
import SmokingAreaUpdatePage from "@/pages/update-smoking-area/SmokingAreaUpdatePage"
import AddSmokingAreaPage from "@/pages/add-smoking-area/AddSmokingAreaPage"
import AddSmokingAreaNamePage from "@/pages/add-smoking-area/AddSmokingAreaNamePage"
import AddSmokingAreaImagePage from "@/pages/add-smoking-area/AddSmokingAreaImagePage"
import SavedSmokingAreasPage from "@/pages/favorites/SavedSmokingAreasPage"
import MyPage from "@/pages/my-page-list/MyPage"
import MemberInfoPage from "@/pages/my-page-list/MemberInfoPage"
import MemberReviewsPage from "@/pages/my-page-list/MemberReviewsPage"
import LoginPage from "@/pages/main/LoginPage"

const listRoutes = [
	{
		index: true,
		element: <ListPage />,
	},
	{
		path: ":smokingAreaId",
		element: <Outlet />,
		children: [
			{
				path: "info",
				element: <SmokingAreaDetailPage />,
			},
			{
				path: "reviews",
				element: <SmokingAreaHistoryPage />,
			},
			{
				path: "add-review",
				element: <WritingReviewPage />,
			},
			{
				path: "history",
				element: <SmokingAreaReviewPage />,
			},
			{
				path: "history/update",
				element: <SmokingAreaUpdatePage />,
			},
		],
	},
]

const addSmokingAreaRoutes = [
	{
		path: "location",
		element: <AddSmokingAreaPage />,
	},
	{
		path: "name",
		element: <AddSmokingAreaNamePage />,
	},
	{
		path: "image",
		element: <AddSmokingAreaImagePage />,
	},
]

const myPageRoutes = [
	{
		index: true,
		element: <MyPage />,
	},
	{
		path: "login",
		element: <LoginPage />,
	},
	{
		path: ":memberId",
		element: <Outlet />,
		children: [
			{
				path: "info",
				element: <MemberInfoPage />,
			},
			{
				path: "reviews",
				element: <MemberReviewsPage />,
			},
			{
				path: "name",
				element: <MyPage />,
			},
		],
	},
	{
		path: "questions",
		element: <MyPage />,
	},
	{
		path: "notice",
		element: <MyPage />,
	},
]

const favoritesRoutes = [
	{
		index: true,
		element: <SavedSmokingAreasPage />,
	},
]

const routes = [
	{
		index: true,
		element: <HomePage />,
	},
	{
		path: "list",
		element: <Outlet />,
		children: listRoutes,
	},
	{
		path: "add-smoking-area",
		element: <Outlet />,
		children: addSmokingAreaRoutes,
	},
	{
		path: "my-page",
		element: <Outlet />,
		children: myPageRoutes,
	},
	{
		path: "favorites",
		element: <Outlet />,
		children: favoritesRoutes,
	},
]

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: routes,
	},
])

export default router
