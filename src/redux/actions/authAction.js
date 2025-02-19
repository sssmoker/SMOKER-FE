const BASE_URL = import.meta.env.VITE_API_BASE_URL

// JWT 토큰 가져오기 (세션 스토리지에서 가져옴)
const getStoredTokens = () => {
	const tokens = sessionStorage.getItem("tokens")
	return tokens ? JSON.parse(tokens) : null
}

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

		const data = await response.json()

		if (!response.ok || !data.result) {
			throw new Error(data.message || "카카오 로그인 요청 실패")
		}

		// Redux 상태 업데이트
		dispatch({ type: "KAKAO_LOGIN_SUCCESS", payload: data.result })

		// 세션 스토리지에 토큰 저장
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

// 구글 로그인
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

		if (!response.ok || !data.result) {
			throw new Error(data.message || "Google 로그인 실패")
		}

		// Redux 상태 업데이트
		dispatch({ type: "GOOGLE_LOGIN_SUCCESS", payload: data.result })

		// 세션 스토리지에 토큰 저장
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
		const tokens = getStoredTokens()
		const accessToken = tokens?.accessToken

		if (!accessToken) throw new Error("로그인된 사용자가 없습니다.")

		const response = await fetch(`${BASE_URL}/api/auth/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		})

		if (!response.ok) throw new Error("로그아웃 요청 실패")

		// Redux 상태 변경 및 로컬 데이터 삭제
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
		const tokens = getStoredTokens()
		const accessToken = tokens?.accessToken

		if (!accessToken) throw new Error("로그인된 사용자가 없습니다.")

		const response = await fetch(`${BASE_URL}/api/auth/deactivate`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		})

		if (!response.ok) throw new Error("회원 탈퇴 요청 실패")

		dispatch({ type: "DEACTIVATE_ACCOUNT_SUCCESS" })
		sessionStorage.removeItem("tokens")
		sessionStorage.removeItem("member")
	} catch (error) {
		console.error("회원 탈퇴 실패:", error)
		dispatch({ type: "DEACTIVATE_ACCOUNT_FAILURE", payload: error.message })
	}
}

// JWT 액세스 토큰 재발급
export const refreshAccessToken = () => async (dispatch) => {
	try {
		// 세션 스토리지에서 refreshToken 가져오기
		const tokens = getStoredTokens()
		const refreshToken = tokens?.refreshToken

		if (!refreshToken) {
			console.error("🚨 Refresh Token이 없습니다. 다시 로그인하세요!")
			dispatch(logout())
			throw new Error("Unauthorized: No Refresh Token")
		}

		const response = await fetch(`${BASE_URL}/api/auth/refresh`, {
			method: "POST", // POST 요청으로 변경
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${refreshToken}`, // 헤더에 추가
			},
			body: JSON.stringify({ refreshToken }), // Body에도 추가
		})

		if (!response.ok) {
			throw new Error("❌ 토큰 재발급 실패")
		}

		const data = await response.json()
		console.log(" 새 JWT 액세스 토큰 재발급 완료")

		// Redux 상태 업데이트
		dispatch({ type: "REFRESH_TOKEN_SUCCESS", payload: data.result })

		// sessionStorage에 갱신된 토큰 저장
		sessionStorage.setItem(
			"tokens",
			JSON.stringify({
				accessToken: data.result.accessToken,
				refreshToken: data.result.refreshToken, // 리프레시 토큰도 갱신
			}),
		)

		return data.result.accessToken
	} catch (error) {
		console.error("❌ JWT 액세스 토큰 재발급 실패:", error)
		dispatch(logout()) // 재발급 실패 시 강제 로그아웃
		throw error
	}
}
