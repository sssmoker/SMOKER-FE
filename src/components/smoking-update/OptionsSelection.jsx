import React from "react"
import PropTypes from "prop-types"
import ComButton from "@/components/common/button/ComButton"

// Title 컴포넌트
const Title = ({ text }) => (
	<h1 className="text-xl font-bold text-gray-800">{text}</h1>
)

Title.propTypes = {
	text: PropTypes.string.isRequired,
}

// OptionsList 컴포넌트
const OptionsList = ({ options, selectedOptions, onToggle }) => (
	<div className="flex flex-wrap gap-2">
		{options.map((option) => {
			const isSelected = selectedOptions.includes(option)
			return (
				<button
					key={option}
					className={`rounded-2xl border px-4 py-2 transition-all duration-200 ${
						isSelected
							? "bg-gray-700 text-white"
							: "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
					}`}
					onClick={() => onToggle(option)}
				>
					{option}
				</button>
			)
		})}
	</div>
)

OptionsList.propTypes = {
	options: PropTypes.arrayOf(PropTypes.string).isRequired,
	selectedOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
	onToggle: PropTypes.func.isRequired,
}

// CompleteButton 컴포넌트
const CompleteButton = ({ onClick }) => (
	<div className="mt-6 flex justify-center">
		<ComButton size="xl" color="purple" onClick={onClick}>
			완료
		</ComButton>
	</div>
)

CompleteButton.propTypes = {
	onClick: PropTypes.func.isRequired,
}

export { Title, OptionsList, CompleteButton }
