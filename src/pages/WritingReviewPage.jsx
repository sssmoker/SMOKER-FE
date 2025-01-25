import React from "react"
import BackButton from "@/components/common/button/BackButton"
import SubmitForm from "@/components/review-form/SubmitForm"

export default function WritingReviewPage() {
	const placeName = "사당역 2번 출구 앞 흡연 부스"
	const handleFormSubmit = (data) => {
		console.log("이미지 리스트:", data.images)
		console.log("리뷰:", data.review)
		console.log("별점:", data.rating)
		alert("후기가 등록되었습니다!")
	}

	return (
		<div className="container mx-auto h-screen bg-[#F5F3FF] px-4 py-6">
			<BackButton className="mb-4" />
			<div className="mx-auto h-screen w-[92vw] rounded-t-2xl border border-white bg-white px-4 py-6">
				<h1 className="mb-2 text-center text-lg font-bold">{placeName}</h1>
				<p className="mb-4 text-center text-sm text-gray-500">
					어떻게 이용하셨나요?
				</p>
				<SubmitForm onSubmit={handleFormSubmit} />
			</div>
		</div>
	)
}
