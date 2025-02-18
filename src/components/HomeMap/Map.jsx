import React, { useEffect, useState, useCallback, useMemo } from "react"
import { useSmokingAreaMarkers } from "@/hooks/useMapQueries"
import MarkerPopup from "@/components/HomeMap/MarkerPopup"
import { renderToString } from "react-dom/server"
import { Cigarette } from "lucide-react"

const DEFAULT_CENTER = { lat: 37.546, lng: 127.071 }

export default function Map({
	currentLocation,
	moveToLocation,
	onMarkerClick,
}) {
	const [mapInstance, setMapInstance] = useState(null)
	const [markers, setMarkers] = useState([])
	const [selectedMarker, setSelectedMarker] = useState(null)

	const locationAgreement = localStorage.getItem("locationAgreement") === "true"

	const {
		data: markerData,
		isLoading,
		error,
	} = useSmokingAreaMarkers(
		{
			userLat: currentLocation?.userLat,
			userLng: currentLocation?.userLng,
		},
		{
			enabled: !!currentLocation?.userLat && !!currentLocation?.userLng,
		},
	)

	const mapCenter = useMemo(
		() =>
			currentLocation
				? { lat: currentLocation.userLat, lng: currentLocation.userLng }
				: DEFAULT_CENTER,
		[currentLocation],
	)

	// ✅ 1km 반경 거리 계산 함수 (Haversine Formula)
	const calculateDistance = (lat1, lng1, lat2, lng2) => {
		const R = 6371
		const dLat = ((lat2 - lat1) * Math.PI) / 180
		const dLng = ((lng2 - lng1) * Math.PI) / 180
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos((lat1 * Math.PI) / 180) *
				Math.cos((lat2 * Math.PI) / 180) *
				Math.sin(dLng / 2) *
				Math.sin(dLng / 2)
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
		return R * c * 1000 // 미터 단위 반환
	}

	// ✅ Kakao 지도 초기화
	const initializeMap = useCallback(() => {
		const container = document.getElementById("map")
		const options = {
			center: new window.kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
			level: 4,
		}
		const map = new window.kakao.maps.Map(container, options)
		setMapInstance(map)
		window.kakaoMapInstance = map
	}, [mapCenter])

	// ✅ Kakao 지도 스크립트 로드
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

	// ✅ 현재 위치 마커 (locationAgreement=true 일 때만 표시)
	const addCurrentLocationMarker = useCallback(
		(map, location) => {
			if (!locationAgreement) return

			const markerDiv = document.createElement("div")
			markerDiv.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            width: 35px;
            height: 35px;
            background: rgba(248, 150, 179, 0.4);
            border-radius: 50%;
            animation: pulse-animation 1.5s infinite alternate;
        `

			markerDiv.innerHTML = `
            <div style="width: 16px; height: 16px; background: yellow; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <div style="width: 10px; height: 10px; background: blue; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <div style="width: 4px; height: 4px; background: yellow; border-radius: 50%;"></div>
                </div>
            </div>
        `

			const overlay = new window.kakao.maps.CustomOverlay({
				position: new window.kakao.maps.LatLng(
					location.userLat,
					location.userLng,
				),
				content: markerDiv,
				zIndex: 300,
			})
			overlay.setMap(map)
		},
		[locationAgreement],
	)

	// ✅ 흡연구역 마커 추가 (1km 반경 필터링 적용)
	const updateMarkers = useCallback(() => {
		if (!mapInstance || !markerData || !currentLocation) {
			console.warn(
				"⚠️ mapInstance, markerData 또는 currentLocation이 존재하지 않습니다.",
			)
			return
		}

		console.log("📍 현재 위치:", currentLocation)
		console.log("📌 API 응답 확인:", markerData)
		console.log("📌 API result 확인:", markerData?.result)
		console.log("📌 Smoking Areas:", markerData?.result?.makers)

		// ✅ 올바른 키값으로 데이터 가져오기
		const smokingAreas = markerData?.result?.makers || []

		console.log(`🟡 필터링 전 마커 개수: ${smokingAreas.length}`)

		const newMarkers = smokingAreas
			.filter((marker) => {
				if (
					!marker.location ||
					!marker.location.latitude ||
					!marker.location.longitude
				) {
					console.warn("🚨 잘못된 마커 데이터:", marker)
					return false
				}

				const distance = calculateDistance(
					currentLocation.userLat,
					currentLocation.userLng,
					marker.location.latitude,
					marker.location.longitude,
				)

				console.log(`🚀 마커 거리: ${marker.name} → ${distance}m`)

				return distance <= 1000
			})
			.map((marker) => {
				const position = new window.kakao.maps.LatLng(
					marker.location.latitude,
					marker.location.longitude,
				)

				const markerDiv = document.createElement("div")
				markerDiv.id = `marker-${marker.smokingId}`
				markerDiv.style.cssText = `
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30px;
				height: 30px;
				background: #4517FF;
				border-radius: 10px;
				box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
				cursor: pointer;
				transition: transform 0.3s ease-out;
			`
				markerDiv.innerHTML = renderToString(
					<Cigarette
						className="text-white"
						style={{ width: 15, height: 15 }}
					/>,
				)

				// 마커 클릭 시 해당 위치로 지도의 중심 이동
				markerDiv.addEventListener("click", () => {
					markerDiv.style.transform = "rotateY(180deg)"
					setSelectedMarker(marker)
					onMarkerClick?.(marker)
					mapInstance.setCenter(position)
					mapInstance.panTo(position)
				})

				const overlay = new window.kakao.maps.CustomOverlay({
					position,
					content: markerDiv,
					zIndex: 100,
				})

				overlay.setMap(mapInstance)
				return overlay
			})

		console.log(`✅ 추가된 마커 개수: ${newMarkers.length}`)

		setMarkers(newMarkers)
	}, [mapInstance, markerData, currentLocation, onMarkerClick])

	useEffect(() => {
		loadKakaoMapScript().then(() => initializeMap())
	}, [loadKakaoMapScript, initializeMap])

	useEffect(() => {
		updateMarkers()
	}, [updateMarkers])

	return <div id="map" className="h-full w-full" />
}
