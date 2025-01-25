import React from "react"
import PropTypes from "prop-types"
import { Star } from "lucide-react"

export default function RatingStars({ rating, setRating }) {
	return (
		<div className="mb-4 flex justify-center space-x-2">
			{[0, 1, 2, 3, 4].map((index) => (
				<Star
					key={index}
					className={`h-8 w-8 cursor-pointer ${
						index < rating ? "text-yellow-200" : "text-gray-200"
					}`}
					onClick={() => setRating(index + 1)}
					fill={index < rating ? "yellow" : "none"}
				/>
			))}
		</div>
	)
}

RatingStars.propTypes = {
	rating: PropTypes.number.isRequired,
	setRating: PropTypes.func.isRequired,
}
