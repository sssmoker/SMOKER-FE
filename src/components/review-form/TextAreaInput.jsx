import React from "react"
import PropTypes from "prop-types"

export default function TextAreaInput({ value, onChange, placeholder }) {
	return (
		<div className="flex w-full justify-center">
			<textarea
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className="mb-4 h-32 w-[95%] resize-none rounded-lg border border-gray-300 p-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>
	)
}

TextAreaInput.propTypes = {
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
}
