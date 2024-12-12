import express from "express";
import { v4 as uuidv4 } from "uuid";
import { UserModel } from "../models/users.model";
import jwt from 'jsonwebtoken'
import Utils from "../services/utils.service";

const usersRouter = express.Router();
// const validateRequiredParams = (requaredFields: string[]) => {
//     return (req: express.Request, res: express.Response, next: express.NextFunction) =>{
//       const body = req.body;
//       const allFieldsExist = requaredFields.every((field:string) => field in body)
//       if(!allFieldsExist) {
//         res.status(400).send(`one of the required parameters [${requaredFields.join()}] is missing`);
//         return;
//       }
//       next();
//     }
//   }
usersRouter.put("/register", async (req, res) => {
	const { email, userName, password } = req.body;
	console.log(req.body);
	const user = await UserModel.findOne({
		$or: [{ email }, { userName }],
	});
	// res.status(200).send('test!');
	if (user) {
		if (user.userName == userName) {
			res.status(400).send("username already in use");
			return;
		}
		if (user.email == email) {
			res.status(400).send("email already in use");
			return;
		}
	}

	const createdDate = new Date();
	const userId = uuidv4();
	const newUser = new UserModel({
		userId,
		userName,
		password,
		email,
		createdDate,
	});
	await newUser.save();
	res.status(201).send("User registered successfully!");
});
usersRouter.post(
	"/login",
	Utils.validateRequiredParams(["emailOrUsername", "password"]),
	async (req, res) => {
		const { emailOrUsername, password } = req.body;
		let user;
		if (emailOrUsername.includes("@")) {
			user = await UserModel.findOne({ email: emailOrUsername, password });
		} else {
			user = await UserModel.findOne({ username: emailOrUsername, password });
		}
		if(user){
			const payload = { email: user.email, userId: user.userId, username: user.userName };
			const accessToken = Utils.generateAccessToken(payload);
			const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string)
			const tokens = {accessToken, refreshToken};
			res.status(200).json(tokens);
			return;
		}
		res.status(404).send(`bad combination of email and password`)
		// console.log(req.body)
		// res.send('asdasd')
	}
);

export default usersRouter;
