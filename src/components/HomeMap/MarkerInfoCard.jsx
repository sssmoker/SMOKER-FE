import React from "react"
import PropTypes from "prop-types"
import { X } from "lucide-react"

export default function MarkerInfoCard({
	title,
	region,
	rating = 0,
	reviews = 0,
	distance = 0,
	image,
	saves = 0,
	onClose,
}) {
	return (
		<div className="fixed left-1/2 flex w-[95vw] -translate-x-1/2 items-center gap-[3vw] rounded-2xl bg-white p-[2vh] shadow-xl">
			{image && (
				<img
					src={image}
					alt={title}
					className="h-[9vh] w-[9vh] rounded-lg object-cover"
				/>
			)}
			<div className="min-w-0 flex-1">
				<div className="flex items-center justify-between">
					<h3 className="text-[clamp(1rem, 4vw, 1.2rem)] truncate font-bold text-gray-900">
						{title}
					</h3>
					<span className="text-[clamp(0.85rem, 3vw, 1rem)] text-gray-400">
						{distance || 250}m
					</span>
				</div>
				<p className="text-[clamp(0.85rem, 3vw, 1rem)] truncate text-gray-500">
					{region}
				</p>
				<div className="text-[clamp(0.85rem, 3vw, 1rem)] mt-[1vh] flex items-center gap-[1.5vw] text-gray-600">
					<svg width="3.5vw" height="3.5vw" viewBox="0 0 24 24" fill="#4517FF">
						<path d="M12 17.25L6.18 20.64L7.45 14.41L2.9 10.11L9.09 9.39L12 3.5L14.91 9.39L21.1 10.11L16.55 14.41L17.82 20.64L12 17.25Z" />
					</svg>
					<span className="font-medium">{(rating || 4.3).toFixed(1)}</span>
					<span className="text-gray-400">({reviews || 11})</span>
					<span className="text-gray-400">· 저장 {saves || 5}</span>
				</div>
			</div>
			<button
				className="absolute right-[1vw] top-[1vw] p-[1vw] text-gray-500 hover:text-gray-700"
				onClick={onClose}
			>
				<X size="3vw" />
			</button>
		</div>
	)
}

MarkerInfoCard.propTypes = {
	title: PropTypes.string.isRequired,
	region: PropTypes.string.isRequired,
	rating: PropTypes.number,
	reviews: PropTypes.number,
	distance: PropTypes.number,
	saves: PropTypes.number,
	image: PropTypes.string,
	onClose: PropTypes.func.isRequired,
}
