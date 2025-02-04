import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"
import KakaoSymbol from "@/assets/KakaoSymbol.svg"
import GoogleSymbol from "@/assets/GoogleSymbol.svg"
import { useAuthContext } from "@/contexts/AuthContext" // ✅ AuthContext 가져오기

export default function LoginPage() {
	const navigate = useNavigate()
	const { login } = useAuthContext()
	const [error, setError] = useState(null)
	const [isGoogleClicked, setIsGoogleClicked] = useState(false)

	const handleLogin = async (provider) => {
		setIsGoogleClicked(provider === "google")

		try {
			await login(provider) // ✅ login 함수 호출
			console.log("🔍 [LoginPage] 로그인 완료, MyPage로 이동!")
			navigate("/my-page") // ✅ 로그인 후 마이페이지로 이동
		} catch (err) {
			setError(`${provider} 로그인 중 오류가 발생했습니다.`)
			console.error(err)
		}

		setTimeout(() => setIsGoogleClicked(false), 300)
	}

	return (
		<div className="flex min-h-screen flex-col items-center gap-y-8 bg-white px-6">
			<div className="w-full p-4">
				<BackButton className="absolute left-4 top-4" />
			</div>

			<h1 className="mt-6 bg-gradient-to-l from-[#2A0E99] to-[#4517FF] bg-clip-text text-center text-4xl font-bold text-transparent">
				만나서 반가워요!
			</h1>

			<div className="mt-36 w-full max-w-sm text-center">
				<div className="flex items-center">
					<div className="flex-grow border-t-2 border-[#E8ECF4]"></div>
					<span className="px-3 text-sm font-bold text-[#6A707C]">
						간편로그인
					</span>
					<div className="flex-grow border-t-2 border-[#E8ECF4]"></div>
				</div>
			</div>

			<div className="-mt-5 flex w-full max-w-sm flex-col items-center gap-y-6">
				<div className="flex w-full flex-row gap-2">
					<button
						className={`flex h-[2.75rem] min-w-[10rem] max-w-[50vw] flex-1 items-center justify-center whitespace-nowrap rounded-[0.75rem] border px-4 text-xs transition-all duration-200 sm:text-sm ${
							isGoogleClicked
								? "bg-[#4285F4] text-white"
								: "border-[#DEDEDE] bg-white text-black"
						}`}
						onClick={() => handleLogin("google")}
					>
						<img
							src={GoogleSymbol}
							alt="Google"
							className="h-[1.125rem] w-[1.125rem] sm:h-5 sm:w-5"
						/>
						<span className="text-center font-bold">구글로 로그인하기</span>
					</button>
					<button
						className="flex h-[2.75rem] min-w-[10rem] max-w-[50vw] flex-1 items-center justify-center whitespace-nowrap rounded-[0.75rem] bg-[#FEE500] px-4 text-xs font-medium text-black sm:text-sm"
						onClick={() => handleLogin("kakao")}
					>
						<img
							src={KakaoSymbol}
							alt="Kakao"
							className="h-[1.125rem] w-[1.125rem] sm:h-5 sm:w-5"
						/>
						<span className="text-center font-bold">카카오로 로그인하기</span>
					</button>
				</div>
			</div>

			{error && <p className="mt-4 text-sm text-red-500">{error}</p>}
		</div>
	)
}
