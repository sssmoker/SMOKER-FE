import React from "react"

export default function PageNavBtn({ btnName, currentPage, setCurrentPage }) {
	return (
		<>
			<button
				onClick={() => setCurrentPage(btnName)}
				className={`font-regular mt-[4px] border-solid border-[#252525] px-[6px] py-[12px] text-[12px] text-[#252525] ${currentPage == btnName && "border-b"}`}
			>
				{btnName == "detail" ? "상세정보" : "리뷰"}
			</button>
		</>
	)
}
