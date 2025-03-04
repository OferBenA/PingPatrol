import {
	TextareaHTMLAttributes,
	memo,
	useCallback,
	useRef,
	useState,
} from "react";
import { axiosClient } from "../../axiosClient";
import axios from "axios";
import { useUserContext } from "../../Contexts/User-Context";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../../Store/useTheme";
import { IpsToAddType } from "../../types/MainTypes";
import { ipStringToObj } from "../../services/utils.service";

function AddMultiple() {
	const { userData } = useUserContext();
	const ipData = useRef<IpsToAddType[]>();
	const [ipDataRaw, setIpDataRaw] = useState<string>("");
	const [stage, setStage] = useState<"first" | "second">("first");
	const navigation = useNavigate();
	const theme = useThemeStore((state) => state.theme);

	const handleTextarea = () => {
		const textareaString = document.querySelector(
			"#textarea"
		) as HTMLTextAreaElement;
		if (textareaString) {
			const stringArrFormatted = ipStringToObj(textareaString.value)
			setIpDataRaw(textareaString.value)
			ipData.current = stringArrFormatted;
		}
	};
	const handleStage = () =>{
		console.log(ipData.current)
		setStage('second')

	}

	const handleSubmit = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			try {
				const response = await axiosClient.put("/api/domains/create", {});
				alert(response.data.message);
				navigation("/");
			} catch (err: unknown) {
				if (axios.isAxiosError(err)) {
					console.log(err);
					alert(`unable to create domain: ${err.response?.data}`);
				}
			}
		},
		[]
	);

	return (
		<div
			className={`pt-48 pl-44 w-screen min-h-screen flex justify-center items-start `}
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
						<p className="text-sm">
							see format to add IPs in input placeholder
						</p>
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
						<input
							className="bg-slate-200 text-black mt-6 px-5 py-2 rounded-xl hover:cursor-pointer"
							onClick={() => setStage("first")}
							type="button"
							value="go back"
						/>
					</div>
				)}

			</div>
		</div>
	);
}

export default memo(AddMultiple);
