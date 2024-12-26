import { memo } from "react";
import Domains from "./subComponents/Domains";
function Dashboard() {


	return(
		<>

		<div className="">
			<h1 className="text-4xl mb-5">Monitored Domains</h1>
			<Domains/>
		</div>
		</>

	);
}

export default memo(Dashboard);
