import { memo } from "react";
import Domains from "./components/Domains";
function Dashboard() {


	return(
		<>
		<div className="mt-32 ml-36 w-10/12 h-[calc(100vh-140px)]">
			<h1 className="text-4xl mb-5">Monitored Domains</h1>
			<Domains/>
		</div>
		</>

	);
}

export default memo(Dashboard);
