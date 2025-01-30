import React, { useEffect } from "react"
import { renderToString } from "react-dom/server"
import { Cigarette, CircleDot } from "lucide-react"

export default function Map({
	markers,
	currentLocation,
	moveToLocation,
	onMarkerClick,
}) {
	useEffect(() => {
		loadKakaoMapScript().then(() => {
			initializeMap(markers, currentLocation, onMarkerClick)
		})

		return () => {
			const script = document.querySelector("script[src*='kakao']")
			if (script) script.remove()
		}
	}, [markers, currentLocation])

	// moveToLocation 값이 변경되면 지도 이동
	useEffect(() => {
		if (moveToLocation) {
			moveMapToLocation(moveToLocation)
		}
	}, [moveToLocation])

	return <div id="map" style={{ width: "100%", height: "100%" }} />
}

// 📌 카카오 맵 API 스크립트 로드
const loadKakaoMapScript = () => {
	return new Promise((resolve) => {
		if (window.kakao && window.kakao.maps) {
			resolve()
			return
		}

		const script = document.createElement("script")
		script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=081b17dcc860e4a545cc095e0e255dcd&libraries=services`
		script.async = true
		document.head.appendChild(script)

		script.onload = () => resolve()
	})
}

// 📌 지도 초기화
const initializeMap = (markers, currentLocation, onMarkerClick) => {
	const container = document.getElementById("map")
	const options = {
		center: new window.kakao.maps.LatLng(
			currentLocation ? currentLocation.userLat : 37.4769,
			currentLocation ? currentLocation.userLng : 126.9811,
		),
		level: 2,
	}

	const map = new window.kakao.maps.Map(container, options)
	window.kakaoMapInstance = map // 글로벌 변수로 저장 (지도 인스턴스)

	// 흡연 구역 마커 추가
	if (markers) addSmokingMarkers(map, markers, onMarkerClick)

	// 현재 위치 마커 추가
	if (currentLocation) addCurrentLocationMarker(map, currentLocation)
}

// 📌 지도 이동 함수
const moveMapToLocation = (location) => {
	if (window.kakao && window.kakao.maps && window.kakaoMapInstance) {
		const newCenter = new window.kakao.maps.LatLng(location.lat, location.lng)
		window.kakaoMapInstance.setCenter(newCenter)
	}
}

// 📌 흡연 구역 마커 추가
const addSmokingMarkers = (map, markers, onMarkerClick) => {
	markers.forEach((markerData) => {
		const markerDiv = document.createElement("div")
		markerDiv.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: #4517FF;
      border-radius: 12px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      position: absolute;
      z-index: 100;
    `
		markerDiv.innerHTML = renderToString(
			<Cigarette className="text-white" style={{ width: 20, height: 20 }} />,
		)

		// 클릭 이벤트 추가
		markerDiv.onclick = () => {
			console.log("Marker clicked:", markerData)
			onMarkerClick(markerData)
		}

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
}

// 📌 현재 위치 마커 추가 (실시간 업데이트)
const addCurrentLocationMarker = (map, currentLocation) => {
	let currentOverlay = null

	const updateLocation = () => {
		if (currentOverlay) currentOverlay.setMap(null)

		const markerDiv = document.createElement("div")
		markerDiv.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: rgba(69, 23, 255, 0.1);
      border: 3px solid rgba(69, 23, 255, 0.5);
      border-radius: 50%;
      position: absolute;
      z-index: 300;
    `
		markerDiv.innerHTML = renderToString(
			<CircleDot
				className="text-[#4517FF]"
				style={{ width: 20, height: 20 }}
			/>,
		)

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
