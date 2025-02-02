import React, { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

function FilterButton({ handleClickButton, buttonText, iconExist }) {
	return (
		<>
			<button
				className="flex h-[28px] w-[80px] items-center justify-center gap-[4px] rounded-[10px] bg-white text-[12px] font-medium text-[#252525] duration-200 hover:bg-[#ECECEC]"
				onClick={handleClickButton}
			>
				{buttonText}
				{iconExist == "down" ? (
					<ChevronDown className="h-[10px] w-[10px]" />
				) : iconExist == "up" ? (
					<ChevronUp className="h-[10px] w-[10px]" />
				) : (
					<></>
				)}
			</button>
		</>
	)
}

export default function Filter({
	FILTER_OPTIONS = {},
	selectedFilter,
	setSelectedFilter,
}) {
	const iconOptions = ["down", "up"]
	const [toggleFilter, setToggleFilter] = useState(false)

	const handleClickButton = (option) => {
		if (option) {
			setToggleFilter(false)
			setSelectedFilter(option)
		} else {
			setToggleFilter(!toggleFilter)
		}
	}

	return (
		<>
			<div className="box-content w-[80px] rounded-[10px] border bg-white">
				<FilterButton
					handleClickButton={() => handleClickButton()}
					buttonText={selectedFilter}
					iconExist={toggleFilter ? iconOptions[1] : iconOptions[0]}
				/>
				{toggleFilter && (
					<>
						<FilterButton
							handleClickButton={() =>
								handleClickButton(FILTER_OPTIONS.DISTANCE)
							}
							buttonText={FILTER_OPTIONS.DISTANCE}
							iconExist={false}
						/>
						<FilterButton
							handleClickButton={() => handleClickButton(FILTER_OPTIONS.RATING)}
							buttonText={FILTER_OPTIONS.RATING}
							iconExist={false}
						/>
					</>
				)}
			</div>
		</>
	)
}
