const BASE_URL = import.meta.env.VITE_API_BASE_URL

// 인가 코드 백엔드에 넘기고 토큰 받기 (카카오 로그인)
export const kakaoLogin = (code, state) => async (dispatch) => {
	dispatch({ type: "KAKAO_LOGIN_REQUEST" })

	try {
		const response = await fetch(
			`${BASE_URL}/api/auth/login/kakao?code=${code}&state=${state}`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
			},
		)

		if (!response.ok) {
			throw new Error("카카오 로그인 요청 실패")
		}

		const data = await response.json()

		dispatch({ type: "KAKAO_LOGIN_SUCCESS", payload: data.result })

		sessionStorage.setItem(
			"tokens",
			JSON.stringify({
				accessToken: data.result.accessToken,
				refreshToken: data.result.refreshToken,
			}),
		)
		sessionStorage.setItem("member", JSON.stringify(data.result))
	} catch (error) {
		dispatch({ type: "KAKAO_LOGIN_FAILURE", payload: error.message })
	}
}

// 인가 코드 백엔드에 넘기고 토큰 받기 (구글 로그인)
export const googleLogin = (code, state) => async (dispatch) => {
	dispatch({ type: "GOOGLE_LOGIN_REQUEST" })

	try {
		const response = await fetch(
			`${BASE_URL}/api/auth/login/google?code=${code}&state=${state}`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
			},
		)

		const data = await response.json()

		if (!data.result || !data.result.accessToken) {
			throw new Error("Google 로그인 실패")
		}

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

// 로그아웃
export const logout = () => async (dispatch) => {
	try {
		const tokens = sessionStorage.getItem("tokens")
		const parsedTokens = tokens ? JSON.parse(tokens) : null
		const accessToken = parsedTokens?.accessToken

		if (!accessToken) {
			throw new Error("로그인된 사용자가 없습니다.")
		}

		const response = await fetch(`${BASE_URL}/api/auth/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		})

		if (!response.ok) {
			throw new Error("로그아웃 요청 실패")
		}

		dispatch({ type: "LOGOUT" })
		sessionStorage.removeItem("tokens")
		sessionStorage.removeItem("member")
	} catch (error) {
		console.error("로그아웃 실패:", error)
		dispatch({ type: "LOGOUT_FAILURE", payload: error.message })
	}
}

// 회원 탈퇴
export const deactivateAccount = () => async (dispatch) => {
	dispatch({ type: "DEACTIVATE_ACCOUNT_REQUEST" })

	try {
		const tokens = sessionStorage.getItem("tokens")
		const parsedTokens = tokens ? JSON.parse(tokens) : null
		const accessToken = parsedTokens?.accessToken

		if (!accessToken) {
			throw new Error("로그인된 사용자가 없습니다.")
		}

		const response = await fetch(`${BASE_URL}/api/auth/deactivate`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		})

		if (!response.ok) {
			throw new Error("회원 탈퇴 요청 실패")
		}

		dispatch({ type: "DEACTIVATE_ACCOUNT_SUCCESS" })
		sessionStorage.removeItem("tokens")
		sessionStorage.removeItem("member")
	} catch (error) {
		console.error("회원 탈퇴 실패:", error)
		dispatch({ type: "DEACTIVATE_ACCOUNT_FAILURE", payload: error.message })
	}
}
