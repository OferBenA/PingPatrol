import { useState } from "react";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { useUserContext } from "./Contexts/User-Context";
import NotFound from "./pages/notFoundPage/NotFound";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";

function App() {
	const { userData } = useUserContext();

	return (
		<>
			<BrowserRouter>
				{!userData.isLoggedIn ? (
					<>
            <NavBar/>
						<Routes>
							{/* <Route path="/" element={<LoginPage />} /> */}
							{/* <Route path="/login" element={<LoginPage />} />
							<Route path="/register" element={<Register />} />
							<Route path="/posts" element={<></>} />
							<Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
							<Route path="*" element={<NotFound />} />
						</Routes>
					</>
				) : (
					<Routes>
						{/* <Route path="/" element={<PostsPage />} /> */}
						<Route path="*" element={<NotFound />}/>
					</Routes>
				)}
			</BrowserRouter>
		</>
	);
}

export default App;
