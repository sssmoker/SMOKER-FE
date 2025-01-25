import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "@/components/common/button/ComButton"

export default function LoginPage() {
	const navigate = useNavigate()
	const [error, setError] = useState(null) // 에러 메시지 상태

	// Google OAuth Mock 로그인 핸들러
	const handleGoogleLogin = async () => {
		try {
			const response = await fetch(
				"http://localhost:3001/users?provider=google",
			)
			const data = await response.json()

			if (data.length > 0) {
				console.log("Google Login Successful")
				sessionStorage.setItem("user", JSON.stringify(data[0]))
				navigate("/my-page")
			} else {
				setError("Google 계정을 찾을 수 없습니다.")
			}
		} catch (err) {
			setError("Google 로그인 중 오류가 발생했습니다.")
			console.error(err)
		}
	}

	// Kakao OAuth Mock 로그인 핸들러
	const handleKakaoLogin = async () => {
		try {
			const response = await fetch("http://localhost:3001/users?provider=kakao")
			const data = await response.json()

			if (data.length > 0) {
				console.log("Kakao Login Successful")
				sessionStorage.setItem("user", JSON.stringify(data[0]))
				navigate("/my-page")
			} else {
				setError("Kakao 계정을 찾을 수 없습니다.")
			}
		} catch (err) {
			setError("Kakao 로그인 중 오류가 발생했습니다.")
			console.error(err)
		}
	}

	return (
		<div className="flex h-screen flex-col items-center justify-center bg-gray-100 px-6">
			<h1 className="text-3xl font-bold text-[#4517FF]">만나서 반가워요!</h1>
			<p className="mt-4 text-sm text-gray-600">
				로그인 후 스모커의 모든 기능을 이용해보세요!
			</p>

			<div className="mt-8 w-full max-w-sm space-y-4">
				<Button size="xl" color="green" onClick={handleGoogleLogin}>
					구글로 로그인하기
				</Button>
				<Button size="xl" color="yellow" onClick={handleKakaoLogin}>
					카카오로 로그인하기
				</Button>
			</div>

			{error && <p className="mt-4 text-sm text-red-500">{error}</p>}

			<p className="mt-6 text-xs text-gray-500">
				버튼을 누르면{" "}
				<span className="font-medium text-gray-700">서비스 이용 약관</span> 및{" "}
				<span className="font-medium text-gray-700">개인정보 처리 방침</span>에
				동의한 것으로 간주합니다.
			</p>
		</div>
	)
}
