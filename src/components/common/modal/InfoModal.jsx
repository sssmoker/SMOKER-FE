import React, { useState } from "react"

export default function InfoModal({ onNext, onLogin }) {
	const [isChecked, setIsChecked] = useState(false)

	const handleCheckboxChange = () => {
		setIsChecked((prev) => !prev)
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="rounded-lg bg-white p-6 shadow-lg">
				<div className="text-center">
					<h2 className="mb-4 text-lg font-semibold text-gray-800">
						스모커 이용을 위한 이용약관 동의
					</h2>
					<div className="mb-6 flex items-center justify-start">
						<input
							type="checkbox"
							id="terms"
							checked={isChecked}
							onChange={handleCheckboxChange}
							className="mr-2 h-4 w-4"
						/>
						<label htmlFor="terms" className="text-sm text-gray-600">
							[필수] 위치 기반 서비스 이용 약관{" "}
							<span className="text-blue-500">보기</span>
						</label>
					</div>
					<div className="flex space-x-4">
						<button
							onClick={() => onNext(isChecked)} // 체크 여부 전달
							className="rounded bg-gray-300 px-4 py-2 text-sm text-gray-800"
						>
							다음
						</button>
						<button
							onClick={() => onLogin(isChecked)} // 체크 여부 전달
							className="rounded bg-blue-500 px-4 py-2 text-sm text-white"
						>
							로그인
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
