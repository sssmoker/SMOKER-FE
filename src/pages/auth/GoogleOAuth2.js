// 서버측 제공 (이대로 가능)
//const GOOGLE_CLIENT_ID =	"677151527745-qrrmu06c86ga2nvev1apnu7jq2rjheqg.apps.googleusercontent.com"
//const GOOGLE_REDIRECT_URI = encodeURIComponent("http://localhost:5173/callback")

// 프론트쪽 따로
const GOOGLE_CLIENT_ID =
	"479235397199-n7csjk1g0h64kgjjp39400vk402fe4uj.apps.googleusercontent.com"
const GOOGLE_REDIRECT_URI = encodeURIComponent(
	"http://localhost:5000/login/oauth/code/google",
)
/*구글 api콘솔에 추가해놓은 REDIRECT_URI
http://localhost:5000/login/oauth/code/google
https://smoker.my/login/oauth/code/google
http://localhost:5173/callback
http://localhost:8080/login/oauth2/code/google
http://localhost:8080/login/oauth/code/google
*/

export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email+profile`
