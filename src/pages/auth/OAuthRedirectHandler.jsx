import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

// 백엔드와 연결시 필요. JSON할 때는 필요 없음
export default function OAuthRedirectHandler() {
	const navigate = useNavigate()

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)
		const code = urlParams.get("code")
		const provider = urlParams.get("provider") // kakao 또는 google

		if (code && provider) {
			fetch(`http://localhost:8080/api/auth/login/${provider}?code=${code}`)
				.then((res) => {
					if (!res.ok) {
						throw new Error("서버 응답 실패")
					}
					return res.json()
				})
				.then((data) => {
					if (data.accessToken) {
						sessionStorage.setItem("accessToken", data.accessToken)
						sessionStorage.setItem("refreshToken", data.refreshToken)
						sessionStorage.setItem("member", JSON.stringify(data.member))

						navigate("/")
					} else {
						throw new Error("로그인 실패: 토큰 없음")
					}
				})
				.catch((error) => {
					console.error("OAuth 로그인 오류:", error)
					navigate("/login")
				})
		} else {
			console.error("OAuth 코드 또는 provider가 없음")
			navigate("/login")
		}
	}, [navigate])

	return <p>로그인 처리 중...</p>
}
