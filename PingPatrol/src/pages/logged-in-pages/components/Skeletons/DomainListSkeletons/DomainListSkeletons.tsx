import { useThemeStore } from '../../../../../Store/useTheme';
import './DomainListSkeletons.css';

function DomainListSkeletons() {
	const theme = useThemeStore((state) => state.theme)

	return (
		<div className={`flex justify-center gap-5 align-top flex-wrap `}>
			<div className={`skeleton ${theme == 'dark' ? 'bg-[#2d3535] text-white': 'bg-[#FBFBFB] text-black'}`}>
				<div className="title"></div>
				<div className="info"></div>
				<div className="info"></div>
				<div className="skeleton-img">
					<div></div>
					<div></div>
				</div>
			</div>
			<div className={`skeleton ${theme == 'dark' ? 'bg-[#2d3535] text-white': 'bg-[#FBFBFB] text-black'}`}>
				<div className="title"></div>
				<div className="info"></div>
				<div className="info"></div>
				<div className="skeleton-img">
					<div></div>
					<div></div>
				</div>
			</div>
			<div className={`skeleton ${theme == 'dark' ? 'bg-[#2d3535] text-white': 'bg-[#FBFBFB] text-black'}`}>
				<div className="title"></div>
				<div className="info"></div>
				<div className="info"></div>
				<div className="skeleton-img">
					<div></div>
					<div></div>
				</div>
			</div>
			<div className={`skeleton ${theme == 'dark' ? 'bg-[#2d3535] text-white': 'bg-[#FBFBFB] text-black'}`}>
				<div className="title"></div>
				<div className="info"></div>
				<div className="info"></div>
				<div className="skeleton-img">
					<div></div>
					<div></div>
				</div>
			</div>
			<div className={`skeleton ${theme == 'dark' ? 'bg-[#2d3535] text-white': 'bg-[#FBFBFB] text-black'}`}>
				<div className="title"></div>
				<div className="info"></div>
				<div className="info"></div>
				<div className="skeleton-img">
					<div></div>
					<div></div>
				</div>
			</div>
			<div className={`skeleton ${theme == 'dark' ? 'bg-[#2d3535] text-white': 'bg-[#FBFBFB] text-black'}`}>
				<div className="title"></div>
				<div className="info"></div>
				<div className="info"></div>
				<div className="skeleton-img">
					<div></div>
					<div></div>
				</div>
			</div>
			<div className={`skeleton ${theme == 'dark' ? 'bg-[#2d3535] text-white': 'bg-[#FBFBFB] text-black'}`}>
				<div className="title"></div>
				<div className="info"></div>
				<div className="info"></div>
				<div className="skeleton-img">
					<div></div>
					<div></div>
				</div>
			</div>
			<div className={`skeleton ${theme == 'dark' ? 'bg-[#2d3535] text-white': 'bg-[#FBFBFB] text-black'}`}>
				<div className="title"></div>
				<div className="info"></div>
				<div className="info"></div>
				<div className="skeleton-img">
					<div></div>
					<div></div>
				</div>
			</div>
			<div className={`skeleton ${theme == 'dark' ? 'bg-[#2d3535] text-white': 'bg-[#FBFBFB] text-black'}`}>
				<div className="title"></div>
				<div className="info"></div>
				<div className="info"></div>
				<div className="skeleton-img">
					<div></div>
					<div></div>
				</div>
			</div>
			<div className={`skeleton ${theme == 'dark' ? 'bg-[#2d3535] text-white': 'bg-[#FBFBFB] text-black'}`}>
				<div className="title"></div>
				<div className="info"></div>
				<div className="info"></div>
				<div className="skeleton-img">
					<div></div>
					<div></div>
				</div>
			</div>
			<div className={`skeleton ${theme == 'dark' ? 'bg-[#2d3535] text-white': 'bg-[#FBFBFB] text-black'}`}>
				<div className="title"></div>
				<div className="info"></div>
				<div className="info"></div>
				<div className="skeleton-img">
					<div></div>
					<div></div>
				</div>
			</div>
			<div className={`skeleton ${theme == 'dark' ? 'bg-[#2d3535] text-white': 'bg-[#FBFBFB] text-black'}`}>
				<div className="title"></div>
				<div className="info"></div>
				<div className="info"></div>
				<div className="skeleton-img">
					<div></div>
					<div></div>
				</div>
			</div>
			<div className={`skeleton ${theme == 'dark' ? 'bg-[#2d3535] text-white': 'bg-[#FBFBFB] text-black'}`}>
				<div className="title"></div>
				<div className="info"></div>
				<div className="info"></div>
				<div className="skeleton-img">
					<div></div>
					<div></div>
				</div>
			</div>
			<div className={`skeleton ${theme == 'dark' ? 'bg-[#2d3535] text-white': 'bg-[#FBFBFB] text-black'}`}>
				<div className="title"></div>
				<div className="info"></div>
				<div className="info"></div>
				<div className="skeleton-img">
					<div></div>
					<div></div>
				</div>
			</div>
			<div className={`skeleton ${theme == 'dark' ? 'bg-[#2d3535] text-white': 'bg-[#FBFBFB] text-black'}`}>
				<div className="title"></div>
				<div className="info"></div>
				<div className="info"></div>
				<div className="skeleton-img">
					<div></div>
					<div></div>
				</div>
			</div>
			<div className={`skeleton ${theme == 'dark' ? 'bg-[#2d3535] text-white': 'bg-[#FBFBFB] text-black'}`}>
				<div className="title"></div>
				<div className="info"></div>
				<div className="info"></div>
				<div className="skeleton-img">
					<div></div>
					<div></div>
				</div>
			</div>

		</div>


	);
}

export default DomainListSkeletons;
