import React, { createContext, useState, useContext, useEffect } from "react"

// Auth Context 생성
const AuthContext = createContext()

// Auth Provider 컴포넌트
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null) // 사용자 정보
	const [loading, setLoading] = useState(true) // 로딩 상태

	useEffect(() => {
		// 초기 사용자 정보 가져오기
		const fetchUser = async () => {
			setLoading(true)
			try {
				const response = await fetch("http://localhost:3001/users/1") // Mock 데이터
				const userData = await response.json()
				setUser(userData)
			} catch (error) {
				console.error("Failed to fetch user:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchUser()
	}, [])

	const login = (userData) => {
		setUser(userData)
	}

	const logout = () => {
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ user, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

// Custom hook
export const useAuthContext = () => {
	return useContext(AuthContext)
}
