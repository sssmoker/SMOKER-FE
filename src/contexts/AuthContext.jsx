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
				const parsedTokens = JSON.parse(storedTokens)
				const parsedMember = JSON.parse(storedMember)

				if (parsedMember && parsedMember.memberId) {
					setMember(parsedMember)
					setTokens(parsedTokens)
				} else {
					console.warn("⚠️ [AuthContext] 잘못된 member 데이터!")
					sessionStorage.removeItem("member")
					sessionStorage.removeItem("tokens")
				}
			}
		} catch (error) {
			console.error("❌ [AuthContext] 세션 데이터 불러오기 오류:", error)
		} finally {
			setLoading(false)
		}
	}, [])

	const login = async (provider) => {
		try {
			const response = await fetch(
				`http://localhost:3001/members?login_type=${provider}`,
			)
			const data = await response.json()

			if (data.length === 0) {
				throw new Error(`${provider} 로그인 실패`)
			}

			const memberData = data.find((user) => user.loginType === provider)

			if (!memberData) {
				throw new Error("해당 로그인 타입의 사용자가 없습니다.")
			}

			const tokenResponse = await fetch(
				`http://localhost:3001/authResponses?memberId=${memberData.memberId}`,
			)
			const tokenData = await tokenResponse.json()

			if (tokenData.length === 0 || !tokenData[0].accessToken) {
				throw new Error("토큰 발급 실패")
			}

			sessionStorage.setItem("tokens", JSON.stringify(tokenData[0]))
			sessionStorage.setItem("member", JSON.stringify(memberData))

			setTokens(tokenData[0])
			setMember(memberData)

			return true
		} catch (error) {
			console.error("❌ [AuthContext] 로그인 오류:", error)
			return false
		}
	}

	const logout = () => {
		sessionStorage.removeItem("member")
		sessionStorage.removeItem("tokens")
		setMember(null)
		setTokens({ accessToken: null, refreshToken: null })
	}

	const deactivateAccount = async () => {
		if (!member) return

		try {
			const response = await fetch(
				`http://localhost:3001/members/${member.memberId}`,
				{
					method: "DELETE",
				},
			)

			if (response.ok) {
				logout()
				alert("회원 탈퇴가 완료되었습니다.")
			} else {
				console.error("회원 탈퇴 실패:", await response.json())
			}
		} catch (error) {
			console.error("회원 탈퇴 오류:", error)
		}
	}

	return (
		<AuthContext.Provider
			value={{
				member,
				setMember,
				tokens,
				loading,
				login,
				logout,
				deactivateAccount,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => useContext(AuthContext)
