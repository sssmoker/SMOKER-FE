import React, { createContext, useState, useEffect, useContext } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [member, setMember] = useState(null)
	const [loading, setLoading] = useState(true)

	// ✅ 로그인 상태 유지: sessionStorage에서 member 가져오기
	useEffect(() => {
		const storedMember = sessionStorage.getItem("member")

		if (storedMember) {
			console.log(
				"🔍 [AuthContext] sessionStorage에서 가져온 member:",
				JSON.parse(storedMember),
			)
			setMember(JSON.parse(storedMember)) // ✅ 세션스토리지에서 멤버 정보 로드
		} else {
			console.log("⚠️ [AuthContext] sessionStorage에 저장된 member 없음!")
		}

		setLoading(false)
	}, [])

	// ✅ OAuth 로그인
	const login = async (provider) => {
		try {
			const response = await fetch(
				`http://localhost:3001/members?login_type=${provider}`,
			)
			const data = await response.json()

			if (data.length > 0) {
				console.log(
					`✅ ${provider} 로그인 성공! 저장할 member_id:`,
					data[0].member_id,
				)
				sessionStorage.setItem("member", JSON.stringify(data[0])) // ✅ sessionStorage에 저장
				setMember(data[0]) // ✅ 상태 업데이트
			} else {
				console.error(`${provider} 로그인 실패`)
			}
		} catch (error) {
			console.error(`${provider} 로그인 오류:`, error)
		}
	}

	// ✅ 로그아웃
	const logout = () => {
		console.log("🚪 [AuthContext] 로그아웃 실행")
		sessionStorage.removeItem("member") // ✅ sessionStorage에서도 삭제
		setMember(null) // ✅ 상태 초기화
	}

	// ✅ 탈퇴하기 기능
	const deactivateAccount = async () => {
		if (!member) return

		const confirmDelete = window.confirm("정말 탈퇴하시겠습니까?")
		if (!confirmDelete) return

		try {
			const response = await fetch(
				`http://localhost:3001/members/${member.member_id}`,
				{
					method: "DELETE",
				},
			)

			if (response.ok) {
				console.log("✅ [AuthContext] 탈퇴 성공, 데이터 초기화!")
				sessionStorage.removeItem("member")
				setMember(null)
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
			value={{ member, loading, login, logout, deactivateAccount }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => useContext(AuthContext)
