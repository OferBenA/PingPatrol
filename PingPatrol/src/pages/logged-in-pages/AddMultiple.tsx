import {
	memo,
	useCallback,
	useMemo,
	useState,
} from "react";
import { axiosClient } from "../../axiosClient";
import axios from "axios";
import {
	AllCommunityModule,
	ModuleRegistry,
	colorSchemeDark,
	colorSchemeLight,
	themeQuartz,
} from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../../Store/useTheme";
import { IpsToAddType } from "../../types/MainTypes";
import { ipStringToObj } from "../../services/utils.service";

type IRow = {
	ipAddr: string;
	name: string;
	isFavorite: boolean;
};
function AddMultiple() {
	ModuleRegistry.registerModules([AllCommunityModule]);

	// const { userData } = useUserContext();
	const [ipData, setIpData] = useState<IpsToAddType[] | null>();
	const [ipDataRaw, setIpDataRaw] = useState<string>("");
	const [stage, setStage] = useState<"first" | "second">("first");
	const navigation = useNavigate();
	const theme = useThemeStore((state) => state.theme);
	const [colDefs] = useState<ColDef<IRow>[]>([
		{ field: "ipAddr" },
		{ field: "name", editable: true },
		{ field: "isFavorite", editable: true },
	]);
	const defaultColDef = {
		flex: 1,
	};
	const myThemeDark = useMemo(
		() => themeQuartz.withPart(colorSchemeDark),
		[theme]
	);
	const myThemeLight = useMemo(
		() => themeQuartz.withPart(colorSchemeLight),
		[theme]
	);

	const gridOptions = useMemo(
		() => ({
			theme: theme == "dark" ? myThemeDark : myThemeLight,
		}),
		[theme]
	);

	const handleTextarea = () => {
		const textareaString = document.querySelector(
			"#textarea"
		) as HTMLTextAreaElement;
		if (textareaString) {
			const stringArrFormatted = ipStringToObj(textareaString.value);
			setIpData(stringArrFormatted);
			setIpDataRaw(textareaString.value);
		}
	};

	const handleStage = () => {
		setStage("second");
	};

	const handleSubmit = useCallback(
		async () => {
			try {
				const response = await axiosClient.put("/api/domains/createMultiple", {...ipData});
				alert(response.data.message);
				navigation("/");
			} catch (err: unknown) {
				if (axios.isAxiosError(err)) {
					console.log(err);
					alert(`unable to create domain: ${err.response?.data}`);
				}
			}
		},
		[ipData]
	);

	return (
		<div
			className={`pt-48 sm:pl-44 w-screen min-h-screen flex justify-center items-start `}
		>
			<div
				className={`shadow-xl p-4 rounded-3xl text-xl ${
					theme == "dark"
						? "bg-[#2d3535] text-white"
						: "bg-[#FBFBFB] text-black"
				}`}
			>
				<h1 className="text-2xl mb-3"> Add multiple items</h1>
				{stage == "first" ? (
					<div className="flex justify-center items-center flex-col gap-2">
						<p className="text-sm">see format to add IPs in text area</p>
						<p className="text-sm">ip, name, isFavorite</p>

						<textarea
							className={`p-1 rounded-md text-sm ${
								theme == "dark"
									? "bg-[#3f4949] text-white"
									: "bg-[#d3d2d2] text-black"
							}`}
							placeholder="10.10.10.10 , name1 , false &#10;20.20.20.20 , name1 , false"
							name="Text1"
							id="textarea"
							cols={40}
							rows={10}
							value={`${ipDataRaw}`}
							onChange={handleTextarea}
						></textarea>

						<input
							onClick={handleStage}
							className="bg-slate-200 text-black mt-6 px-5 py-2 rounded-xl hover:cursor-pointer"
							type="button"
							value="show Table"
						/>
					</div>
				) : (
					<div className="flex justify-center items-center flex-col gap-2">
						data verification
						{ipData ? (
							<div className="max-sm:w-[calc(100vw-50px)] w-[calc(100vw-400px)] h-[500px]">
								<AgGridReact
									gridOptions={gridOptions}
									rowData={ipData}
									columnDefs={colDefs}
									defaultColDef={defaultColDef}
								/>
							</div>
						) : (
							<div className="">nothing to show, no IPs were added</div>
						)}
						<div className="flex justify-center align-middle gap-3">
							<input
								className="bg-slate-200 text-black mt-6 px-5 py-2 rounded-xl hover:cursor-pointer"
								onClick={() => setStage("first")}
								type="button"
								value="go back"
							/>
							<input
								className="bg-slate-200 text-black mt-6 px-5 py-2 rounded-xl hover:cursor-pointer"
								onClick={handleSubmit}
								type="submit"
								value="submit"
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default memo(AddMultiple);
