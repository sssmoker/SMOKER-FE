import { useState, useEffect } from "react"

export default function useLocation(isChecked) {
	const [location, setLocation] = useState(null)

	useEffect(() => {
		if (isChecked) {
			// 현재 위치 가져오기
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLocation({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					})
				},
				() => {
					console.error("현재 위치를 가져올 수 없습니다.")
					setLocation({ lat: 37.4769, lng: 126.9811 }) // 디폴트 위치
				},
			)
		} else {
			// 체크 안 했으면 디폴트 위치
			setLocation({ lat: 37.4769, lng: 126.9811 })
		}
	}, [isChecked])

	return location
}
