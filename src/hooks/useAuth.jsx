import { useAuthContext } from "@/contexts/AuthContext"

export const useAuth = () => {
	const authContext = useAuthContext()

	const {
		member = null,
		loading = false,
		login,
		logout,
		deactivateAccount,
	} = authContext || {}

	const isLoggedIn = Boolean(member && member.memberId)

	return {
		member,
		isLoggedIn,
		loading,
		login,
		logout,
		deactivateAccount,
	}
}
