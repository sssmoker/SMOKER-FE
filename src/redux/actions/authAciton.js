const BASE_URL = import.meta.env.VITE_API_BASE_URL

// 인가 코드 백엔드에 넘기고 토큰 받기 (카카오 로그인)
export const kakaoLogin = (code) => async (dispatch) => {
	dispatch({ type: "KAKAO_LOGIN_REQUEST" })

	try {
		const response = await fetch(
			`${BASE_URL}/api/auth/login/kakao?code=${code}`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
			},
		)

		if (!response.ok) {
			throw new Error("카카오 로그인 요청 실패")
		}

		const data = await response.json()

		dispatch({ type: "KAKAO_LOGIN_SUCCESS", payload: data })

		// 로그인 성공 시, 토큰을 저장 (세션 스토리지 또는 로컬 스토리지)
		sessionStorage.setItem(
			"tokens",
			JSON.stringify({
				accessToken: data.accessToken,
				refreshToken: data.refreshToken,
			}),
		)
		sessionStorage.setItem("member", JSON.stringify(data))
	} catch (error) {
		dispatch({ type: "KAKAO_LOGIN_FAILURE", payload: error.message })
	}
}

// 인가 코드 백엔드에 넘기고 토큰 받기 (구글 로그인)
export const googleLogin = (code) => async (dispatch) => {
	dispatch({ type: "GOOGLE_LOGIN_REQUEST" })

	try {
		const response = await fetch(
			`${BASE_URL}/api/auth/login/google?code=${code}`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
			},
		)
		const data = await response.json()

		if (!data.result || !data.result.accessToken) {
			throw new Error("Google 로그인 실패")
		}

		// 성공적으로 로그인한 경우 Redux 및 sessionStorage에 저장
		dispatch({ type: "GOOGLE_LOGIN_SUCCESS", payload: data.result })

		sessionStorage.setItem(
			"tokens",
			JSON.stringify({
				accessToken: data.result.accessToken,
				refreshToken: data.result.refreshToken,
			}),
		)
		sessionStorage.setItem("member", JSON.stringify(data.result))
	} catch (error) {
		dispatch({ type: "GOOGLE_LOGIN_FAILURE", payload: error.message })
	}
}

// 로그아웃 함수 (세션 데이터 완전 삭제)
export const logout = () => (dispatch) => {
	sessionStorage.removeItem("tokens")
	sessionStorage.removeItem("member")
	dispatch({ type: "LOGOUT" })
}
