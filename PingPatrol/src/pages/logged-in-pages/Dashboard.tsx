import { memo } from "react";
import Domains from "./components/Domains";
function Dashboard() {

	return(
		<>
		<div className={`pt-32 pl-36 w-screen max-w-[100%]  min-h-screen `}>
			<h1 className="text-4xl mb-5">Monitored IPs</h1>
			<Domains/>
		</div>
		</>

	);
}

export default memo(Dashboard);
