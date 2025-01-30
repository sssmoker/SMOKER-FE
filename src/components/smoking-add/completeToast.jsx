import React from "react"
import PropTypes from "prop-types"
import Toast from "../common/toast/Toast"
import check from "@/assets/check.svg"

export default function CompleteToast({ isVisible, onClose }) {
	return (
		<Toast
			isVisible={isVisible}
			message="스모커에"
			subMessage="업데이트를 완료했어요!"
			icon={check}
			onClose={onClose}
		/>
	)
}

CompleteToast.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
}
