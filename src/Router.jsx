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
import SmokingAreaHistoryPage from "./pages/smoking-area/SmokingAreaHistoryPage"
// "list" 경로와 하위 페이지들
const listRoutes = [
	{
		index: true, // 기본 ListPage
		element: <ListPage />,
	},
	{
		path: "smoking-area",
		element: <Outlet />, // 하위 smoking-area 페이지들
		children: [
			{
				index: true,
				element: <SmokingAreaPage />, // 상세 정보 및 후기 페이지
			},
			{
				path: "history",
				element: <SmokingAreaHistoryPage />, // 히스토리 페이지
			},
			{
				path: "update",
				element: <SmokingAreaUpdatePage />, // 흡연 구역 업데이트 페이지
			},
			{
				path: "writing-review",
				element: <WritingReviewPage />, // 리뷰 작성 페이지
			},
		],
	},
]

// "my-page" 경로와 하위 페이지들
const myPageRoutes = [
	{
		index: true,
		element: <MyPage />, // 기본 마이 페이지
	},
	{
		path: "login",
		element: <LoginPage />, // 로그인 페이지
	},
	{
		path: "info",
		element: <MemberInfoPage />, // 회원 정보 페이지
	},
]

// "add-smoking-area" 경로와 하위 페이지들
const addSmokingAreaRoutes = [
	{
		path: "location",
		element: <AddSmokingAreaPage />, // 위치 설정 페이지
	},
	{
		path: "name",
		element: <AddSmokingAreaNamePage />, // 이름 입력 페이지
	},
	{
		path: "image",
		element: <AddSmokingAreaImagePage />, // 이름 입력 페이지
	},
]

// "favorites" 경로 추가
const favoritesRoutes = [
	{
		index: true,
		element: <SavedSmokingAreasPage />, // 저장된 흡연 구역 페이지
	},
]

// 전체 루트와 경로 정의
const routes = [
	{
		index: true,
		element: <HomePage />, // 홈 페이지
	},
	{
		path: "list",
		element: <Outlet />,
		children: listRoutes, // "list"와 하위 경로
	},
	{
		path: "add-smoking-area",
		element: <Outlet />,
		children: addSmokingAreaRoutes, // "add-smoking-area"와 하위 경로
	},
	{
		path: "my-page",
		element: <Outlet />,
		children: myPageRoutes, // "my-page"와 하위 경로
	},
	{
		path: "favorites",
		element: <Outlet />,
		children: favoritesRoutes, // "favorites" 경로와 하위 경로
	},
]

// createBrowserRouter로 전체 라우팅 설정
export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />, // 레이아웃 컴포넌트
		children: routes,
	},
])

export default router
