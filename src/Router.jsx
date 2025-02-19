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
import MemberReviewsPage from "@/pages/auth/MemberReviewsPage"
import EditNamePage from "@/pages/auth/EditNamePage"
import QuestionsPage from "@/pages/questions/QuestionsPage"
import NoticesPage from "@/pages/notices/NoticesPage"
import LoginPage from "@/pages/auth/LoginPage"
import SavedSmokingAreasPage from "@/pages/favorites/SavedSmokingAreasPage"
import AddSmokingAreaImagePage from "@/pages/add-smoking-area/AddSmokingAreaImagePage"
import SmokingAreaHistoryPage from "./pages/smoking-area/SmokingAreaHistoryPage"
import SmokingAreaDetailPage from "./pages/smoking-area/SmokingAreaDetailPage"
import SmokingAreaReviewPage from "./pages/smoking-area/SmokingAreaReviewPage"
import NoticeDetailPage from "@/pages/notices/NoticeDetailPage"
import KakaoOAuthRedirectHandler from "@/pages/auth/KakaoOAuthRedirectHandler"
import GoogleOAuth2RedirectHandler from "./pages/auth/GoogleOAuth2RedirectHandler"

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
			{ path: "history", element: <SmokingAreaHistoryPage /> },
		],
	},
]

const myPageRoutes = [
	{
		index: true,
		element: <MyPage />,
	},
	{
		path: ":memberId",
		element: <Outlet />,
		children: [
			{ path: "info", element: <MemberInfoPage /> },
			{ path: "reviews", element: <MemberReviewsPage /> },
			{ path: "name", element: <EditNamePage /> },
		],
	},
	{ path: "questions", element: <QuestionsPage /> },
	{ path: "notices", element: <NoticesPage /> },
	{ path: "notices/detail/:noticeId", element: <NoticeDetailPage /> },
]

const addSmokingAreaRoutes = [
	{ path: "location", element: <AddSmokingAreaPage /> },
	{ path: "name", element: <AddSmokingAreaNamePage /> },
	{ path: "image", element: <AddSmokingAreaImagePage /> },
]

const favoritesRoutes = [{ index: true, element: <SavedSmokingAreasPage /> }]

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
	{ path: "login", element: <LoginPage /> },
	{ path: "auth/kakao/callback", element: <KakaoOAuthRedirectHandler /> },
	{ path: "auth/google/callback", element: <GoogleOAuth2RedirectHandler /> },
]

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: routes,
	},
])

export default router
