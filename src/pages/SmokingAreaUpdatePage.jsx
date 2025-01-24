import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Button from "@/components/common/button/ComButton"

export default function SmokingAreaUpdatePage() {
	const { smokingAreaId } = useParams()
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		smoking_name: "",
		region: "",
		latitude: "",
		longitude: "",
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await fetch(`http://localhost:3001/smokingAreas/${smokingAreaId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})
			navigate(`/smoking-area-detail/${smokingAreaId}`)
		} catch (error) {
			console.error("Error updating smoking area:", error)
		}
	}

	return (
		<div className="p-4">
			<h1 className="text-xl font-bold">흡연 구역 수정</h1>
			<form onSubmit={handleSubmit}>
				<div className="my-4">
					<label className="block text-sm font-medium">이름</label>
					<input
						type="text"
						name="smoking_name"
						value={formData.smoking_name}
						onChange={handleChange}
						className="w-full rounded border p-2"
					/>
				</div>
				<div className="my-4">
					<label className="block text-sm font-medium">지역</label>
					<input
						type="text"
						name="region"
						value={formData.region}
						onChange={handleChange}
						className="w-full rounded border p-2"
					/>
				</div>
				<div className="my-4">
					<label className="block text-sm font-medium">위도</label>
					<input
						type="text"
						name="latitude"
						value={formData.latitude}
						onChange={handleChange}
						className="w-full rounded border p-2"
					/>
				</div>
				<div className="my-4">
					<label className="block text-sm font-medium">경도</label>
					<input
						type="text"
						name="longitude"
						value={formData.longitude}
						onChange={handleChange}
						className="w-full rounded border p-2"
					/>
				</div>
				<Button size="m" color="purple" type="submit">
					수정 완료
				</Button>
			</form>
		</div>
	)
}
