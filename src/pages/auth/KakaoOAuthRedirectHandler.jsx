import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { kakaoLogin } from "@/redux/actions/authAciton"
import { useNavigate } from "react-router-dom"

//인가 코드
export default function KakaoOAuthRedirectHandler() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)
		const code = urlParams.get("code")

		const handleLogin = async () => {
			if (code) {
				try {
					await dispatch(kakaoLogin(code)) // 비동기 실행 후 완료될 때까지 대기
					navigate("/") // 성공하면 홈으로 이동
				} catch (error) {
					console.error("카카오 로그인 실패:", error)
					navigate("/login") // 실패하면 로그인 페이지로 이동
				}
			}
		}

		handleLogin() // 함수 실행
	}, [dispatch, navigate])

	return <p>로그인 처리 중...</p>
}
