import React, { useEffect } from "react"

const Map = ({ markers, onMarkerClick }) => {
	useEffect(() => {
		const script = document.createElement("script")
		script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=081b17dcc860e4a545cc095e0e255dcd&libraries=services`
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
				level: 2, // 확대 수준
			}
			const map = new window.kakao.maps.Map(container, options)

			// 마커 추가
			if (markers) {
				markers.forEach((markerData) => {
					const position = new window.kakao.maps.LatLng(
						markerData.lat,
						markerData.lng,
					)

					const marker = new window.kakao.maps.Marker({
						position,
					})

					window.kakao.maps.event.addListener(marker, "click", () => {
						onMarkerClick(markerData)
					})

					marker.setMap(map)
				})
			}
		}

		return () => {
			document.head.removeChild(script)
		}
	}, [markers, onMarkerClick])

	return <div id="map" style={{ width: "100%", height: "100%" }} />
}

export default Map
