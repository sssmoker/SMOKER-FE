import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PropTypes from "prop-types"
import { AlertCircle } from "lucide-react"
import ComButton from "@/components/common/button/ComButton"

export default function AgreementToast({ isVisible, onConfirm, onCancel }) {
	const [isChecked, setIsChecked] = useState(false)

	return (
		<AnimatePresence>
			{isVisible && (
				<>
					{/* ✅ 배경 오버레이 */}
					<div className="fixed inset-0 z-[998] bg-black bg-opacity-50"></div>

					{/* ✅ 화면 중앙 정렬 */}
					<motion.div
						className="fixed inset-0 z-[999] flex items-center justify-center"
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3 }}
					>
						<div className="w-[320px] rounded-3xl bg-white p-6 text-center shadow-lg">
							{/* ✅ 아이콘 중앙 정렬 수정 */}
							<div className="mb-4 flex items-center justify-center">
								<AlertCircle size={40} className="text-[#4517FF]" />
							</div>

							<h2 className="mb-2 text-lg font-bold">
								스모커 이용을 위한 이용약관 동의
							</h2>

							{/* ✅ 체크박스 정렬 수정 */}
							<div className="mt-4 flex items-center justify-center">
								<input
									type="checkbox"
									id="location-agree"
									checked={isChecked}
									onChange={() => setIsChecked(!isChecked)}
									className="mr-2 h-5 w-5 rounded-md border border-gray-400 text-[#4517FF] focus:ring-0"
								/>
								<label
									htmlFor="location-agree"
									className="text-sm font-medium text-gray-700"
								>
									[필수] 위치 기반 서비스 이용 약관
								</label>
							</div>

							{/* ✅ 버튼 정렬 유지 */}
							<div className="mt-6 flex w-full space-x-2">
								<ComButton
									size="m"
									color="gray"
									onClick={() => onConfirm(isChecked)}
									className="w-1/2"
								>
									다음
								</ComButton>
								<ComButton
									size="m"
									color="purple"
									onClick={onCancel}
									className="w-1/2"
								>
									로그인
								</ComButton>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}

AgreementToast.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	onConfirm: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
}
