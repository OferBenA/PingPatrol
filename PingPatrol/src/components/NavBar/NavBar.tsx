import { memo } from "react";
import icon from "../../assets/PingPatrolLightIcon.png";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useUserContext } from "../../Contexts/User-Context";
import { useThemeStore } from "../../Store/useTheme";
import darkMode from '../../assets/dark_mode.svg'
import lightMode from '../../assets/light_mode.svg'

function NavBar() {
	const { userData } = useUserContext();
	const theme = useThemeStore((state) => state.theme)
	const dispatchTheme = useThemeStore(state => state.toggleTheme)

	return (
		<div className={`navbar ${theme == 'dark' ? 'bg-[#1a2222] text-white': 'bg-[#BCCCDC] text-slate-700'}`}>
			<div className="navbar-icon">
				<div className="name">
					<Link  className="Link-to-home" to={"/"}>
						<p>PingPatrol</p>
					</Link>
				</div>

				<Link to={"/"}><img src={icon} alt="icon" /></Link>
				<div className="slogen">
					<p>monitor</p>
					<p className="everything">everything</p>
				</div>
			</div>
			{!userData.isLoggedIn ?
			<div className="login-register">
				<Link to={"/login"}>
					<button className={`${theme == 'dark' ?  'bg-[#FBFBFB] text-slate-700' : 'bg-[#1a2222] text-white'}`}>Login</button>
				</Link>
				<Link to={"/register"}>
					<button className={`${theme == 'dark' ?  'bg-[#FBFBFB] text-slate-700' : 'bg-[#1a2222] text-white'}`}>Register</button>
				</Link>
				<img className="hover:cursor-pointer" onClick={dispatchTheme} src={theme == 'dark' ? darkMode : lightMode}/>
			</div>
			:
			<div className="flex justify-center align-middle gap-4">
				<h4 className="font-bold">Welcome back <div className="font-semibold text-lg inline">{userData?.username}</div></h4>
				<img className="hover:cursor-pointer" onClick={dispatchTheme} src={theme == 'dark' ? darkMode : lightMode}/>
			</div>
			}
		</div>
	);
}

export default memo(NavBar);
