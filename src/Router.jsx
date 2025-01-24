import React from "react"
import { createBrowserRouter, Outlet } from "react-router-dom"
import RootLayout from "@/layouts/root-layout"
import HomePage from "@/pages/HomePage"
import ListPage from "@/pages/ListPage"
import SmokingAreaPage from "@/pages/SmokingAreaPage"
import SmokingAreaDetailPage from "@/pages/SmokingAreaDetailPage"
import SmokingAreaReviewPage from "@/pages/SmokingAreaReviewPage"
import SmokingAreaUpdatePage from "@/pages/SmokingAreaUpdatePage"
import WritingReviewPage from "@/pages/WritingReviewPage"
import AddSmokingAreaPage from "@/pages/AddSmokingAreaPage"
import AddSmokingAreaNamePage from "@/pages/AddSmokingAreaNamePage"
import AddSmokingAreaDetailsPage from "@/pages/AddSmokingAreaDetailsPage"
import MyPage from "@/pages/MyPage"
import MemberInfoPage from "@/pages/MemberInfoPage"
import LoginPage from "@/pages/LoginPage"
import UpdateSmokingAreaPage from "@/pages/UpdateSmokingAreaPage"
import SavedSmokingAreasPage from "@/pages/SavedSmokingAreasPage"

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
				element: <SmokingAreaPage />,
			},
			{
				path: "detail",
				element: <SmokingAreaDetailPage />, // 상세 정보 페이지
			},
			{
				path: "review",
				element: <SmokingAreaReviewPage />, // 리뷰 페이지
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
		path: "details",
		element: <AddSmokingAreaDetailsPage />, // 상세 정보 입력 페이지
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
	{
		path: "update-smoking-area",
		element: <UpdateSmokingAreaPage />, // 흡연 구역 업데이트 페이지
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
