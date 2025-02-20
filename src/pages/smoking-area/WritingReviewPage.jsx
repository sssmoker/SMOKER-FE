import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"
import SubmitForm from "@/components/review-form/SubmitForm"
import CompleteToast from "@/components/smoking-area/review/completeToast"

export default function WritingReviewPage() {
	const [showCompleteToast, setShowCompleteToast] = useState(false)
	const navigate = useNavigate() // 페이지 이동을 위한 navigate 훅

	const handleSubmit = (data) => {
		// 리뷰가 있을 때만 완료 모달 띄우고, 페이지 이동 처리
		if (data.review) {
			// 리뷰가 있을 때만 제출
			setShowCompleteToast(true) // 완료 모달 띄움
			setTimeout(() => {
				navigate(-1) // 이전 페이지로 이동
			}, 3000) // 모달이 1.5초 후에 페이지를 이동하도록 설정
		}
	}

	const placeName = "사당역 2번 출구 앞 흡연 부스"

	return (
		<div className="container mx-auto h-screen bg-[#F5F3FF] px-4 py-6">
			{/* 완료 토스트 */}
			<CompleteToast
				isVisible={showCompleteToast}
				onClose={() => setShowCompleteToast(false)}
			/>

			<BackButton className="mb-4" />
			<div className="mx-auto h-screen w-[92vw] rounded-t-2xl border border-white bg-white px-4 py-6">
				<h1 className="mb-2 text-center text-lg font-bold">{placeName}</h1>
				<p className="mb-4 text-center text-sm text-gray-500">
					어떻게 이용하셨나요?
				</p>
				<SubmitForm onSubmit={handleSubmit} />
			</div>
		</div>
	)
}
