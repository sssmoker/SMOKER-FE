import React from "react"
import PropTypes from "prop-types"
import Button from "@/components/common/button/ComButton"

export default function OptionsSelection({
	options,
	selectedOptions,
	toggleOption,
	onComplete,
}) {
	return (
		<div>
			<div className="mb-4 flex flex-wrap gap-2">
				{options.map((option) => (
					<button
						key={option}
						className={`rounded border px-4 py-2 ${
							selectedOptions.includes(option) ? "bg-purple-500 text-white" : ""
						}`}
						onClick={() => toggleOption(option)}
					>
						{option}
					</button>
				))}
			</div>

			<Button size="xl" color="purple" onClick={onComplete}>
				완료
			</Button>
		</div>
	)
}

OptionsSelection.propTypes = {
	options: PropTypes.arrayOf(PropTypes.string).isRequired, // 옵션 목록
	selectedOptions: PropTypes.arrayOf(PropTypes.string).isRequired, // 선택된 옵션 목록
	toggleOption: PropTypes.func.isRequired, // 옵션 선택/해제 함수
	onComplete: PropTypes.func.isRequired, // 완료 버튼 클릭 핸들러
}
