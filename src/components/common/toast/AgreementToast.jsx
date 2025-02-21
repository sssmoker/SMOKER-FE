import React, { useState } from "react"
import PropTypes from "prop-types"
import { AlertCircle } from "lucide-react"
import ComButton from "@/components/common/button/ComButton"
import Toast from "@/components/common/toast/Toast"

export default function AgreementToast({ isVisible, onConfirm, onCancel }) {
	const [isChecked, setIsChecked] = useState(false)

	const handleCheckboxChange = () => {
		setIsChecked((prev) => !prev)
	}

	const handleConfirmClick = () => {
		onConfirm(isChecked)
	}

	const handleLoginClick = () => {
		onCancel()
	}

	return (
		<>
			{isVisible && (
				<div className="fixed inset-0 z-[998] bg-black bg-opacity-50"></div>
			)}

			<Toast
				isVisible={isVisible}
				message={
					<div className="whitespace-nowrap text-center text-lg font-bold">
						스모커 이용을 위한 이용약관 동의
					</div>
				}
				icon={<AlertCircle size={50} className="text-[#4517FF]" />}
				subMessage={
					<div className="mt-4 flex flex-col items-center justify-center text-center">
						<div className="pointer-events-auto flex items-center space-x-2">
							<input
								type="checkbox"
								id="location-agree"
								checked={isChecked}
								onChange={handleCheckboxChange}
								className="h-5 w-5 rounded-md border border-gray-400 text-[#4517FF] focus:ring-0"
							/>
							<label
								htmlFor="location-agree"
								className="text-sm font-medium text-gray-800"
							>
								[필수] 위치 기반 서비스 이용 약관
							</label>
							<span className="cursor-pointer text-xs text-gray-500 hover:underline">
								<a
									href="https://redsummerluv.notion.site/19cd9c6dcc31803f884ec97bb0e3b07b?pvs=4"
									target="_blank"
								>
									보기
								</a>
							</span>
						</div>
					</div>
				}
				onClose={() => {}}
				duration={null}
			>
				<div className="pointer-events-auto mt-6 flex w-full space-x-3">
					<ComButton
						size="l"
						color="gray"
						onClick={handleConfirmClick}
						className="w-1/2 rounded-lg"
					>
						다음
					</ComButton>
					<ComButton
						size="l"
						color="purple"
						onClick={handleLoginClick}
						className="w-1/2 rounded-lg"
					>
						로그인
					</ComButton>
				</div>
			</Toast>
		</>
	)
}

AgreementToast.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	onConfirm: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
}
