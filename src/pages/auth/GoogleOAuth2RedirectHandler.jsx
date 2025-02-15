import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { googleLogin } from "@/redux/actions/authAciton" // 액션 호출

export default function GoogleOAuth2RedirectHandler() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)
		const code = urlParams.get("code")

		if (code) {
			dispatch(googleLogin(code))
				.then(() => navigate("/")) // 로그인 성공 시 홈으로 이동
				.catch(() => navigate("/login")) // 실패 시 로그인 페이지로 이동
		}
	}, [dispatch, navigate])

	return <p>구글 로그인 처리 중...</p> // 나중에 로딩 Spinner 추가 가능
}
