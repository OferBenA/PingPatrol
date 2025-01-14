import { memo } from "react";
import Domains from "./components/Domains";
import { useThemeStore } from "../../Store/useTheme";
function Dashboard() {
		const theme = useThemeStore((state) => state.theme)

	return(
		<>
		<div className={`pt-48 pl-36 w-screen min-h-screen ${theme == 'dark' ? 'bg-[#1a2222] text-white': 'bg-[#BCCCDC] text-slate-700'}`}>
			<h1 className="text-4xl mb-5">Monitored Ips</h1>
			<Domains/>
		</div>
		</>

	);
}

export default memo(Dashboard);
