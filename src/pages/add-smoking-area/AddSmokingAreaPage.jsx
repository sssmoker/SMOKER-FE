import React from "react"
import { useNavigate } from "react-router-dom"
import ComButton from "@/components/common/button/ComButton"
import BackButton from "@/components/common/button/BackButton"
import Map from "@/components/HomeMap/Map"
import AroundMeButton from "@/components/common/AroundMeButton"

export default function AddSmokingAreaPage() {
	const navigate = useNavigate()
	const address = "서울 동작구 남부순환로 2089"
	const distance = "100m"

	const handleNext = () => {
		navigate("/add-smoking-area/name", {
			state: { address: address },
		})
	}

	return (
		<div className="flex h-[100vh] w-full flex-col items-center justify-between">
			<header className="fixed left-0 right-0 top-[5vh] z-10 flex items-center justify-between rounded-2xl bg-white p-4 pr-4 shadow-md">
				<BackButton />
				<div className="flex flex-col items-center">
					<h1 className="text-center text-[16px] font-bold sm:text-[18px] md:text-[20px] lg:text-[24px]">
						등록할 흡연 구역의 위치를 설정해주세요.
					</h1>
					<p className="text-center text-[10px] text-gray-600 sm:text-[12px] md:text-[14px] lg:text-[16px]">
						정확한 위치가 맞는지 확인해주세요.
					</p>
				</div>

				<AroundMeButton />
			</header>
			<div className="w-full flex-grow">
				<Map />
			</div>

			<div className="fixed bottom-[10vh] left-0 right-0 z-20 flex flex-col items-center justify-center rounded-2xl border border-gray-300 bg-white p-2 pt-4 text-left">
				<div className="flex w-full items-center justify-start">
					<p className="ml-4 text-left font-bold text-black">{address}</p>
					<p className="ml-2 text-left text-sm text-gray-300">{distance}</p>
				</div>

				<div className="mt-2 flex w-full justify-center">
					<ComButton onClick={handleNext} size="xl">
						다음
					</ComButton>
				</div>
			</div>
		</div>
	)
}
