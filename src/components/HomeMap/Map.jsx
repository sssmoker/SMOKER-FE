import React from "react"
import Marker from "@/components/HomeMap/Marker"

export default function Map({ markers, onMarkerClick }) {
	return (
		<div className="h-full w-full bg-gray-200">
			{/* TODO: 실제 지도 API (예: Kakao Map, Google Map) 연동 */}
			{markers &&
				markers.map((marker) => (
					<Marker
						key={marker.id}
						lat={marker.lat}
						lng={marker.lng}
						onClick={() => onMarkerClick(marker)}
					/>
				))}
		</div>
	)
}
