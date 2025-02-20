import React, { useEffect, useState, useCallback, useMemo } from "react"
import { useSmokingAreaMarkers } from "@/hooks/useMapQueries"
import { renderToString } from "react-dom/server"
import { Cigarette } from "lucide-react"
import { debounce } from "lodash"

const DEFAULT_CENTER = { lat: 37.468105670805606, lng: 127.03926498444508 }

export default function Map({
	currentLocation,
	onMarkerClick,
	onLookLocationChange,
}) {
	const [mapInstance, setMapInstance] = useState(null)
	const [markers, setMarkers] = useState([])
	const locationAgreement = localStorage.getItem("locationAgreement") === "true"

	// API 데이터: 현재 지도 중심(currentLocation) 기준 흡연구역 데이터
	const { data: markerData } = useSmokingAreaMarkers(
		{
			userLat: currentLocation?.userLat,
			userLng: currentLocation?.userLng,
		},
		{
			enabled: !!currentLocation?.userLat && !!currentLocation?.userLng,
		},
	)

	// 지도 중심 좌표 (실질적으로는 lookLocation)
	const mapCenter = useMemo(() => {
		return currentLocation
			? { lat: currentLocation.userLat, lng: currentLocation.userLng }
			: DEFAULT_CENTER
	}, [currentLocation])

	// Haversine Formula: 두 좌표 사이의 거리를 계산 (미터 단위)
	const calculateDistance = (lat1, lng1, lat2, lng2) => {
		const R = 6371
		const dLat = ((lat2 - lat1) * Math.PI) / 180
		const dLng = ((lng2 - lng1) * Math.PI) / 180
		const a =
			Math.sin(dLat / 2) ** 2 +
			Math.cos((lat1 * Math.PI) / 180) *
				Math.cos((lat2 * Math.PI) / 180) *
				Math.sin(dLng / 2) ** 2
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
		return R * c * 1000
	}

	// 지도 초기화: container에서 Kakao 지도 인스턴스를 생성
	const initializeMap = useCallback(() => {
		const container = document.getElementById("map")
		const options = {
			center: new window.kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
			level: 2,
			draggable: true,
			scrollwheel: true,
		}
		const map = new window.kakao.maps.Map(container, options)
		setMapInstance(map)
		window.kakaoMapInstance = map
	}, [mapCenter])

	// Kakao 지도 스크립트 동적 로드
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

	// 현재 위치 마커 추가 (동의한 경우에만)
	const addCurrentLocationMarker = useCallback(
		(map, location) => {
			if (!locationAgreement || !map) return
			const markerDiv = document.createElement("div")
			markerDiv.style.cssText = `
			display: flex;
			align-items: center;
			justify-content: center;
			width: 35px;
			height: 35px;
			background: rgba(255, 100, 179, 0.6);
			border-radius: 50%;
			position: absolute;
			z-index: 300;
		`

			markerDiv.innerHTML = `
			<div style="
				width: 14px;
				height: 14px;
				background: yellow;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
			">
				<div style="
					width: 9px;
					height: 9px;
					background: blue;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
				">
					<div style="
						width: 5px;
						height: 5px;
						background: yellow;
						border-radius: 50%;
					"></div>
				</div>
			</div>
		`

			const overlay = new window.kakao.maps.CustomOverlay({
				position: new window.kakao.maps.LatLng(
					location.userLat,
					location.userLng,
				),
				content: markerDiv,
				zIndex: 100,
			})
			overlay.setMap(map)
			console.log("✅ 현재 위치 마커 추가 완료!")
		},
		[locationAgreement],
	)

	// 기존 마커 제거 (중복 제거)
	const clearMarkers = useCallback(() => {
		markers.forEach((overlay) => overlay.setMap(null))
		setMarkers([])
	}, [markers])

	// 흡연구역 마커 업데이트: 현재 중심 기준 1km 반경 필터링 후 새 마커 생성
	const updateMarkers = useCallback(() => {
		if (!mapInstance || !markerData || !currentLocation) {
			console.warn(
				"mapInstance, markerData 또는 currentLocation이 존재하지 않습니다.",
			)
			return
		}
		clearMarkers()
		const smokingAreas = markerData?.result?.makers || []
		const newMarkers = smokingAreas
			.filter((marker) => {
				if (
					!marker.location ||
					!marker.location.latitude ||
					!marker.location.longitude
				) {
					console.warn("잘못된 마커 데이터:", marker)
					return false
				}
				const distance = calculateDistance(
					currentLocation.userLat,
					currentLocation.userLng,
					marker.location.latitude,
					marker.location.longitude,
				)
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
				// 마커 클릭 시 HomePage의 onMarkerClick 콜백 호출 (강제 중심 이동 제거)
				markerDiv.addEventListener("click", () => {
					markerDiv.style.transform = "rotateY(180deg)"
					onMarkerClick?.(marker)
				})
				const overlay = new window.kakao.maps.CustomOverlay({
					position,
					content: markerDiv,
					zIndex: 100,
				})
				overlay.setMap(mapInstance)
				return overlay
			})
		setMarkers(newMarkers)
	}, [
		mapInstance,
		markerData,
		currentLocation,
		onMarkerClick,
		clearMarkers,
		calculateDistance,
	])

	// Debounce updateMarkers: 잦은 호출 제한 (300ms)
	const debouncedUpdateMarkers = useCallback(debounce(updateMarkers, 300), [
		updateMarkers,
	])

	// 초기 지도 로드: Kakao 지도 스크립트 로드 후 지도 초기화
	useEffect(() => {
		loadKakaoMapScript().then(() => initializeMap())
	}, [loadKakaoMapScript, initializeMap])

	// 지도 중심(currentLocation)이 변경되면, 마커 업데이트만 실행 (panTo 호출 제거하여 자유 이동 허용)
	useEffect(() => {
		debouncedUpdateMarkers()
		return () => debouncedUpdateMarkers.cancel()
	}, [debouncedUpdateMarkers, currentLocation])

	// "center_changed" 이벤트: 지도 중심이 변경될 때마다 실시간으로 부모에 새로운 중심 전달 (100ms debounce)
	useEffect(() => {
		if (mapInstance && typeof onLookLocationChange === "function") {
			const updateCenter = debounce(() => {
				const center = mapInstance.getCenter()
				onLookLocationChange({
					userLat: center.getLat(),
					userLng: center.getLng(),
				})
			}, 100)
			window.kakao.maps.event.addListener(
				mapInstance,
				"center_changed",
				updateCenter,
			)
			return () => {
				window.kakao.maps.event.removeListener(
					mapInstance,
					"center_changed",
					updateCenter,
				)
				updateCenter.cancel()
			}
		}
	}, [mapInstance, onLookLocationChange])

	useEffect(() => {
		if (mapInstance && currentLocation) {
			console.log("🗺️ 현재 위치 마커 추가:", currentLocation) // 디버깅 로그 추가
			addCurrentLocationMarker(mapInstance, currentLocation) // 🔥 지도 중심(lookLocation)과 무관하게 현재 위치 유지
		}
	}, [mapInstance, currentLocation])
	return <div id="map" className="h-full w-full" />
}
