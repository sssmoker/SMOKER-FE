import { useEffect } from "react"
import PropTypes from "prop-types"

export default function MarkerPopup({ marker }) {
	useEffect(() => {
		if (!window.kakao || !window.kakao.maps) return

		const overlay = new window.kakao.maps.CustomOverlay({
			position: new window.kakao.maps.LatLng(
				marker.latitude || 0,
				marker.longitude || 0,
			),
			content: `
				<style>
					@keyframes fadeIn {
						0% { opacity: 0; transform: translateY(-10px); }
						100% { opacity: 1; transform: translateY(0); }
					}
					.marker-popup {
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						background: white;
						border: 2px solid #4517FF;
						border-radius: 12px;
						box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
						padding: 8px 12px;
						text-align: center;
						animation: fadeIn 0.3s ease-in-out;
					}
					.marker-popup p {
						font-weight: bold;
						color: black;
						font-size: 14px;
						max-width: 140px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.marker-popup .info {
						display: flex;
						align-items: center;
						justify-content: center;
						gap: 4px;
						margin-top: 4px;
						font-size: 12px;
						color: gray;
					}
					.marker-popup .info svg {
						width: 14px;
						height: 14px;
						fill: #4517FF;
					}
				</style>
				<div id="popup-${marker.id || "N/A"}" class="marker-popup">
					<p>${marker.title || "N/A"}</p>
					<div class="info">
						<svg viewBox="0 0 24 24">
							<path d="M12 17.25L6.18 20.64L7.45 14.41L2.9 10.11L9.09 9.39L12 3.5L14.91 9.39L21.1 10.11L16.55 14.41L17.82 20.64L12 17.25Z"/>
						</svg>
						<span>${marker.rating || "N/A"} ⭐ (${marker.reviews || 0})</span>
						<span>📍 ${marker.distance || "N/A"}m</span>
					</div>
				</div>
			`,
			xAnchor: 0.5,
			yAnchor: 1.5,
			zIndex: 200,
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
		id: PropTypes.any,
		title: PropTypes.string,
		rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		reviews: PropTypes.number,
		distance: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		latitude: PropTypes.number,
		longitude: PropTypes.number,
	}),
}
