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

	const authResponse = isLoggedIn
		? authContext.authResponses?.find(
				(auth) => auth.memberId === member.memberId,
			)
		: null

	const refreshToken = authResponse ? authResponse.refreshToken : null

	return {
		member,
		isLoggedIn,
		loading,
		login,
		logout,
		deactivateAccount,
		authResponse,
		refreshToken,
	}
}
