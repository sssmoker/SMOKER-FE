import React from "react"
import BackButton from "@/components/common/button/BackButton"
import SubmitForm from "@/components/review-form/SubmitForm"

export default function WritingReviewPage() {
	const handleFormSubmit = (data) => {
		console.log("이미지:", data.image)
		console.log("리뷰:", data.review)
		alert("후기가 등록되었습니다!")
	}

	return (
		<div className="container mx-auto h-screen bg-white px-4 py-6">
			{/* 뒤로가기 버튼 */}
			<BackButton className="mb-4" />

			{/* 제목 */}
			<h1 className="mb-2 text-center text-lg font-bold">
				사당역 2번 출구 앞 흡연 부스
			</h1>
			<p className="mb-4 text-center text-sm text-gray-500">
				어떻게 이용하셨나요?
			</p>

			{/* 제출 폼 */}
			<SubmitForm onSubmit={handleFormSubmit} />
		</div>
	)
}
