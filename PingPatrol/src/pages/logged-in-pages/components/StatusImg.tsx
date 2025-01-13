import { memo } from "react";
import upStatus from "../../../assets/arrow_up.svg";
import downStatus from "../../../assets/arrow_down.svg";
import syncStatus from "../../../assets/sync.svg";
import {  lastUpdateType } from "../../../types/MainTypes";

function StatusImg({lastUpdate}: {lastUpdate: lastUpdateType}) {
	if (lastUpdate.alive == true && lastUpdate.endCurrentStatus)
		return (
			<img
				src={upStatus}
				className="absolute w-8"
				alt="status"
				title={`true to: ${new Date(lastUpdate.endCurrentStatus)}`}
			/>
		);
	else if (!lastUpdate.alive && lastUpdate.endCurrentStatus)
		return (
			<img
				src={downStatus}
				className="absolute w-8"
				alt="status"
				title={`true to: ${new Date(lastUpdate.endCurrentStatus)}`}
			/>
		);
	else {
		return (
			<img
				src={syncStatus}
				className="absolute w-8"
				alt="status"
				title={`syncing 🔄`}
			/>
		);
	}
}

export default memo(StatusImg);
