import React from "react"
import { useNavigate } from "react-router-dom"

export default function UpdateBtn() {
	const navigate = useNavigate()

	const moveToUpdate = () => {
		navigate("/list/smoking-area/update")
	}

	return (
		<>
			<button
				onClick={moveToUpdate}
				className="font-regular h-[22px] w-[60px] rounded-full border border-solid border-[#B5B5B5] bg-white text-[10px] text-[#252525]"
			>
				정보수정
			</button>
		</>
	)
}
