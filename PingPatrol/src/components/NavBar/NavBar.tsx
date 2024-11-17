import { memo } from "react";
import icon from "../../assets/PingPatrolLightIcon.png";
import "./NavBar.css";

function NavBar() {
	return (
		<div className="navbar">
			<div className="navbar-icon">
				<img src={icon} alt="icon" />
				<div className="slogen">
					<p>monitor</p>
					<p className="everything">everything</p>
				</div>
			</div>
			<div className="login-register">
				<button className="login">Login</button>
				<button className="register">Register</button>
			</div>
		</div>
	);
}

export default memo(NavBar);
