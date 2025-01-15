import { memo } from "react";
import Domains from "./components/Domains";
function Dashboard() {

	return(
		<>
		<div className={`pt-48 pl-36 min-w-screen min-h-screen `}>
			<h1 className="text-4xl mb-5">Monitored Ips</h1>
			<Domains/>
		</div>
		</>

	);
}

export default memo(Dashboard);
