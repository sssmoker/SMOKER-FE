import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { kakaoLogin } from "@/redux/actions/authAciton"
import { useNavigate } from "react-router-dom"

export default function KakaoOAuthRedirectHandler() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)
		const code = urlParams.get("code")
		const state = urlParams.get("state")

		if (code) {
			dispatch(kakaoLogin(code, state))
				.then(() => {
					navigate("/")
				})
				.catch((error) => {
					console.error("카카오 로그인 실패:", error)
					navigate("/login")
				})
		} else {
			console.error("OAuth 코드 또는 state 없음!")
			navigate("/login")
		}
	}, [dispatch, navigate])

	return <p>카카오 로그인 처리 중...</p>
}
