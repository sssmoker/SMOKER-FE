import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import ComButton from "@/components/common/button/ComButton"
import BackButton from "@/components/common/button/BackButton"
import Map from "@/components/smoking-add/RegisterMap"
import AroundMeButton from "@/components/common/AroundMeButton"

export default function AddSmokingAreaPage() {
	const navigate = useNavigate()
	const [address, setAddress] = useState("도로명 주소를 불러오는 중...")
	const distance = "100m"

	// 📌 Map 컴포넌트에서 도로명 주소를 받아오는 함수
	const handleAddressChange = (newAddress) => {
		setAddress(newAddress)
	}

	const handleNext = () => {
		navigate("/add-smoking-area/name", {
			state: { address },
		})
	}

	return (
		<div className="flex h-[100vh] w-full flex-col items-center justify-between">
			<header className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between bg-white px-2 py-4 pr-4 shadow-md">
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
				{/* 📌 onAddressChange를 Map 컴포넌트에 전달 */}
				<Map onAddressChange={handleAddressChange} />
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
