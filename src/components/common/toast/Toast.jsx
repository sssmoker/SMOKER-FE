import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PropTypes from "prop-types"
import { AlertCircle } from "lucide-react"
import ComButton from "@/components/common/button/ComButton"

export default function Toast({
	isVisible,
	type,
	message,
	subMessage,
	icon,
	onClose,
	onConfirm,
	onCancel,
	confirmText = "확인",
	cancelText = null,
}) {
	const [isChecked, setIsChecked] = useState(false)

	useEffect(() => {
		if (isVisible && type !== "agreement") {
			const timer = setTimeout(() => {
				onClose()
			}, 3000) // 3초 후 자동 닫힘
			return () => clearTimeout(timer)
		}
	}, [isVisible, onClose])

	return (
		<AnimatePresence>
			{isVisible && (
				<>
					{/* 배경 Overlay */}
					<div className="fixed inset-0 z-[9998] bg-black bg-opacity-50 backdrop-blur-sm"></div>

					{/* 모달 박스 */}
					<motion.div
						className="fixed left-1/2 top-1/2 z-[9999] w-[320px] -translate-x-1/2 -translate-y-1/2"
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3 }}
					>
						<div className="pointer-events-auto flex w-full flex-col items-center rounded-3xl bg-white p-8 text-center shadow-lg">
							{/* 아이콘 (보라색, 크기 증가) */}
							<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full text-[#4517FF]">
								{icon || <AlertCircle size={36} className="text-[#4517FF]" />}
							</div>

							<h2 className="mb-2 text-lg font-bold">{message}</h2>

							{/* 위치 기반 서비스 체크박스 추가 */}
							{type === "agreement" && (
								<div className="mt-4 flex items-center">
									<input
										type="checkbox"
										id="location-agree"
										checked={isChecked}
										onChange={() => {
											setIsChecked(!isChecked)
											console.log("체크박스 상태:", !isChecked)
										}}
										className="mr-2 h-5 w-5 rounded-md border border-gray-400 text-[#4517FF] focus:ring-0"
									/>
									<label
										htmlFor="location-agree"
										className="text-sm font-medium text-gray-700"
									>
										[필수] 위치 기반 서비스 이용 약관
									</label>
								</div>
							)}

							{/* 버튼 (왼쪽: 다음, 오른쪽: 로그인) */}
							<div className="mt-6 flex w-full space-x-2">
								<ComButton
									size="m"
									color="gray"
									onClick={() => {
										console.log("다음 버튼 클릭, 체크 여부:", isChecked)
										onConfirm()
									}}
									className="w-1/2"
								>
									{confirmText}
								</ComButton>

								{cancelText && (
									<ComButton
										size="m"
										color="purple"
										onClick={onCancel}
										className="w-1/2"
									>
										{cancelText}
									</ComButton>
								)}
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}

Toast.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	type: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	subMessage: PropTypes.string,
	icon: PropTypes.node,
	onClose: PropTypes.func,
	onConfirm: PropTypes.func,
	onCancel: PropTypes.func,
	confirmText: PropTypes.string,
	cancelText: PropTypes.string,
}
