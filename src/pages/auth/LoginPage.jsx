import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"
import KakaoSymbol from "@/assets/KakaoSymbol.svg"
import GoogleSymbol from "@/assets/GoogleSymbol.svg"
import { KAKAO_AUTH_URL } from "@/pages/auth/KakaoOAuth"
import { GOOGLE_AUTH_URL } from "@/pages/auth/GoogleOAuth2"

export default function LoginPage() {
	const navigate = useNavigate()
	const [isGoogleClicked, setIsGoogleClicked] = useState(false)

	const handleLogin = (provider) => {
		if (provider === "google") {
			window.location.href = GOOGLE_AUTH_URL()
		} else if (provider === "kakao") {
			window.location.href = KAKAO_AUTH_URL()
		}
	}

	return (
		<div className="flex min-h-screen flex-col items-center gap-y-8 bg-white px-6 pt-16">
			<div className="w-full p-4">
				<BackButton className="absolute left-4 top-4" />
			</div>

			<div className="relative mt-2 w-full max-w-lg">
				<div className="absolute left-2 top-2 h-4 w-4 animate-yellowBounce rounded-full bg-[#FDFF72]"></div>
				<div className="absolute left-16 top-2 h-4 w-4 translate-x-10 animate-purpleBounce rounded-full bg-[#4517FF]"></div>{" "}
			</div>

			<div className="ml-2 mt-0 w-full text-left">
				<p className="mb-4 bg-gradient-to-l from-[#2A0E99] to-[#4517FF] bg-clip-text text-4xl font-bold text-transparent">
					만나서 반가워요!
				</p>
				<p className="max-w-sm text-sm font-bold text-gray-600 sm:ml-4">
					로그인 후 스모커의 <br />
					모든 기능을 이용해보세요!
				</p>
			</div>
			<div className="mt-80 w-full max-w-sm text-center">
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
						onMouseDown={() => setIsGoogleClicked(true)}
						onMouseUp={() => setIsGoogleClicked(false)}
						onClick={() => handleLogin("google")}
					>
						<div className="mr-[0.625rem] flex h-[1.5rem] w-[1.5rem] items-center justify-center bg-white">
							<img
								src={GoogleSymbol}
								alt="Google"
								className="h-[1.125rem] w-[1.125rem] sm:h-5 sm:w-5"
							/>
						</div>
						<span className="text-center font-bold">구글로 로그인하기</span>
					</button>

					<button
						onClick={() => handleLogin("kakao")}
						className="flex h-[2.75rem] min-w-[10rem] max-w-[50vw] flex-1 items-center justify-center whitespace-nowrap rounded-[0.75rem] bg-[#FEE500] px-4 text-xs font-bold text-black sm:text-sm"
					>
						<div className="flex items-center gap-[0.5rem]">
							<img
								src={KakaoSymbol}
								alt="Kakao"
								className="h-[1.125rem] w-[1.125rem] sm:h-5 sm:w-5"
							/>
							<span className="text-center">카카오로 로그인하기</span>
						</div>
					</button>
				</div>
			</div>

			<p className="text-center text-xs text-gray-500">
				회원가입하면
				<span className="font-bold text-gray-700 underline">
					서비스 이용 약관
				</span>
				및
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
