import React from "react"
import PropTypes from "prop-types"
import ComButton from "@/components/common/button/ComButton"

// Title 컴포넌트
function Title({ text }) {
	return <h1 className="text-xl font-bold">{text}</h1>
}

Title.propTypes = {
	text: PropTypes.string.isRequired,
}
function OptionsList({ options, selectedOptions, onToggle }) {
	return (
		<div className="mb-4 flex flex-wrap gap-2">
			{options.map((option) => (
				<button
					key={option}
					className={`rounded-2xl border px-4 py-2 ${
						selectedOptions.includes(option) ? "bg-purple-600 text-white" : ""
					}`}
					onClick={() => onToggle(option)}
				>
					{option}
				</button>
			))}
		</div>
	)
}

OptionsList.propTypes = {
	options: PropTypes.arrayOf(PropTypes.string).isRequired,
	selectedOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
	onToggle: PropTypes.func.isRequired,
}

function CompleteButton({ onClick }) {
	return (
		<div className="mt-4">
			<ComButton size="xl" color="purple" onClick={onClick}>
				완료
			</ComButton>
		</div>
	)
}

CompleteButton.propTypes = {
	onClick: PropTypes.func.isRequired,
}

export { Title, OptionsList, CompleteButton }
