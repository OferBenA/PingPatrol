import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useUserContext } from "./Contexts/User-Context";
import NavBar from "./components/NavBar/NavBar";
import NotFound from "./pages/notFoundPage/NotFound";
import LoginPage from "./pages/auth-pages/Login-page/LoginPage";
import RegisterPage from "./pages/auth-pages/Register-page/RegisterPage";
import "./App.css";
// import { useEffect, useState } from "react";
import AuthProvider from "./Contexts/Auth-Context";
import LeftNavBar from "./components/LeftNavBar/LeftNavBar";
import Dashboard from "./pages/logged-in-pages/Dashboard";
import AddItem from "./pages/logged-in-pages/AddItem";

function App() {
	const { userData } = useUserContext();
	// const [isLoggedIn, setIsLoggedIn] = useState(
	// 	window.localStorage.getItem("isLoggedIn") == "true"
	// );
	// useEffect(() => {
	// 	setIsLoggedIn(window.localStorage.getItem("isLoggedIn") == "true");
	// 	console.log(`userData.isLoggedIn triggerd curr status:${userData.isLoggedIn}`)
	// }, [userData.isLoggedIn]);

	return (
		<>
			<AuthProvider>
				<BrowserRouter>
				<NavBar />
					{!userData.isLoggedIn ? (
						<>

							<Routes>
								<Route path="/" element={<LoginPage />} />
								<Route path="/login" element={<LoginPage />} />
								<Route path="/register" element={<RegisterPage />} />
								<Route path="*" element={<NotFound />} />
							</Routes>
						</>
					) : (
						<>
						<LeftNavBar/>
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/addItem" element={<AddItem />} />
							{/* <Route path="/Domain/:DomainName" element={<Domain />} /> */}
							<Route path="*" element={<NotFound />} />
						</Routes>
						</>
					)}
				</BrowserRouter>
			</AuthProvider>
		</>
	);
}

export default App;
