import React from "react"
import { RouterProvider } from "react-router-dom"
import { router } from "./Router"
import { AuthProvider } from "@/contexts/AuthContext"
import { Provider } from "react-redux"
import store from "@/redux/store"

function App() {
	return (
		<Provider store={store}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</Provider>
	)
}

export default App
