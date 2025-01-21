import { useAuthContext } from "@/contexts/AuthContext"

export const useAuth = () => {
	const { user, loading, login, logout } = useAuthContext()

	const isLoggedIn = !!user

	return {
		user,
		isLoggedIn,
		loading,
		login,
		logout,
	}
}
