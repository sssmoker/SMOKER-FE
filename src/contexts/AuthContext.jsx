import React, { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchUser = async () => {
			const token = localStorage.getItem("access_token")
			if (!token) {
				setLoading(false)
				return
			}

			try {
				const response = await fetch(
					`http://localhost:3001/users?email=${token}`,
				)
				const users = await response.json()

				if (users.length > 0) {
					setUser(users[0])
				} else {
					console.error("Mock 로그인 실패: 유저를 찾을 수 없음")
					setUser(null)
				}
			} catch (error) {
				console.error("Mock API 오류:", error)
				setUser(null)
			} finally {
				setLoading(false)
			}
		}

		fetchUser()
	}, [])

	const login = async (provider) => {
		if (!["kakao", "google"].includes(provider)) {
			console.error("잘못된 로그인 제공업체:", provider)
			return
		}

		try {
			const response = await fetch(
				`http://localhost:3001/users?login_type=${provider}`,
			)
			const users = await response.json()

			if (users.length > 0) {
				localStorage.setItem("access_token", users[0].email)
				setUser(users[0])
			} else {
				console.error(`Mock ${provider} 로그인 실패`)
			}
		} catch (error) {
			console.error(`Mock ${provider} 로그인 오류:`, error)
		}
	}

	const logout = () => {
		localStorage.removeItem("access_token")
		setUser(null)
	}

	const deactivateAccount = async () => {
		if (!user) return

		const confirmDelete = window.confirm(
			"정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
		)
		if (!confirmDelete) return

		try {
			const response = await fetch("/api/auth/deactivate", {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("access_token")}`,
				},
			})

			if (response.ok) {
				localStorage.removeItem("access_token")
				setUser(null)
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
				user,
				loading,
				login, // 하나의 로그인 함수로 통합
				logout,
				deactivateAccount,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

// Custom hook
export const useAuthContext = () => {
	return useContext(AuthContext)
}
