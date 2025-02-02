import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { renderToString } from "react-dom/server"
import { Cigarette } from "lucide-react"
import MarkerPopup from "@/components/HomeMap/MarkerPopup"

export default function Map({ markers, currentLocation, moveToLocation }) {
	const [selectedMarker, setSelectedMarker] = useState(null)

	useEffect(() => {
		loadKakaoMapScript().then(() => {
			initializeMap(markers, currentLocation, handleMarkerClick)
		})

		return () => {
			const script = document.querySelector("script[src*='kakao']")
			if (script) script.remove()
		}
	}, [markers, currentLocation])

	useEffect(() => {
		if (moveToLocation) {
			moveMapToLocation(moveToLocation)
		}
	}, [moveToLocation])

	const handleMarkerClick = (marker) => {
		setSelectedMarker((prev) => (prev?.id === marker.id ? null : marker))
	}

	return (
		<div id="map" className="h-full w-full">
			{selectedMarker && <MarkerPopup marker={selectedMarker} />}
		</div>
	)
}

const loadKakaoMapScript = () => {
	return new Promise((resolve) => {
		if (window.kakao && window.kakao.maps) {
			resolve()
			return
		}

		const script = document.createElement("script")
		script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_API_KEY&libraries=services`
		script.async = true
		document.head.appendChild(script)

		script.onload = () => resolve()
	})
}

const initializeMap = (markers, currentLocation, onMarkerClick) => {
	const container = document.getElementById("map")
	const map = new window.kakao.maps.Map(container, {
		center: new window.kakao.maps.LatLng(
			currentLocation ? currentLocation.userLat : 37.4769,
			currentLocation ? currentLocation.userLng : 126.9811,
		),
		level: 2,
	})

	window.kakaoMapInstance = map

	markers.forEach((markerData) => {
		const markerDiv = document.createElement("div")
		markerDiv.id = `marker-${markerData.id}`
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
      transition: opacity 0.3s ease-out;
    `

		markerDiv.innerHTML = renderToString(
			<Cigarette className="text-white" style={{ width: 15, height: 15 }} />,
		)

		markerDiv.onclick = () => onMarkerClick(markerData)

		const smokingOverlay = new window.kakao.maps.CustomOverlay({
			position: new window.kakao.maps.LatLng(
				markerData.latitude,
				markerData.longitude,
			),
			content: markerDiv,
			zIndex: 100,
		})

		smokingOverlay.setMap(map)
	})

	if (currentLocation) addCurrentLocationMarker(map, currentLocation)
}

const moveMapToLocation = (location) => {
	if (window.kakao && window.kakao.maps && window.kakaoMapInstance) {
		const lat = location.userLat || location.lat
		const lng = location.userLng || location.lng

		if (lat && lng) {
			const newCenter = new window.kakao.maps.LatLng(lat, lng)
			window.kakaoMapInstance.setCenter(newCenter)
		}
	}
}

const addCurrentLocationMarker = (map, currentLocation) => {
	let currentOverlay = null

	const updateLocation = () => {
		if (currentOverlay) currentOverlay.setMap(null)

		const markerDiv = document.createElement("div")
		markerDiv.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      background: rgba(248, 150, 179, 0.4);
      border-radius: 50%;
      position: absolute;
      z-index: 300;
    `

		markerDiv.innerHTML = `
      <div style="
        width: 16px;
        height: 16px;
        background: yellow;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 10px;
          height: 10px;
          background: blue;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 4px;
            height: 4px;
            background: yellow;
            border-radius: 50%;
          "></div>
        </div>
      </div>
    `

		currentOverlay = new window.kakao.maps.CustomOverlay({
			position: new window.kakao.maps.LatLng(
				currentLocation.userLat,
				currentLocation.userLng,
			),
			content: markerDiv,
			zIndex: 300,
		})

		currentOverlay.setMap(map)
	}

	updateLocation()
}

Map.propTypes = {
	markers: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			latitude: PropTypes.number.isRequired,
			longitude: PropTypes.number.isRequired,
		}),
	).isRequired,
	currentLocation: PropTypes.shape({
		userLat: PropTypes.number,
		userLng: PropTypes.number,
	}),
	moveToLocation: PropTypes.shape({
		lat: PropTypes.number,
		lng: PropTypes.number,
	}),
}
