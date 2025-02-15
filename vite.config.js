import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"
import path from "path"

export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"), // `@`를 `src` 경로로 설정
		},
	},
	server: {
		port: 5000, // 개발 서버 포트 설정
	},
	plugins: [
		react(), // React 최적화 플러그인
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
						urlPattern: ({ request }) =>
							request.destination === "script" ||
							request.destination === "style" ||
							request.destination === "document",
						handler: "StaleWhileRevalidate",
						options: {
							cacheName: "static-resources",
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 60 * 60 * 24 * 30, // 30일
							},
						},
					},
					{
						urlPattern: /^https:\/\/api\.yourdomain\.com\/.*$/, // API 캐싱
						handler: "NetworkFirst",
						options: {
							cacheName: "api-cache",
							expiration: {
								maxAgeSeconds: 60 * 60 * 24 * 7, // 7일
							},
							networkTimeoutSeconds: 10,
						},
					},
				],
			},
		}),
	],
	optimizeDeps: {
		exclude: ["@tanstack/react-query", "framer-motion"], // 불필요한 번들링 제외
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						return id.split("node_modules/")[1].split("/")[0]
					}
				},
			},
		},
		chunkSizeWarningLimit: 600, // 큰 번들 경고 제한 증가
	},
})
