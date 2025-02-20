import React, { useState, useCallback, useEffect } from "react"

export default function Map({ roadAddress }) {
	const [mapInstance, setMapInstance] = useState(null)

	const DEFAULT_CENTER = { lat: 37.5038015, lng: 127.0242029 } // 초기값 (주소 변환 후 업데이트 됨)

	const initializeMap = useCallback(() => {
		const container = document.getElementById("map")
		const options = {
			center: new window.kakao.maps.LatLng(
				DEFAULT_CENTER.lat,
				DEFAULT_CENTER.lng,
			),
			level: 4,
			disableDoubleClickZoom: true, // 더블클릭 확대 비활성화
			draggable: false, // 지도 드래그 비활성화
			scrollwheel: false, // 마우스 휠로 확대/축소 비활성화
			zoomable: false, // 줌 기능 비활성화
		}
		const map = new window.kakao.maps.Map(container, options)
		setMapInstance(map)
	}, [])

	const loadKakaoMapScript = useCallback(() => {
		return new Promise((resolve, reject) => {
			if (window.kakao && window.kakao.maps) {
				resolve()
				return
			}
			const KAKAO_KEY = import.meta.env.VITE_MAP_KAKAO_KEY
			if (!KAKAO_KEY) {
				console.error("Kakao Map Key is missing in environment variables.")
				return reject(new Error("Kakao Map Key is missing"))
			}
			const script = document.createElement("script")
			script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&libraries=services`
			script.async = true
			document.head.appendChild(script)
			script.onload = () => resolve()
			script.onerror = () =>
				reject(new Error("Failed to load Kakao Map script"))
		})
	}, [])

	useEffect(() => {
		loadKakaoMapScript().then(() => initializeMap())
	}, [loadKakaoMapScript, initializeMap])

	useEffect(() => {
		if (mapInstance && roadAddress) {
			const geocoder = new window.kakao.maps.services.Geocoder()
			geocoder.addressSearch(roadAddress, (result, status) => {
				if (status === window.kakao.maps.services.Status.OK) {
					const newCenter = new window.kakao.maps.LatLng(
						result[0].y,
						result[0].x,
					)
					mapInstance.setCenter(newCenter) // 지도를 해당 좌표로 이동
				} else {
					console.error("주소를 좌표로 변환할 수 없습니다.")
				}
			})
		}
	}, [roadAddress, mapInstance])

	return <div id="map" className="h-full w-full" />
}
