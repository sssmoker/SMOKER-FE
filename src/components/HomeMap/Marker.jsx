import React from "react"

export default function Marker({ lat, lng, onClick }) {
	return (
		<div
			className="absolute h-4 w-4 cursor-pointer rounded-full bg-blue-500"
			style={{
				top: `${lat}px`, // 실제 지도 API에서는 lat/lng를 좌표로 변환해야 합니다.
				left: `${lng}px`,
			}}
			onClick={onClick}
		/>
	)
}

// 필요 없어짐!
