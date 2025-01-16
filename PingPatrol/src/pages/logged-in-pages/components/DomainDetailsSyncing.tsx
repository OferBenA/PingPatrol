import { memo } from "react";
import sync from "../../../assets/sync.svg";
import { useThemeStore } from "../../../Store/useTheme";
function DomainDetailsSyncing({ domain }: { domain: string }) {
	const theme = useThemeStore((state) => state.theme);

	return (
		<div className="w-screen h-screen flex justify-center align-top">
			<div
				className={` pt-20 p-8 mt-32 ml-36 h-[600px] min-w-[500px] max-w-[calc(60vw-300px)] rounded-3xl bg-[#2d3535] shadow-[10px_10px_20px_20px_rgba(0,0,0,0.5)] ${
					theme == "dark"
						? "bg-[#2d3535] text-white"
						: "bg-[#FBFBFB] text-black"
				}`}
			>
				<h1 className="text-5xl mb-5">{domain}</h1>
				<div className="w-full flex justify-center align-middle pb-5">
					<img className="w-20" src={sync} alt="sync" />
				</div>

				<div className="flex justify-center flex-wrap gap-4 align-top">123</div>
			</div>
		</div>
	);
}

export default memo(DomainDetailsSyncing);
