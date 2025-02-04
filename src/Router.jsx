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
import EditNamePage from "@/pages/auth/EditNamePage"
import NoticePage from "@/pages/notices/NoticePage"

// "list" 경로와 하위 페이지들
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
		],
	},
]

// "my-page" 경로와 하위 페이지들
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

// "add-smoking-area" 경로와 하위 페이지들
const addSmokingAreaRoutes = [
	{ path: "location", element: <AddSmokingAreaPage /> },
	{ path: "name", element: <AddSmokingAreaNamePage /> },
	{ path: "image", element: <AddSmokingAreaImagePage /> },
]

// "favorites" 경로 추가
const favoritesRoutes = [{ index: true, element: <SavedSmokingAreasPage /> }]

// "notices" 경로 추가
const noticesRoutes = [{ index: true, element: <NoticePage /> }] //	공지사항목록 단건조회, faq(자주묻는질문),자주묻는 질문 단건 조회 추가예정

// 전체 루트와 경로 정의
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

// createBrowserRouter로 전체 라우팅 설정
export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: routes,
	},
])

export default router
