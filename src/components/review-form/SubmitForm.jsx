import React, { useState } from "react"
import PropTypes from "prop-types"
import ComButton from "@/components/common/button/ComButton"
import RatingStars from "./RatingStar"
import ImageUploader from "./ImageUploader"
import TextAreaInput from "./TextAreaInput"

export default function SubmitForm({ onSubmit }) {
	const [review, setReview] = useState("")
	const [images, setImages] = useState([])
	const [rating, setRating] = useState(0)

	// 폼 제출 시, 이미지를 유무와 관계없이 부모에게 전달
	const handleSubmit = () => {
		onSubmit({ images, review, rating }) // 이미지, 리뷰, 별점 데이터를 부모로 전달
	}

	return (
		<div className="w-full">
			<RatingStars rating={rating} setRating={setRating} />
			<ImageUploader images={images} setImages={setImages} />
			<TextAreaInput
				value={review}
				onChange={(e) => setReview(e.target.value)}
				placeholder="다른 스모커에게 도움이 되는 후기를 남겨주세요."
			/>
			<div className="flex justify-center">
				<ComButton onClick={handleSubmit} size="xl">
					등록하기
				</ComButton>
			</div>
		</div>
	)
}

SubmitForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
}
