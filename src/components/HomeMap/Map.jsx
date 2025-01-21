import React, { useEffect } from "react"

const Map = () => {
	useEffect(() => {
		const script = document.createElement("script")
		script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=081b17dcc860e4a545cc095e0e255dcd&libraries=services`
		script.async = true
		document.head.appendChild(script)

		script.onload = () => {
			if (!window.kakao) {
				console.error("Kakao Maps API failed to load.")
				return
			}

			const container = document.getElementById("map")
			const options = {
				center: new window.kakao.maps.LatLng(37.4769, 126.9811), // 중심 좌표
				level: 3, // 확대 수준
			}
			const map = new window.kakao.maps.Map(container, options)

			// Mock 데이터 가져오기
			fetch("http://localhost:3001/markers")
				.then((response) => {
					if (!response.ok) {
						throw new Error("Failed to fetch markers data.")
					}
					return response.json()
				})
				.then((data) => {
					// 동적 마커 추가
					data.forEach((markerData) => {
						const position = new window.kakao.maps.LatLng(
							markerData.lat,
							markerData.lng,
						)

						const marker = new window.kakao.maps.Marker({
							position,
						})

						// 마커에 정보창 추가
						const infowindow = new window.kakao.maps.InfoWindow({
							content: `<div style="padding:5px;">${markerData.title}</div>`,
						})

						window.kakao.maps.event.addListener(marker, "mouseover", () => {
							infowindow.open(map, marker)
						})

						window.kakao.maps.event.addListener(marker, "mouseout", () => {
							infowindow.close()
						})

						marker.setMap(map)
					})
				})
				.catch((error) => {
					console.error("Error fetching markers data:", error)
				})
		}

		script.onerror = () => {
			console.error("Failed to load Kakao Maps API.")
		}

		return () => {
			document.head.removeChild(script)
		}
	}, [])

	return <div id="map" style={{ width: "100%", height: "100vh" }} />
}

export default Map
