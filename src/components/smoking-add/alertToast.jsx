import React from "react"
import PropTypes from "prop-types"
import Toast from "../common/toast/Toast"
import alert from "@/assets/alert.svg"

export default function AlertToast({ isVisible, onClose }) {
	return (
		<Toast
			isVisible={isVisible}
			message="사진 등록이 필요해요!"
			subMessage="흡연 구역임을 확인할 수 있는 문구를 포함한 이미지를 업로드해주세요."
			icon={alert}
			onClose={onClose}
		/>
	)
}

AlertToast.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
}
