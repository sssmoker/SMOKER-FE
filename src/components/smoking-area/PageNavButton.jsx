import React from "react"

export default function PageNavButton({
	buttonName,
	currentPage,
	setCurrentPage,
}) {
	return (
		<>
			<button
				onClick={() => setCurrentPage(buttonName)}
				className={`font-regular mt-[4px] border-solid border-[#252525] px-[6px] py-[12px] text-[12px] text-[#252525] ${currentPage == buttonName && "border-b"}`}
			>
				{buttonName == "detail" ? "상세정보" : "리뷰"}
			</button>
		</>
	)
}
