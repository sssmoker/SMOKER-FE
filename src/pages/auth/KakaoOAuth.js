// 서버측
// const CLIENT_ID = "0dbd4bcd8be796c90d64f32e4849f390" //카카오 개발자 콘솔의 REST API 키
//const REDIRECT_URI = encodeURIComponent("http://localhost:5173/callback") //이거 문제가 있는지 안먹혀서 일단 내가 해둔 걸로 했음

// 프론트쪽 따로
const CLIENT_ID = "dd13ce5bf4e4f09bc5997cac52fb34b8" //카카오 개발자 콘솔의 REST API 키
const REDIRECT_URI = encodeURIComponent(
	"http://localhost:5000/login/oauth/code/kakao",
)
/* 카카오 dev에 추가해놓은 REDIRECT_URI
http://localhost:5000/login/oauth/code/kakao
https://smoker-fe.vercel.app/login/oauth/code/kakao
https://smoker.my/login/oauth/code/kakao
http://localhost:8080/login/oauth/code/kakao
https://api.smoker.my/login/oauth/code/kakao
*/

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`
