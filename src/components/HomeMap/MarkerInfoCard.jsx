import React, { useEffect, useState } from "react"
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
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		setIsVisible(true)
	}, [])

	const handleClose = () => {
		setIsVisible(false)
		setTimeout(() => onClose(), 300)
	}

	return (
		<div
			className={`fixed bottom-[14vh] left-1/2 w-full max-w-[380px] -translate-x-1/2 transform rounded-xl border border-gray-300 bg-white p-4 shadow-lg transition-all duration-300 ${
				isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
			}`}
		>
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
				onClick={handleClose}
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
