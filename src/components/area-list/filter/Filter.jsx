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

export default function Filter() {
	const textOptions = ["거리순", "평점순"]
	const iconOptions = ["down", "up"]
	const [selectedOption, setSelectedOption] = useState(textOptions[0])
	const [toggleFilter, setToggleFilter] = useState(false)

	const handleClickButton = (option) => {
		if (option) {
			setToggleFilter(false)
			setSelectedOption(option)
		} else {
			setToggleFilter(!toggleFilter)
		}
	}

	return (
		<>
			<div className="box-content w-[80px] rounded-[10px] border bg-white">
				<FilterButton
					handleClickButton={() => handleClickButton()}
					buttonText={selectedOption}
					iconExist={toggleFilter ? iconOptions[1] : iconOptions[0]}
				/>
				{toggleFilter && (
					<ul>
						{textOptions.map((option) => (
							<li key={option}>
								<FilterButton
									handleClickButton={() => handleClickButton(option)}
									buttonText={option}
									iconExist={false}
								/>
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	)
}
