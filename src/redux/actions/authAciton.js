//인가 코드 백엔드에 넘기고 토큰 받기

export const kakaoLogin = (code) => async (dispatch) => {
	dispatch({ type: "KAKAO_LOGIN_REQUEST" })

	try {
		const response = await fetch(
			//백엔드 실행포트
			`http://localhost:8080/api/auth/login/kakao?code=${code}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
		)

		if (!response.ok) {
			throw new Error("카카오 로그인 요청 실패")
		}

		const data = await response.json()

		dispatch({ type: "KAKAO_LOGIN_SUCCESS", payload: data })

		// 로그인 성공 시, 토큰을 저장 (세션 스토리지 또는 로컬 스토리지)
		sessionStorage.setItem("accessToken", data.accessToken)
	} catch (error) {
		dispatch({ type: "KAKAO_LOGIN_FAILURE", payload: error.message })
	}
}

export const logout = () => (dispatch) => {
	sessionStorage.removeItem("accessToken")
	dispatch({ type: "LOGOUT" })
}
