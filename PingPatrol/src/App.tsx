import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useUserContext } from "./Contexts/User-Context";
import NavBar from "./components/NavBar/NavBar";
import NotFound from "./pages/notFoundPage/NotFound";
import LoginPage from "./pages/auth-pages/Login-page/LoginPage";
import RegisterPage from "./pages/auth-pages/Register-page/RegisterPage";
import "./App.css";
import { useEffect, useLayoutEffect, useState } from "react";
import AuthProvider from "./Contexts/Auth-Context";

function App() {
	const { userData } = useUserContext();
	const [isLoggedIn, setIsLoggedIn] = useState(
		window.localStorage.getItem("isLoggedIn") == "true"
	);
	useLayoutEffect(() => {
		setIsLoggedIn(window.localStorage.getItem("isLoggedIn") == "true");
	}, [userData.isLoggedIn]);

	return (
		<>
			<AuthProvider>
				<BrowserRouter>
					{!isLoggedIn ? (
						<>
							<NavBar />
							<Routes>
								<Route path="/" element={<LoginPage />} />
								<Route path="/login" element={<LoginPage />} />
								<Route path="/register" element={<RegisterPage />} />
								<Route path="*" element={<NotFound />} />
							</Routes>
						</>
					) : (
						<Routes>
							{/* <Route path="/" element={<PostsPage />} /> */}
							<Route path="*" element={<NotFound />} />
						</Routes>
					)}
				</BrowserRouter>
			</AuthProvider>
		</>
	);
}

export default App;
