import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"
import ComButton from "@/components/common/button/ComButton"
import CompleteToast from "@/components/smoking-add/completeToast"
import AlertToast from "@/components/smoking-add/alertToast"

export default function AddSmokingAreaImagePage() {
	const [image, setImage] = useState(null)
	const [showCompleteToast, setShowCompleteToast] = useState(false)
	const [showAlertToast, setShowAlertToast] = useState(false)
	const navigate = useNavigate()

	const handleImageUpload = (e) => {
		const file = e.target.files[0]
		if (file) {
			setImage(URL.createObjectURL(file))
		}
	}

	const handleSubmit = () => {
		if (image) {
			setShowCompleteToast(true)
			setTimeout(() => {
				navigate("/")
			}, 3200)
		} else {
			setShowAlertToast(true)
		}
	}

	return (
		<div className="relative h-screen space-y-6 bg-white px-4 py-6">
			<CompleteToast
				isVisible={showCompleteToast}
				onClose={() => setShowCompleteToast(false)}
			/>
			<AlertToast
				isVisible={showAlertToast}
				onClose={() => setShowAlertToast(false)}
			/>
			<BackButton />

			<div className="space-y-2 text-left">
				<h1 className="text-lg font-bold">사당역 2번 출구 앞 흡연 부스</h1>
				<p className="text-sm text-gray-500">
					흡연 구역 인증 사진을 업로드해주세요.
				</p>
			</div>
			<div className="flex justify-center space-x-4">
				<img
					src="/assets/smoke-area/ex1.svg"
					alt="Guide 1"
					className="h-[120px] w-[120px] object-cover"
				/>
				<img
					src="/assets/smoke-area/ex2.svg"
					alt="Guide 2"
					className="h-[120px] w-[120px] object-cover"
				/>
			</div>
			<div className="space-y-2">
				<div className="flex items-center justify-between rounded-lg bg-black p-4 text-white">
					<div className="whitespace-nowrap text-[14px] font-semibold">
						인증 사진 가이드
					</div>
					<div className="mx-4 h-6 w-px bg-white"></div>
					<div className="text-[10.5px] text-gray-300">
						흡연구역, Smoking area 등 흡연 구역임을 확인할 수 있는 문구를 포함한
						이미지를 업로드해주세요.
					</div>
				</div>

				<p className="text-[8px] text-gray-500">
					국민건강증진법시행규칙 제7조제1항 및 제2항 금연구역과 흡연구역의 표시
					및 시설기준에 따라, 흡연구역에는 당해시설을 이용하는 자가 잘 볼 수
					있는 위치에 흡연구역임을 나타내는 표시판을 달거나 부착하여야 하며 그
					규격은 다음과 같습니다. <br />- 표시판은 흡연구역의 규모나 모양에 따라
					그 크기를 다르게 할 수 있습니다. <br />- 표시판의 글자는 한글로 하되
					필요한 경우에는 영문을 함께 사용할 수 있습니다.
				</p>
			</div>
			<div className="flex justify-center">
				<label className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-lg border bg-gray-100 text-gray-400">
					{image ? (
						<img
							src={image}
							alt="Uploaded Preview"
							className="h-full w-full rounded-lg object-cover"
						/>
					) : (
						<p>이미지 추가</p>
					)}
					<input
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleImageUpload}
					/>
				</label>
			</div>

			<div className="mt-4 flex w-full justify-center">
				<ComButton size="xl" onClick={handleSubmit}>
					완료
				</ComButton>
			</div>
		</div>
	)
}
