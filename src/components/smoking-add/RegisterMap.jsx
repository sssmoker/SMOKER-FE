import React, { useEffect, useState, useCallback } from "react"
import { useSmokingAreaMarkers } from "@/hooks/useMapQueries"
import { renderToString } from "react-dom/server"
import { Cigarette } from "lucide-react"

const DEFAULT_CENTER = { lat: 37.468105670805606, lng: 127.03926498444508 }

export default function Map({ currentLocation, onAddressChange }) {
	const [mapInstance, setMapInstance] = useState(null)
	const [markers, setMarkers] = useState([])
	const [selectedLocation, setSelectedLocation] = useState(DEFAULT_CENTER)
	const [centerMarker, setCenterMarker] = useState(null)
	const [roadAddress, setRoadAddress] = useState("")

	const { data: markerData } = useSmokingAreaMarkers(
		{
			userLat: currentLocation?.userLat,
			userLng: currentLocation?.userLng,
		},
		{
			enabled: !!currentLocation?.userLat && !!currentLocation?.userLng,
		},
	)

	const mapCenter = currentLocation
		? { lat: currentLocation.userLat, lng: currentLocation.userLng }
		: DEFAULT_CENTER

	const initializeMap = useCallback(() => {
		const container = document.getElementById("map")
		const options = {
			center: new window.kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
			level: 4,
		}
		const map = new window.kakao.maps.Map(container, options)
		setMapInstance(map)

		// 지도 중심 변경 이벤트 리스너 추가
		window.kakao.maps.event.addListener(map, "center_changed", () => {
			const center = map.getCenter()
			const newLocation = { lat: center.getLat(), lng: center.getLng() }
			setSelectedLocation(newLocation)
		})
	}, [mapCenter])

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

	const clearMarkers = useCallback(() => {
		markers.forEach((overlay) => overlay.setMap(null))
		setMarkers([])
	}, [markers])

	const updateMarkers = useCallback(() => {
		if (!mapInstance || !markerData) return
		clearMarkers()

		const smokingAreas = markerData?.result?.makers || []
		const newMarkers = smokingAreas.map((marker) => {
			const position = new window.kakao.maps.LatLng(
				marker.location.latitude,
				marker.location.longitude,
			)

			const markerDiv = document.createElement("div")
			markerDiv.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        background: #4517FF;
        border-radius: 10px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      `
			markerDiv.innerHTML = renderToString(
				<Cigarette className="text-white" style={{ width: 15, height: 15 }} />,
			)

			const overlay = new window.kakao.maps.CustomOverlay({
				position,
				content: markerDiv,
				zIndex: 100,
			})
			overlay.setMap(mapInstance)
			return overlay
		})
		setMarkers(newMarkers)
	}, [mapInstance, markerData, clearMarkers])

	useEffect(() => {
		if (!mapInstance) return

		if (centerMarker) {
			centerMarker.setMap(null)
		}

		const position = new window.kakao.maps.LatLng(
			selectedLocation.lat,
			selectedLocation.lng,
		)

		const marker = new window.kakao.maps.Marker({
			position,
		})

		marker.setMap(mapInstance)
		setCenterMarker(marker)
	}, [selectedLocation])

	const convertToRoadAddress = useCallback(
		({ lat, lng }) => {
			const geocoder = new window.kakao.maps.services.Geocoder()

			geocoder.coord2Address(lng, lat, (result, status) => {
				if (status === window.kakao.maps.services.Status.OK) {
					const addressInfo = result[0].road_address
					if (addressInfo) {
						setRoadAddress(addressInfo.address_name)
						onAddressChange && onAddressChange(addressInfo.address_name)
					} else {
						setRoadAddress("도로명 주소를 찾을 수 없습니다.")
					}
				}
			})
		},
		[onAddressChange],
	)

	useEffect(() => {
		if (selectedLocation) {
			convertToRoadAddress(selectedLocation)
		}
	}, [selectedLocation, convertToRoadAddress])

	useEffect(() => {
		loadKakaoMapScript().then(() => initializeMap())
	}, [loadKakaoMapScript, initializeMap])

	useEffect(() => {
		if (mapInstance) {
			updateMarkers()
		}
	}, [mapInstance, updateMarkers])

	return (
		<div className="relative h-full w-full">
			<div id="map" className="h-full w-full" />
			<div className="absolute bottom-5 left-1/2 -translate-x-1/2 transform rounded-md bg-white p-2 shadow-md">
				📍 도로명 주소: {roadAddress || "로드 중..."}
			</div>
		</div>
	)
}
