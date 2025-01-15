import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useUserContext } from "./Contexts/User-Context";
import NavBar from "./components/NavBar/NavBar";
import NotFound from "./pages/notFoundPage/NotFound";
import LoginPage from "./pages/auth-pages/Login-page/LoginPage";
import RegisterPage from "./pages/auth-pages/Register-page/RegisterPage";
import "./App.css";
import AuthProvider from "./Contexts/Auth-Context";
import LeftNavBar from "./components/LeftNavBar/LeftNavBar";
import Dashboard from "./pages/logged-in-pages/Dashboard";
import AddItem from "./pages/logged-in-pages/AddItem";
import DomainDetails from "./pages/logged-in-pages/DomainDetails";
import { useThemeStore } from "./Store/useTheme";
function App() {
	const { userData } = useUserContext();
	const theme = useThemeStore((state) => state.theme)

	return (
		<>
			<div className={` ${
				theme == "dark"
					? "bg-[#1a2222] text-white"
					: "bg-[#BCCCDC] text-slate-700"
			}`}>
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
								<LeftNavBar />
								<Routes>
									<Route path="/" element={<Dashboard />} />
									<Route path="/addItem" element={<AddItem />} />
									<Route
										path="/domaindetails/:domain"
										element={<DomainDetails />}
									/>
									<Route path="*" element={<NotFound />} />
								</Routes>
							</>
						)}
					</BrowserRouter>
				</AuthProvider>
			</div>
		</>
	);
}

export default App;
