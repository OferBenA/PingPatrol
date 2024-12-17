import { memo } from "react";
import icon from "../../assets/PingPatrolLightIcon.png";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useUserContext } from "../../Contexts/User-Context";
function NavBar() {
	const { userData } = useUserContext();

	return (
		<div className="navbar">
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
			{userData.isLoggedIn ?

			<div className="login-register">
				<Link to={"/login"}>
					<button className="login">Login</button>
				</Link>
				<Link to={"/register"}>
					<button className="register">Register</button>
				</Link>
			</div>
			:
			<div className="login-register">
				<button>logout</button>
			</div>
			}
		</div>
	);
}

export default memo(NavBar);
