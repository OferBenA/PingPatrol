import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useUserContext } from "./Contexts/User-Context";
import NavBar from "./components/NavBar/NavBar";
import NotFound from "./pages/notFoundPage/NotFound";
import LoginPage from "./pages/auth-pages/Login-page/LoginPage";
import RegisterPage from "./pages/auth-pages/Register-page/RegisterPage";
import "./App.css";

function App() {
	const { userData } = useUserContext();

	return (
		<>
			<BrowserRouter>
				{!userData.isLoggedIn ? (
					<>
						<NavBar />
						<Routes>
							<Route path="/" element={<LoginPage />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/register" element={<RegisterPage />} />
							{/* <Route path="/posts" element={<></>} />
							<Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
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
		</>
	);
}

export default App;
