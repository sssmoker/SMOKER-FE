import React from "react"

export default function MarkerInfoCard({ title, address, rating, distance }) {
	return (
		<div className="absolute bottom-24 left-4 right-4 z-20 rounded-lg bg-white p-4 shadow-lg">
			<h3 className="font-bold text-gray-800">{title}</h3>
			<p className="text-sm text-gray-600">{address}</p>
			<div className="flex items-center justify-between text-sm text-gray-500">
				<span>⭐ {rating}</span>
				<span>{distance}m</span>
			</div>
		</div>
	)
}
