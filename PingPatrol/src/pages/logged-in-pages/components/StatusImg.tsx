import { memo } from "react";
import upStatus from "../../../assets/arrow_up.svg";
import downStatus from "../../../assets/arrow_down.svg";
import syncStatus from "../../../assets/sync.svg";
import darkSync from '../../../assets/sync_dark.svg'
import {  lastUpdateType } from "../../../types/MainTypes";
import { useThemeStore } from "../../../Store/useTheme";

function StatusImg({lastUpdate}: {lastUpdate: lastUpdateType}) {
	const theme = useThemeStore((state) => state.theme)

	if (lastUpdate?.alive == true && lastUpdate?.endCurrentStatus){
		return (
			<img
				src={upStatus}
				className="absolute w-8"
				alt="status"
				title={`true to: ${new Date(lastUpdate.endCurrentStatus)}`}
			/>
		);
	}
	else if (!lastUpdate?.alive && lastUpdate?.endCurrentStatus){
		return (
			<img
				src={downStatus}
				className="absolute w-8"
				alt="status"
				title={`true to: ${new Date(lastUpdate?.endCurrentStatus)}`}
			/>
		);
	}
	else {
		return (
			<img
				src={theme == 'dark' ? syncStatus : darkSync}
				className="absolute w-8"
				alt="status"
				title={`syncing 🔄`}
			/>
		);
	}
}

export default memo(StatusImg);
