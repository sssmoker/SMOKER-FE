import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import path from "path"

export default defineConfig({
	resolve: {
		alias: {
			// eslint-disable-next-line no-undef
			"@": path.resolve(__dirname, "src"), // @ 경로를 src로 매핑
		},
	},
	server: {
		port: 5000, // 개발 서버 포트 설정
	},
	plugins: [
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "Smoker",
				short_name: "Smoker",
				description:
					"Smoker - Your ultimate smoking tracker and management app.",
				start_url: "/",
				display: "standalone",
				background_color: "#ffffff",
				theme_color: "#ff5722",
				icons: [
					{
						src: "/icons/icon-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/icons/icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
			workbox: {
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/api\.yourdomain\.com\/.*$/, // API 요청 캐시
						handler: "NetworkFirst", // 네트워크 우선
						options: {
							cacheName: "api-cache",
							expiration: {
								maxAgeSeconds: 60 * 60 * 24 * 7, // 7일
							},
							networkTimeoutSeconds: 10, // 네트워크 응답 대기 시간
						},
					},
				],
			},
		}),
	],
})
