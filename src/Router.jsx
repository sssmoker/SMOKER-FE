import React from "react"
import { createBrowserRouter, Outlet } from "react-router-dom"
import RootLayout from "@/layouts/root-layout"
import HomePage from "@/pages/HomePage"
import ListPage from "@/pages/ListPage"
import SmokingAreaPage from "@/pages/smoking-area/SmokingAreaPage"
import SmokingAreaDetailPage from "@/pages/smoking-area/SmokingAreaDetailPage"
import SmokingAreaReviewPage from "@/pages/smoking-area/SmokingAreaReviewPage"
import SmokingAreaUpdatePage from "@/pages/smoking-area/SmokingAreaUpdatePage"
import WritingReviewPage from "@/pages/smoking-area/WritingReviewPage"
import AddSmokingAreaPage from "@/pages/add-smoking-area/AddSmokingAreaPage"
import AddSmokingAreaNamePage from "@/pages/add-smoking-area/AddSmokingAreaNamePage"
import MyPage from "@/pages/auth/MyPage"
import MemberInfoPage from "@/pages/auth/MemberInfoPage"
import LoginPage from "@/pages/auth/LoginPage"
import UpdateSmokingAreaPage from "@/pages/UpdateSmokingAreaPage"
import SavedSmokingAreasPage from "@/pages/favorites/SavedSmokingAreasPage"
import AddSmokingAreaImagePage from "@/pages/add-smoking-area/AddSmokingAreaImagePage"

// "list" 경로와 하위 페이지들
const listRoutes = [
	{ index: true, element: <ListPage /> },
	{
		path: "smoking-area",
		element: <Outlet />,
		children: [
			{ index: true, element: <SmokingAreaPage /> },
			{ path: "detail", element: <SmokingAreaDetailPage /> },
			{ path: "review", element: <SmokingAreaReviewPage /> },
			{ path: "update", element: <SmokingAreaUpdatePage /> },
			{ path: "writing-review", element: <WritingReviewPage /> },
		],
	},
]

// "add-smoking-area" 경로와 하위 페이지들
const addSmokingAreaRoutes = [
	{ path: "location", element: <AddSmokingAreaPage /> },
	{ path: "name", element: <AddSmokingAreaNamePage /> },
	{ path: "image", element: <AddSmokingAreaImagePage /> },
]

// "my-page" 경로와 하위 페이지들 (로그인은 개별 경로로 이동)
const myPageRoutes = [
	{ index: true, element: <MyPage /> },
	{ path: "info", element: <MemberInfoPage /> },
]

// "favorites" 경로 추가
const favoritesRoutes = [{ index: true, element: <SavedSmokingAreasPage /> }]

// 전체 루트와 경로 정의
const routes = [
	{ index: true, element: <HomePage /> },
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
	{
		path: "update-smoking-area",
		element: <UpdateSmokingAreaPage />, // 흡연 구역 업데이트 페이지
	},
	{
		path: "login", // 기존 "my-page/login"에서 "/"로 바로 접근하도록 변경
		element: <LoginPage />,
	},
]

// createBrowserRouter로 전체 라우팅 설정
export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: routes,
	},
])

export default router
