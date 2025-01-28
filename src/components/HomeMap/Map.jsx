import React, { useEffect } from "react"
import { renderToString } from "react-dom/server"
import { Cigarette, CircleDot } from "lucide-react"

export default function Map({ markers, currentLocation, onMarkerClick }) {
	useEffect(() => {
		const script = document.createElement("script")
		script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=081b17dcc860e4a545cc095e0e255dcd&libraries=services`
		script.async = true
		document.head.appendChild(script)

		script.onload = () => {
			const container = document.getElementById("map")
			const options = {
				center: new window.kakao.maps.LatLng(
					currentLocation ? currentLocation.userLat : 37.4769,
					currentLocation ? currentLocation.userLng : 126.9811,
				),
				level: 2,
			}
			const map = new window.kakao.maps.Map(container, options)

			// 흡연 구역 마커 추가
			if (markers) {
				markers.forEach((markerData) => {
					const smokingMarkerContent = `
            <div style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: #4517FF; border-radius: 12px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); position: absolute; z-index: 100;">
              ${renderToString(
								<Cigarette
									className="text-white"
									style={{ width: 20, height: 20 }}
								/>,
							)}
            </div>
          `

					const smokingOverlay = new window.kakao.maps.CustomOverlay({
						position: new window.kakao.maps.LatLng(
							markerData.latitude,
							markerData.longitude,
						),
						content: smokingMarkerContent,
						zIndex: 100, // 흡연 구역 마커의 zIndex 설정
					})

					// 마커 클릭 이벤트
					smokingOverlay.setMap(map)
					window.kakao.maps.event.addListener(map, "click", () => {
						onMarkerClick(markerData)
					})
				})
			}

			// 현재 위치 마커 추가 (항상 마지막에 추가)
			if (currentLocation) {
				const currentMarkerContent = `
          <div style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: rgba(69, 23, 255, 0.1); border: 3px solid rgba(69, 23, 255, 0.5); border-radius: 50%; position: absolute; z-index: 300;">
            ${renderToString(
							<CircleDot
								className="text-[#4517FF]"
								style={{ width: 20, height: 20 }}
							/>,
						)}
          </div>
        `

				const currentOverlay = new window.kakao.maps.CustomOverlay({
					position: new window.kakao.maps.LatLng(
						currentLocation.userLat,
						currentLocation.userLng,
					),
					content: currentMarkerContent,
					zIndex: 300, // 현재 위치 마커의 zIndex를 흡연 구역보다 높게 설정
				})
				currentOverlay.setMap(map)
			}
		}

		return () => {
			script.remove()
		}
	}, [markers, currentLocation])

	return <div id="map" style={{ width: "100%", height: "100%" }} />
}
