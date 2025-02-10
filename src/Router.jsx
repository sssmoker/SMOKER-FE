import React from "react"
import { createBrowserRouter, Outlet } from "react-router-dom"
import RootLayout from "@/layouts/root-layout"
import HomePage from "@/pages/HomePage"
import ListPage from "@/pages/ListPage"
import SmokingAreaPage from "@/pages/smoking-area/SmokingAreaPage"
import SmokingAreaUpdatePage from "@/pages/smoking-area/SmokingAreaUpdatePage"
import WritingReviewPage from "@/pages/smoking-area/WritingReviewPage"
import AddSmokingAreaPage from "@/pages/add-smoking-area/AddSmokingAreaPage"
import AddSmokingAreaNamePage from "@/pages/add-smoking-area/AddSmokingAreaNamePage"
import MyPage from "@/pages/auth/MyPage"
import MemberInfoPage from "@/pages/auth/MemberInfoPage"
import LoginPage from "@/pages/auth/LoginPage"
import SavedSmokingAreasPage from "@/pages/favorites/SavedSmokingAreasPage"
import AddSmokingAreaImagePage from "@/pages/add-smoking-area/AddSmokingAreaImagePage"
import EditNamePage from "@/pages/auth/EditNamePage"
import NoticePage from "@/pages/notices/NoticePage"
import SmokingAreaHistoryPage from "./pages/smoking-area/SmokingAreaHistoryPage"
const listRoutes = [
	{
		index: true,
		element: <ListPage />,
	},
	{
		path: "smoking-area",
		element: <Outlet />,
		children: [
			{ index: true, element: <SmokingAreaPage /> },
			{ path: "detail", element: <SmokingAreaDetailPage /> },
			{ path: "review", element: <SmokingAreaReviewPage /> },
			{ path: "update", element: <SmokingAreaUpdatePage /> },
			{ path: "writing-review", element: <WritingReviewPage /> },
			{
				index: true,
				element: <SmokingAreaPage />,
			},
			{
				path: "history",
				element: <SmokingAreaHistoryPage />,
			},
			{
				path: "update",
				element: <SmokingAreaUpdatePage />,
			},
			{
				path: "writing-review",
				element: <WritingReviewPage />,
			},
		],
	},
]

const myPageRoutes = [
	{
		index: true,
		element: <MyPage />,
	},
	{
		path: "info",
		element: <Outlet />,
		children: [
			{ index: true, element: <MemberInfoPage /> },
			{ path: "edit-name", element: <EditNamePage /> },
		],
	},
]

const addSmokingAreaRoutes = [
	{ path: "location", element: <AddSmokingAreaPage /> },
	{ path: "name", element: <AddSmokingAreaNamePage /> },
	{ path: "image", element: <AddSmokingAreaImagePage /> },
]

const favoritesRoutes = [{ index: true, element: <SavedSmokingAreasPage /> }]

const noticesRoutes = [{ index: true, element: <NoticePage /> }] //	공지사항목록 단건조회, faq(자주묻는질문),자주묻는 질문 단건 조회 추가예정

const routes = [
	{ index: true, element: <HomePage /> },
	{ path: "list", element: <Outlet />, children: listRoutes },
	{
		path: "add-smoking-area",
		element: <Outlet />,
		children: addSmokingAreaRoutes,
	},
	{ path: "my-page", element: <Outlet />, children: myPageRoutes },
	{ path: "favorites", element: <Outlet />, children: favoritesRoutes },
	{ path: "notices", element: <Outlet />, children: noticesRoutes },
	{ path: "login", element: <LoginPage /> },
]

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: routes,
	},
])

export default router
