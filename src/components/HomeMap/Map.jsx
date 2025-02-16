import React, { useEffect, useState, useCallback, useMemo } from "react"
import PropTypes from "prop-types"
import { useSmokingAreaMarkers } from "@/hooks/useMapQueries"

const DEFAULT_CENTER = { lat: 37.546, lng: 127.071 }

export default function Map({
	currentLocation,
	moveToLocation,
	onMarkerClick,
}) {
	const [mapInstance, setMapInstance] = useState(null)
	const [markers, setMarkers] = useState([])
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
			enabled:
				locationAgreement &&
				!!currentLocation?.userLat &&
				!!currentLocation?.userLng,
		},
	)

	const mapCenter = useMemo(
		() =>
			currentLocation
				? { lat: currentLocation.userLat, lng: currentLocation.userLng }
				: DEFAULT_CENTER,
		[currentLocation],
	)

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

	const addCurrentLocationMarker = useCallback((map, location) => {
		const markerDiv = document.createElement("div")
		markerDiv.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      background: rgba(248, 150, 179, 0.4);
      border-radius: 50%;
      animation: pulse 1.5s infinite alternate;
    `
		markerDiv.innerHTML = `
		<style>
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(1.1); opacity: 0.8; }
    }
  </style>
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
		return overlay
	}, [])

	useEffect(() => {
		loadKakaoMapScript().then(() => initializeMap())
		return () => {
			const script = document.querySelector("script[src*='kakao']")
			if (script) script.remove()
		}
	}, [loadKakaoMapScript, initializeMap])

	useEffect(() => {
		if (mapInstance && locationAgreement && currentLocation) {
			addCurrentLocationMarker(mapInstance, currentLocation)
		}
	}, [
		mapInstance,
		currentLocation,
		addCurrentLocationMarker,
		locationAgreement,
	])

	useEffect(() => {
		if (mapInstance && moveToLocation) {
			const newCenter = new window.kakao.maps.LatLng(
				moveToLocation.lat,
				moveToLocation.lng,
			)
			mapInstance.setCenter(newCenter)
		}
	}, [mapInstance, moveToLocation])

	return (
		<div className="relative h-full w-full">
			<div id="map" className="h-full w-full border border-red-500" />
			{isLoading && <p>Loading markers...</p>}
			{error && <p>Error loading markers: {error.message}</p>}
		</div>
	)
}

Map.propTypes = {
	currentLocation: PropTypes.shape({
		userLat: PropTypes.number,
		userLng: PropTypes.number,
	}),
	moveToLocation: PropTypes.shape({
		lat: PropTypes.number,
		lng: PropTypes.number,
	}),
	onMarkerClick: PropTypes.func,
}
