import React, { useEffect, useState, useCallback, useMemo } from "react"
import { useSmokingAreaMarkers } from "@/hooks/useMapQueries"
import { renderToString } from "react-dom/server"
import { Cigarette } from "lucide-react"
import { debounce } from "lodash"

const DEFAULT_CENTER = { lat: 37.546, lng: 127.071 }

export default function Map({
	currentLocation,
	onMarkerClick,
	onLookLocationChange,
}) {
	const [mapInstance, setMapInstance] = useState(null)
	const [markers, setMarkers] = useState([])
	// 동의 여부: 사용자가 위치 사용에 동의한 경우에만 현재 위치 마커 등 표시
	const locationAgreement = localStorage.getItem("locationAgreement") === "true"

	// API를 통해 흡연구역 데이터를 가져옴 (현재 지도 중심 기준)
	const { data: markerData } = useSmokingAreaMarkers(
		{
			userLat: currentLocation?.userLat,
			userLng: currentLocation?.userLng,
		},
		{
			enabled: !!currentLocation?.userLat && !!currentLocation?.userLng,
		},
	)

	// 지도 중심 좌표 (HomePage에서 전달받은 currentLocation, 즉 lookLocation)
	const mapCenter = useMemo(() => {
		return currentLocation
			? { lat: currentLocation.userLat, lng: currentLocation.userLng }
			: DEFAULT_CENTER
	}, [currentLocation])

	// Haversine Formula: 두 좌표 사이 거리를 미터 단위로 계산
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
		return R * c * 1000
	}

	// 지도 초기화: 지도 컨테이너에서 Kakao 지도 인스턴스를 생성하고 저장
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

	// 기존 마커 제거: 매번 업데이트 전에 중복 마커를 제거하여 겹치는 현상 방지
	const clearMarkers = useCallback(() => {
		markers.forEach((overlay) => overlay.setMap(null))
		setMarkers([])
	}, [markers])

	// 흡연구역 마커 업데이트 (현재 지도 중심 기준 1km 반경 필터링)
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
				// 마커 클릭 시 HomePage의 onMarkerClick 콜백을 호출하고, 지도 중심을 해당 위치로 이동
				markerDiv.addEventListener("click", () => {
					markerDiv.style.transform = "rotateY(180deg)"
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
		setMarkers(newMarkers)
	}, [
		mapInstance,
		markerData,
		currentLocation,
		onMarkerClick,
		clearMarkers,
		calculateDistance,
	])

	// Debounce updateMarkers 호출: 빈번한 업데이트를 방지
	const debouncedUpdateMarkers = useCallback(debounce(updateMarkers, 300), [
		updateMarkers,
	])

	// 초기 지도 로드: Kakao 지도 스크립트를 로드한 후 지도를 초기화
	useEffect(() => {
		loadKakaoMapScript().then(() => initializeMap())
	}, [loadKakaoMapScript, initializeMap])

	// 지도 중심(currentLocation)이 변경되면 지도 중심 이동 및 마커 업데이트 실행
	useEffect(() => {
		if (mapInstance && currentLocation) {
			const newCenter = new window.kakao.maps.LatLng(
				currentLocation.userLat,
				currentLocation.userLng,
			)
			mapInstance.panTo(newCenter)
		}
		debouncedUpdateMarkers()
		return () => debouncedUpdateMarkers.cancel()
	}, [debouncedUpdateMarkers, currentLocation])

	// 지도 드래그, 줌 변경 시, 새로운 중심 좌표를 부모(HomePage)로 전달
	useEffect(() => {
		if (mapInstance) {
			const updateCenter = () => {
				const center = mapInstance.getCenter()
				onLookLocationChange({
					userLat: center.getLat(),
					userLng: center.getLng(),
				})
			}
			window.kakao.maps.event.addListener(mapInstance, "dragend", updateCenter)
			window.kakao.maps.event.addListener(
				mapInstance,
				"zoom_changed",
				updateCenter,
			)
			return () => {
				window.kakao.maps.event.removeListener(
					mapInstance,
					"dragend",
					updateCenter,
				)
				window.kakao.maps.event.removeListener(
					mapInstance,
					"zoom_changed",
					updateCenter,
				)
			}
		}
	}, [mapInstance, onLookLocationChange])

	return <div id="map" className="h-full w-full" />
}
