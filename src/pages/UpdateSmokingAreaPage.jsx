import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function UpdateSmokingAreaPage() {
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		name: "사당역 2번 출구 흡연 부스", // 기본값
		details: [], // 추가 정보 (체크박스)
		images: [], // 업로드된 이미지
	})

	const detailsOptions = [
		"일렉트로닉 흡연부스예요",
		"깔끔해요",
		"쓰레기통이 있어요",
		"의자가 있어요",
		"장애인 편의시설이 있어요",
		"난방이 가능해요",
		"야외에 있어요",
	]

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleDetailsChange = (detail) => {
		if (formData.details.includes(detail)) {
			setFormData({
				...formData,
				details: formData.details.filter((d) => d !== detail),
			})
		} else {
			setFormData({ ...formData, details: [...formData.details, detail] })
		}
	}

	const handleImageUpload = (e) => {
		const files = Array.from(e.target.files)
		setFormData({ ...formData, images: [...formData.images, ...files] })
	}

	const handleSubmit = () => {
		// API 호출 로직
		console.log("수정할 데이터:", formData)
		alert("정보가 성공적으로 수정되었습니다!")
		navigate("/") // 수정 후 홈으로 이동
	}

	return (
		<div className="px-4 py-6">
			<h1 className="mb-4 text-xl font-bold">흡연 구역 정보 수정</h1>
			<div className="mb-6">
				<label
					htmlFor="name"
					className="block text-sm font-medium text-gray-700"
				>
					흡연 구역 이름
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value={formData.name}
					onChange={handleInputChange}
					className="mt-2 w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					placeholder="흡연 구역의 이름을 입력해주세요."
				/>
			</div>

			<div className="mb-6">
				<h2 className="text-sm font-medium text-gray-700">
					흡연 구역의 정보를 선택해주세요.
				</h2>
				<div className="mt-2 space-y-2">
					{detailsOptions.map((option) => (
						<label
							key={option}
							className="flex cursor-pointer items-center space-x-2"
						>
							<input
								type="checkbox"
								checked={formData.details.includes(option)}
								onChange={() => handleDetailsChange(option)}
								className="rounded text-indigo-600 focus:ring-indigo-500"
							/>
							<span>{option}</span>
						</label>
					))}
				</div>
			</div>

			<div className="mb-6">
				<h2 className="text-sm font-medium text-gray-700">
					흡연 구역 인증 사진을 업로드해주세요.
				</h2>
				<div className="mt-2">
					<input
						type="file"
						multiple
						accept="image/*"
						onChange={handleImageUpload}
						className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-indigo-700 hover:file:bg-indigo-100"
					/>
					<div className="mt-4 flex flex-wrap gap-4">
						{formData.images.map((file, index) => (
							<div key={index} className="relative h-24 w-24">
								<img
									src={URL.createObjectURL(file)}
									alt="업로드 이미지 미리보기"
									className="h-full w-full rounded-lg object-cover"
								/>
								<button
									type="button"
									className="absolute right-0 top-0 rounded-full bg-red-600 p-1 text-sm text-white"
									onClick={() =>
										setFormData({
											...formData,
											images: formData.images.filter((_, i) => i !== index),
										})
									}
								>
									✕
								</button>
							</div>
						))}
					</div>
				</div>
			</div>

			<button
				onClick={handleSubmit}
				className="w-full rounded-lg bg-[#4517FF] py-3 font-medium text-white shadow-md hover:bg-[#3412cc]"
			>
				수정 완료
			</button>
		</div>
	)
}
