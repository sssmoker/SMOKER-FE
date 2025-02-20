import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
	Title,
	OptionsList,
	CompleteButton,
} from "@/components/smoking-update/OptionsSelection"
import BackButton from "@/components/common/button/BackButton"
import { motion, AnimatePresence } from "framer-motion"

const options = [
	"공기 청정 기능",
	"냉난방 기능",
	"쓰레기통",
	"비상버튼",
	"환기 시스템",
	"휠체어 진입 가능",
	"음성 안내 시스템",
	"CCTV 시스템",
	"담배꽁초 처리함",
	"햇빛 차단 시설",
	"소화기 비치",
	"정기적인 청소",
	"비바람 차단 시설",
]

export default function AddSmokingAreaNamePage() {
	const navigate = useNavigate()
	const location = useLocation()
	const [address, setAddress] = useState(location.state?.address || "") // address를 상태로 관리
	const [showOptions, setShowOptions] = useState(false)
	const [selectedOptions, setSelectedOptions] = useState([])
	const [facilityType, setFacilityType] = useState(null)
	const [showFacilityType, setShowFacilityType] = useState(false)

	const toggleOption = (option) => {
		setSelectedOptions((prev) =>
			prev.includes(option)
				? prev.filter((o) => o !== option)
				: [...prev, option],
		)
	}

	const handleNext1 = () => {
		if (address.trim()) {
			setShowFacilityType(true)
		}
	}

	const handleComplete = () => {
		const data = {
			...location.state,
			address, // 수정된 address 값 전달
			details: selectedOptions,
		}
		console.log("등록 데이터:", data)
		navigate("/add-smoking-area/image")
	}

	const facilityOptions = [
		{ id: "closed", label: "밀폐형" },
		{ id: "open", label: "개방형" },
	]

	const handleFacilityTypeChange = (type) => {
		setFacilityType(type)
		setShowOptions(true)
	}

	const fadeIn = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -20 },
		transition: { duration: 0.3 },
	}

	return (
		<div className="h-screen space-y-4 overflow-y-scroll bg-white p-6 pb-40">
			<BackButton />
			<Title text="정보를 업데이트해주세요!" />
			<Title text="흡연 구역의 이름을 입력해주세요." />
			<p className="text-xs">현재 위치: {address}</p>
			<input
				type="text"
				className="w-full rounded border p-3"
				placeholder="주소를 수정해주세요"
				value={address} // 상태 변수 address 값을 input 필드에 표시
				onChange={(e) => {
					setAddress(e.target.value) // 주소 변경 시 상태 업데이트
					if (e.target.value.trim()) {
						handleNext1()
					}
				}}
			/>

			<AnimatePresence>
				{showFacilityType && (
					<motion.div {...fadeIn}>
						<Title text="흡연 구역의 시설 형태를 선택해주세요." />
						<div className="mt-[5vh]">
							<div className="mt-4 flex justify-center gap-4">
								{facilityOptions.map((option) => (
									<button
										key={option.id}
										className={`rounded-lg px-6 py-3 ${
											facilityType === option.id
												? "bg-gray-700 text-white"
												: "bg-gray-100"
										}`}
										onClick={() => handleFacilityTypeChange(option.id)}
									>
										{option.label}
									</button>
								))}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{showOptions && (
					<motion.div {...fadeIn} className="mt-[5vh]">
						<Title text="흡연 부스의 정보를 선택해주세요." />
						<OptionsList
							options={options}
							selectedOptions={selectedOptions}
							onToggle={toggleOption}
						/>
						<CompleteButton onClick={handleComplete} />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
