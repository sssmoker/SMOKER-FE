import { useEffect } from "react"
import PropTypes from "prop-types"

export default function MarkerPopup({ marker }) {
	useEffect(() => {
		if (!window.kakao || !window.kakao.maps) return

		const markerElement = document.querySelector(`#marker-${marker.id}`)
		if (markerElement) {
			markerElement.style.transition = "opacity 0.3s ease-out"
			markerElement.style.opacity = "0"
		}

		const overlay = new window.kakao.maps.CustomOverlay({
			position: new window.kakao.maps.LatLng(marker.latitude, marker.longitude),
			content: `
				<div id="popup-${marker.id}" class="transition-opacity opacity-0 duration-300 absolute transform -translate-y-8 left-1/2 -translate-x-1/2 bg-white border-2 border-[#4517FF] rounded-xl shadow-lg px-4 py-2 text-center">
					<p class="font-bold text-black text-sm max-w-[140px] truncate">${marker.title}</p>
					<div class="flex items-center justify-center gap-2 mt-1 text-xs text-gray-600">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="#4517FF" xmlns="http://www.w3.org/2000/svg">
							<path d="M12 17.25L6.18 20.64L7.45 14.41L2.9 10.11L9.09 9.39L12 3.5L14.91 9.39L21.1 10.11L16.55 14.41L17.82 20.64L12 17.25Z"/>
						</svg>
						<span>${marker.rating} (${marker.reviews || 0}) ${marker.distance || 0}m</span>
					</div>
				</div>
			`,
			xAnchor: 0.5,
			yAnchor: 1.5,
			zIndex: 200,
		})

		overlay.setMap(window.kakaoMapInstance)

		setTimeout(() => {
			const popupElement = document.querySelector(`#popup-${marker.id}`)
			if (popupElement) {
				popupElement.classList.remove("opacity-0")
			}
		}, 50)

		return () => {
			overlay.setMap(null)
			if (markerElement) {
				markerElement.style.opacity = "1"
			}
		}
	}, [marker])

	return null
}

MarkerPopup.propTypes = {
	marker: PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		rating: PropTypes.number.isRequired,
		reviews: PropTypes.number,
		distance: PropTypes.number.isRequired,
		latitude: PropTypes.number.isRequired,
		longitude: PropTypes.number.isRequired,
	}).isRequired,
}
