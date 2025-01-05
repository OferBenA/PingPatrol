import { memo } from "react";
import upStatus from "../../../assets/arrow_up.svg";
import downStatus from "../../../assets/arrow_down.svg";
import syncStatus from "../../../assets/sync.svg";

function StatusImg({
	status,
	date,
}: {
	status: boolean | undefined;
	date: number | undefined;
}) {
	if (status == true && date)
		return (
			<img
				src={upStatus}
				className="absolute w-8"
				alt="status"
				title={`true to: ${new Date(date)}`}
			/>
		);
	else if (status == false && date)
		return (
			<img
				src={downStatus}
				className="absolute w-8"
				alt="status"
				title={`true to: ${new Date(date)}`}
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
