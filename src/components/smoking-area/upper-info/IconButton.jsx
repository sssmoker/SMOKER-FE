import React from "react"

export default function IconButton({
	LucideIcon,
	handleClickButton,
	className = "",
}) {
	return (
		<button
			onClick={handleClickButton}
			className={`flex items-center space-x-2 rounded-full bg-white px-2 py-2 text-gray-800 transition-all duration-200 hover:text-black`}
		>
			<LucideIcon className={`h-5 w-5 ${className}`} />
		</button>
	)
}
