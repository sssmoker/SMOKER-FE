import React, { createContext, useState, useEffect, useContext } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [member, setMember] = useState(null)
	const [loading, setLoading] = useState(true)
	const [tokens, setTokens] = useState({
		accessToken: null,
		refreshToken: null,
	})

	useEffect(() => {
		try {
			const storedMember = sessionStorage.getItem("member")
			const storedTokens = sessionStorage.getItem("tokens")

			if (storedMember && storedTokens) {
				const parsedMember = JSON.parse(storedMember)
				const parsedTokens = JSON.parse(storedTokens)

				if (parsedMember?.memberId) {
					setMember(parsedMember)
					setTokens(parsedTokens)
				} else {
					sessionStorage.removeItem("member")
					sessionStorage.removeItem("tokens")
				}
			}
		} catch (error) {
			console.error("[AuthContext] 세션 데이터 불러오기 오류:", error)
		} finally {
			setLoading(false)
		}
	}, [])

	//백엔드 서버와 연결시 그거에 맞게 수정 (현재 JSON)
	const login = async (provider) => {
		try {
			const memberResponse = await fetch(
				`http://localhost:3001/members?loginType=${provider}`,
			)
			const memberData = await memberResponse.json()

			if (memberData.length === 0) {
				throw new Error(`${provider} 로그인 실패 (해당 사용자 없음)`)
			}

			const member = memberData[0]

			const authResponse = await fetch(
				`http://localhost:3001/authResponses?memberId=${member.memberId}`,
			)
			const authData = await authResponse.json()

			if (authData.length === 0) {
				throw new Error("로그인 정보가 없습니다.")
			}

			const authTokens = authData[0]

			sessionStorage.setItem("tokens", JSON.stringify(authTokens))
			sessionStorage.setItem("member", JSON.stringify(member))

			setTokens(authTokens)
			setMember(member)

			return true
		} catch (error) {
			console.error("[AuthContext] 로그인 오류:", error)
			return false
		}
	}

	const logout = () => {
		sessionStorage.removeItem("member")
		sessionStorage.removeItem("tokens")
		setMember(null)
		setTokens({ accessToken: null, refreshToken: null })
	}

	return (
		<AuthContext.Provider value={{ member, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => useContext(AuthContext)

/*
import React, { createContext, useState, useEffect, useContext } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [member, setMember] = useState(null)
	const [loading, setLoading] = useState(true)
	const [tokens, setTokens] = useState({
		accessToken: null,
		refreshToken: null,
	})

	useEffect(() => {
		try {
			const storedMember = sessionStorage.getItem("member")
			const storedTokens = sessionStorage.getItem("tokens")

			if (storedMember && storedTokens) {
				const parsedMember = JSON.parse(storedMember)
				const parsedTokens = JSON.parse(storedTokens)

				if (parsedMember?.memberId) {
					setMember(parsedMember)
					setTokens(parsedTokens)
				} else {
					sessionStorage.removeItem("member")
					sessionStorage.removeItem("tokens")
				}
			}
		} catch (error) {
			console.error("[AuthContext] 세션 데이터 불러오기 오류:", error)
		} finally {
			setLoading(false)
		}
	}, [])

	// 로그인 함수 (provider: "kakao" or "google")
	const login = async (provider, code) => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/auth/login/${provider}?code=${code}`,
			)
			const data = await response.json()

			if (!data.accessToken) {
				throw new Error(`${provider} 로그인 실패`)
			}

			sessionStorage.setItem(
				"tokens",
				JSON.stringify({
					accessToken: data.accessToken,
					refreshToken: data.refreshToken,
				}),
			)
			sessionStorage.setItem("member", JSON.stringify(data.member))

			setTokens({
				accessToken: data.accessToken,
				refreshToken: data.refreshToken,
			})
			setMember(data.member)

			return true
		} catch (error) {
			console.error(`[AuthContext] ${provider} 로그인 오류:`, error)
			return false
		}
	}

	const logout = () => {
		sessionStorage.removeItem("member")
		sessionStorage.removeItem("tokens")
		setMember(null)
		setTokens({ accessToken: null, refreshToken: null })
	}

	return (
		<AuthContext.Provider value={{ member, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => useContext(AuthContext)
export default AuthContext

*/
