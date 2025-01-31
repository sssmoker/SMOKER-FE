import React from "react"
import { Pencil } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function FloatingButton() {
	const navigate = useNavigate()

	const handleMoveToWritingRiview = () => {
		navigate("/list/smoking-area/writing-review")
	}

	return (
		<>
			<button
				onClick={handleMoveToWritingRiview}
				className="fixed bottom-[112px] right-[20px] flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#4517FF] text-[#fff]"
			>
				<Pencil />
			</button>
		</>
	)
}
