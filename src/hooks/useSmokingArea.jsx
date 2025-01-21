import { useState, useEffect } from "react"

export const useSmokingArea = () => {
	const [smokingAreas, setSmokingAreas] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		// 흡연 구역 데이터 가져오기
		const fetchSmokingAreas = async () => {
			setLoading(true)
			try {
				const response = await fetch("http://localhost:3001/smokingAreas")
				const data = await response.json()
				setSmokingAreas(data)
			} catch (error) {
				console.error("Failed to fetch smoking areas:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchSmokingAreas()
	}, [])

	return {
		smokingAreas,
		loading,
	}
}
