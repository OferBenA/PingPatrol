import { memo } from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
	return (
		<div className="not-found">
			<div className="not-found-div">
				<h1>404</h1>
				<h3>page is not found!</h3>
			</div>
			<div className="go-back-div">
				<Link to={"/"}>
					<button>go back</button>
				</Link>
			</div>
		</div>
	);
}

export default memo(NotFound);
