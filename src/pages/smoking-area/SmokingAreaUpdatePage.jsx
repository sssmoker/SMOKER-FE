import React from "react"
import BackButton from "@/components/common/button/BackButton"
import ComButton from "@/components/common/button/ComButton"
import { useNavigate } from "react-router-dom"

export default function SmokingAreaUpdatePage() {
	const navigate = useNavigate()

	const handleSubmit = () => {
		navigate("/list/smoking-area")
	}

	return (
		<>
			<div className="container mx-auto h-screen bg-[#F5F3FF] px-4 py-6">
				<div className="flex items-start gap-[12px]">
					<BackButton className="mb-4" />
					<div>
						<h1 className="mt-[6px] text-[16px] font-bold text-[#000]">
							사당역 2번 출구 앞 흡연 부스
						</h1>
						<p className="font-regular mt-[6px] text-[13px] text-[#555]">
							방문 후기를 남겨주세요!
						</p>
					</div>
				</div>

				<div className="mb-[8px] mt-[32px] w-full rounded-2xl border border-white bg-white px-4 py-5">
					{/* 흰 박스 */}
				</div>

				<a
					href="https://naver.com"
					className="text-[11px] font-semibold text-[#828282]"
					target="_blank"
					rel="noopener noreferrer"
				>
					존재하지 않는 장소인가요?{" "}
					<span className="text-[#4517FF] underline">신고하러 가기</span>
				</a>

				<div className="mt-8 flex justify-center">
					<ComButton onClick={handleSubmit} size="xl">
						완료
					</ComButton>
				</div>
			</div>
		</>
	)
}
