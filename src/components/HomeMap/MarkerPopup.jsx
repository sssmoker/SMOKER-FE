import React, { useEffect } from "react"
import PropTypes from "prop-types"

export default function MarkerPopup({ marker }) {
	useEffect(() => {
		if (!window.kakao || !window.kakao.maps) return

		const overlay = new window.kakao.maps.CustomOverlay({
			position: new window.kakao.maps.LatLng(marker.latitude, marker.longitude),
			content: `
		<div style="
			padding: 8px;
			border-radius: 8px;
			background: white;
			border: 2px solid blue;
			font-size: 14px;
			box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
			transform: translateY(-20px); 
		">
			<b>${marker.title}</b><br/>
			⭐ ${marker.rating} (${marker.distance || 0}m)
		</div>
	`,
			xAnchor: 0.5,
			yAnchor: 1.2,
			zIndex: 100,
		})

		overlay.setMap(window.kakaoMapInstance)

		return () => {
			overlay.setMap(null)
		}
	}, [marker])

	return null
}

MarkerPopup.propTypes = {
	marker: PropTypes.shape({
		title: PropTypes.string.isRequired,
		rating: PropTypes.number.isRequired,
		distance: PropTypes.number.isRequired,
		latitude: PropTypes.number.isRequired,
		longitude: PropTypes.number.isRequired,
	}).isRequired,
}
