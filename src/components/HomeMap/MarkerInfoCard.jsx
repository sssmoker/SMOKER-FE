import React from "react"

export default function MarkerInfoCard({ title, region, rating, distance }) {
	return (
		<div className="absolute bottom-16 left-4 right-4 z-20 rounded-lg bg-white p-4 shadow-lg">
			<h3 className="font-bold text-gray-800">{title}</h3>
			<p className="text-sm text-gray-600">{region}</p>
			<div className="flex items-center justify-between text-sm text-gray-500">
				<span>⭐ {rating}</span>
				<span>{distance}m</span>
			</div>
		</div>
	)
}
