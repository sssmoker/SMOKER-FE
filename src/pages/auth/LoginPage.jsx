import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"
import KakaoSymbol from "@/assets/KakaoSymbol.svg"
import GoogleSymbol from "@/assets/GoogleSymbol.svg"

export default function LoginPage() {
	const navigate = useNavigate()
	const [error, setError] = useState(null) // 에러 메시지 상태
	const [isGoogleClicked, setIsGoogleClicked] = useState(false)

	// Google OAuth Mock 로그인 핸들러
	const handleGoogleLogin = async () => {
		setIsGoogleClicked(true)
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
		setTimeout(() => setIsGoogleClicked(false), 300)
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
		<div className="flex min-h-screen flex-col items-center gap-y-8 bg-gray-100 px-6">
			<div className="w-full p-4">
				<BackButton className="absolute left-4 top-4" />
			</div>

			<div className="relative w-full max-w-xs">
				<div className="absolute left-7 top-3 h-4 w-4 rounded-full bg-[#FDFF72]"></div>
				<div className="absolute left-32 top-3 h-4 w-4 rounded-full bg-[#4517FF]"></div>
			</div>

			<h1 className="bg-gradient-to-l from-[#2A0E99] to-[#4517FF] bg-clip-text text-center text-4xl font-bold text-transparent">
				만나서 반가워요!
			</h1>

			<p className="-mt-5 ml-12 w-full max-w-sm text-left text-sm text-gray-600">
				로그인 후 스모커의 <br />
				모든 기능을 이용해보세요!
			</p>

			{/* 간편로그인 타이틀 */}
			<div className="mt-32 w-full max-w-sm text-center">
				<div className="flex items-center">
					<div className="flex-grow border-t-2 border-[#E8ECF4]"></div>
					<span className="px-3 text-sm font-bold text-[#6A707C]">
						간편로그인
					</span>
					<div className="flex-grow border-t-2 border-[#E8ECF4]"></div>
				</div>
			</div>

			{/* 로그인 버튼 */}
			<div className="flex w-full max-w-sm flex-col items-center gap-y-6">
				<div className="flex w-full flex-row space-x-2">
					<button
						className={`flex w-full items-center justify-center gap-3 whitespace-nowrap rounded-[0.75rem] border px-4 py-3 text-xs transition-all duration-200 sm:text-sm ${
							isGoogleClicked
								? "bg-[#4285F4] text-white"
								: "border-[#DEDEDE] bg-white text-black"
						}`}
						onClick={handleGoogleLogin}
					>
						<div className="flex h-6 w-6 items-center justify-center bg-white">
							<img
								src={GoogleSymbol}
								alt="Google"
								className="h-4 w-4 sm:h-5 sm:w-5"
							/>
						</div>
						<span className="font-bold">구글로 로그인하기</span>
					</button>
					<button
						className="flex w-full items-center justify-center gap-3 whitespace-nowrap rounded-[0.75rem] bg-[#FEE500] px-4 py-3 text-xs font-medium text-black sm:text-sm"
						onClick={handleKakaoLogin}
					>
						<img
							src={KakaoSymbol}
							alt="Kakao"
							className="h-4 w-4 sm:h-5 sm:w-5"
						/>
						<span className="font-bold">카카오로 로그인하기</span>
					</button>
				</div>
			</div>

			{/* 에러 메시지 */}
			{error && <p className="mt-4 text-sm text-red-500">{error}</p>}

			{/* 이용 약관 */}
			<p className="text-center text-xs text-gray-500">
				회원가입하면{" "}
				<span className="font-bold text-gray-700 underline">
					서비스 이용 약관
				</span>{" "}
				및{" "}
				<span className="font-bold text-gray-700 underline">
					개인정보 이용 약관
				</span>
				,
				<br />
				<span className="font-bold text-gray-700 underline">
					위치 기반 서비스 이용 약관
				</span>
				에 동의하게 됩니다.
			</p>
		</div>
	)
}
