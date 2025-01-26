import React from "react"
import PropTypes from "prop-types"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function BackButton({ className = "" }) {
	const navigate = useNavigate()

	const handleBack = () => {
		navigate(-1)
	}

	return (
		<button
			onClick={handleBack}
			className={`flex items-center space-x-2 px-2 py-2 text-gray-800 transition-all duration-200 hover:text-black ${className}`}
		>
			<ArrowLeft className="h-5 w-5" />
		</button>
	)
}

BackButton.propTypes = {
	className: PropTypes.string,
}
