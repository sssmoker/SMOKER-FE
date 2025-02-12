import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import BackButton from "@/components/common/button/BackButton"
import KakaoSymbol from "@/assets/KakaoSymbol.svg"
import GoogleSymbol from "@/assets/GoogleSymbol.svg"
import { useAuthContext } from "@/contexts/AuthContext"

//서버 연결시
/*
export default function LoginPage() {
  const navigate = useNavigate()
  
  const KAKAO_AUTH_URL = `http://localhost:8080/oauth2/authorization/kakao`
  const GOOGLE_AUTH_URL = `http://localhost:8080/oauth2/authorization/google`

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  // 구글 로그인 요청
  const googleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

*/

//현재 JSON서버
export default function LoginPage() {
	const navigate = useNavigate()
	const { login } = useAuthContext()
	const [error, setError] = useState(null)
	const [isGoogleClicked, setIsGoogleClicked] = useState(false)

	const handleLogin = async (provider) => {
		setIsGoogleClicked(provider === "google")
		setError(null)

		try {
			const success = await login(provider)
			if (!success) {
				setError("로그인 실패! 다시 시도해주세요.")
				return
			}
			navigate("/")
		} catch (err) {
			setError(`${provider} 로그인 중 오류가 발생했습니다.`)
		}

		setTimeout(() => setIsGoogleClicked(false), 300)
	}
	return (
		<div className="flex min-h-screen flex-col items-center gap-y-8 bg-white px-6">
			<div className="w-full p-4">
				<BackButton className="absolute left-4 top-4" />
			</div>

			<div className="relative w-full max-w-xs">
				<div className="absolute left-7 top-8 h-4 w-4 rounded-full bg-[#FDFF72]"></div>
				<div className="absolute left-32 top-8 h-4 w-4 rounded-full bg-[#4517FF]"></div>
			</div>

			<h1 className="mt-6 bg-gradient-to-l from-[#2A0E99] to-[#4517FF] bg-clip-text text-center text-4xl font-bold text-transparent">
				만나서 반가워요!
			</h1>

			<p className="-mt-6 ml-12 w-full max-w-sm text-left text-sm text-gray-600">
				로그인 후 스모커의 <br />
				모든 기능을 이용해보세요!
			</p>

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
						className="flex h-[2.75rem] min-w-[10rem] max-w-[50vw] flex-1 items-center justify-center whitespace-nowrap rounded-[0.75rem] bg-[#FEE500] px-4 text-xs font-medium text-black sm:text-sm"
						onClick={() => handleLogin("kakao")}
					>
						<div className="flex items-center gap-[0.5rem]">
							<img
								src={KakaoSymbol}
								alt="Kakao"
								className="h-[1.125rem] w-[1.125rem] sm:h-5 sm:w-5"
							/>
							<span className="text-center font-bold">카카오로 로그인하기</span>
						</div>
					</button>
				</div>
			</div>

			{error && <p className="mt-4 text-sm text-red-500">{error}</p>}

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
