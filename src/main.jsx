import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from "./App"
import "@/index.css"

const queryClient = new QueryClient()

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("/sw.js")
			.then((registration) => {
				console.log("Service Worker registered with scope:", registration.scope)
			})
			.catch((error) => {
				console.error("Service Worker registration failed:", error)
			})
	})
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</React.StrictMode>,
)
