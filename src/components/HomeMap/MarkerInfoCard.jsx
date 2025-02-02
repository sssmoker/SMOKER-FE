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
		<div className="relative flex rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
			{image && (
				<img
					src={image}
					alt={title}
					className="mr-4 h-16 w-16 rounded-lg object-cover"
				/>
			)}
			<div className="flex-1">
				<h3 className="font-bold text-gray-800">{title}</h3>
				<p className="text-sm text-gray-600">{region}</p>
				<div className="flex items-center justify-between text-sm text-gray-500">
					<span>⭐ {rating}</span>
					<span>{distance}m</span>
				</div>
			</div>
			<button
				className="absolute right-2 top-2 p-1 text-gray-500 hover:text-gray-700"
				onClick={onClose}
			>
				<X size={20} />
			</button>
		</div>
	)
}

MarkerInfoCard.propTypes = {
	title: PropTypes.string.isRequired,
	region: PropTypes.string.isRequired,
	rating: PropTypes.number,
	distance: PropTypes.number,
	image: PropTypes.string,
	onClose: PropTypes.func.isRequired,
}
