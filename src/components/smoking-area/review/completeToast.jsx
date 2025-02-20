import React from "react"
import PropTypes from "prop-types"
import Toast from "../../common/toast/Toast"
import check from "../../../assets/check.svg"

export default function CompleteToast({ isVisible, onClose }) {
	return (
		<Toast
			isVisible={isVisible}
			message={
				<>
					스모커에 후기
					<br />
					등록을 완료했어요!
				</>
			}
			subMessage="소중한 정보는 매너있는 하루를 만들어요!"
			icon={check}
			onClose={onClose}
		/>
	)
}

CompleteToast.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
}
