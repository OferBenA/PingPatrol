import { useThemeStore } from "../../../../../Store/useTheme";
import "./domainDetailsSkeletons.css";

function DomainDetailsSkeletons() {
	const theme = useThemeStore((state) => state.theme)


	return (
		<div className={`pt-32 w-screen h-screen flex justify-center align-top `}>
			<div className={`Domain-skeleton ${theme == 'dark' ? 'bg-[#2d3535] text-white': 'bg-[#FBFBFB] text-black'}`}>
				<div className="title"></div>
				<div className="info"></div>
				<div className="info"></div>
				<div className="info"></div>
				<div className="info"></div>
				<div className="info"></div>

			</div>
		</div>
	);
}

export default DomainDetailsSkeletons;
