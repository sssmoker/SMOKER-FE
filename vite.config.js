import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(), // React 플러그인
    VitePWA({
      registerType: "autoUpdate", // 자동 업데이트 서비스 워커 등록
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"], // 추가 정적 파일 포함
      manifest: {
        name: "Vite PWA Project", // 애플리케이션의 전체 이름
        short_name: "Vite PWA", // 홈 화면에 표시될 짧은 이름
        theme_color: "#ffffff", // PWA 테마 색상
        background_color: "#ffffff", // 초기 로딩 화면 배경색
        display: "standalone", // 애플리케이션의 표시 형태
        icons: [
          {
            src: "pwa-64x64.png", // 64x64 아이콘
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png", // 192x192 아이콘
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
