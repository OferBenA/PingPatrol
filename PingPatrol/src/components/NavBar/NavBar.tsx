import { memo } from "react";
import icon from "../../assets/PingPatrolLightIcon.png";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
	return (
		<div className="navbar">
			<div className="navbar-icon">
				<div className="name">
					<p >PingPatrol</p>
				</div>
				<img src={icon} alt="icon" />
				<div className="slogen">
					<p>monitor</p>
					<p className="everything">everything</p>
				</div>
			</div>
			<div className="login-register">
				<Link to={"/login"}>
				<button className="login">Login</button>
				</Link>
				<button className="register">Register</button>
			</div>
		</div>
	);
}

export default memo(NavBar);
