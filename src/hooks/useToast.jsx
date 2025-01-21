import { useState } from "react"

export const useToast = () => {
	const [toasts, setToasts] = useState([])

	const addToast = (message, type = "info") => {
		const id = Date.now()
		setToasts((prevToasts) => [...prevToasts, { id, message, type }])

		// 3초 후 자동 제거
		setTimeout(() => {
			setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
		}, 3000)
	}

	const removeToast = (id) => {
		setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
	}

	return {
		toasts,
		addToast,
		removeToast,
	}
}
