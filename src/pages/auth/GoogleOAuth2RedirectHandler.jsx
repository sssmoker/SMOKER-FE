import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { googleLogin } from "@/redux/actions/authAction" // 액션 호출

export default function GoogleOAuth2RedirectHandler() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search) // URL에서 code & state 가져오기
		const code = urlParams.get("code")
		const state = urlParams.get("state")

		if (code) {
			dispatch(googleLogin(code, state))
				.then(() => navigate("/")) // 로그인 성공 시 홈으로 이동
				.catch(() => navigate("/login")) // 실패 시 로그인 페이지로 이동
		} else {
			console.error("OAuth 코드 또는 state 없음!")
			navigate("/login")
		}
	}, [dispatch, navigate])

	return <p>구글 로그인 처리 중...</p> // 나중에 로딩 Spinner 추가 가능
}
