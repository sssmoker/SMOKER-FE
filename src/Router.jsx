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
		element: <Outlet />,
		children: [
			{ index: true, element: <MemberInfoPage /> }, // 회원 정보 페이지
			{ path: "edit-name", element: <EditNamePage /> }, // 닉네임 수정 페이지
		],
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

// "notices" 경로 추가
const noticesRoutes = [
	{
		index: true,
		element: <NoticePage />, // 공지사항 목록 페이지
	},
	//	공지사항목록 단건조회, faq(자주묻는질문),자주묻는 질문 단건 조회 추가예정정
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
		path: "notices",
		element: <Outlet />,
		children: noticesRoutes, // "notices"와 하위 경로로
	},
	// {
	// 	path: "update-smoking-area",
	// 	element: <UpdateSmokingAreaPage />, // 흡연 구역 업데이트 페이지
	// },
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
