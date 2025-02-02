import React from "react"
import PropTypes from "prop-types"
import { X } from "lucide-react"

export default function MarkerInfoCard({
	title,
	region,
	rating,
	distance,
	image,
	onClose,
}) {
	return (
		<div
			id="marker-info-card"
			className="animate-slide-up fixed bottom-[14vh] left-1/2 w-full max-w-[380px] -translate-x-1/2 transform rounded-xl border border-gray-300 bg-white p-4 shadow-lg"
		>
			{image && (
				<img
					src={image}
					alt={title}
					className="mb-2 h-24 w-full rounded-lg object-cover"
				/>
			)}
			<div className="flex items-center justify-between">
				<h3 className="font-bold text-gray-800">{title}</h3>
				<button
					className="p-1 text-gray-500 hover:text-gray-700"
					onClick={onClose}
				>
					<X size={20} />
				</button>
			</div>
			<p className="text-sm text-gray-600">{region}</p>
			<div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="#4517FF"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M12 17.25L6.18 20.64L7.45 14.41L2.9 10.11L9.09 9.39L12 3.5L14.91 9.39L21.1 10.11L16.55 14.41L17.82 20.64L12 17.25Z" />
				</svg>
				<span className="font-medium">{rating.toFixed(1)}</span>
				<span className="text-gray-400">({distance}m)</span>
			</div>
		</div>
	)
}

MarkerInfoCard.propTypes = {
	title: PropTypes.string.isRequired,
	region: PropTypes.string.isRequired,
	rating: PropTypes.number.isRequired,
	distance: PropTypes.number.isRequired,
	image: PropTypes.string,
	onClose: PropTypes.func.isRequired,
}
