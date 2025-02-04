import { useAuthContext } from "@/contexts/AuthContext"

export const useAuth = () => {
	const { member, loading, login, logout } = useAuthContext()

	const isLoggedIn = !!member

	return {
		member,
		isLoggedIn,
		loading,
		login,
		logout,
	}
}
