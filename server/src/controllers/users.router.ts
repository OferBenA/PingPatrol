import express from "express";
import { v4 as uuidv4 } from "uuid";
import { UserModel } from "../models/users.model";
import jwt from "jsonwebtoken";
import Utils from "../services/utils.service";
import { ACTIVE_USERS_SESSIONS_AND_TOKENS } from "../services/sessions.management.service";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const usersRouter = express.Router();

usersRouter.put("/register", async (req, res) => {
	const { email, userName, password } = req.body;
	const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
	const user = await UserModel.findOne({
		$or: [{ email }, { userName }],
	});
	// res.status(200).send('test!');
	if (user) {
		if (user.userName == userName || user.email == email) {
			res.status(400).send("Username or Email are already in use");
			return;
		}
	}
	let hashedPass;
	try {
		hashedPass = await bcrypt.hash(password, saltRounds);
	} catch (error) {
		console.log("cannot perform bcrypt operation");
		console.log(error);
		res.status(500).send("internal server error");
		return;
	}

	const createdDate = new Date();
	const userId = uuidv4();
	const newUser = new UserModel({
		userId,
		userName,
		password: hashedPass,
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
			user = await UserModel.findOne({ email: emailOrUsername });
		} else {
			user = await UserModel.findOne({ userName: emailOrUsername });
		}
		let passwordVerified;

		if (user) {
			try {
				passwordVerified = await bcrypt.compare(password, user?.password as string);

			} catch (error) {
				console.log("cannot perform bcrypt operation");
				console.log(error);
				res.status(500).send("internal server error");
			}
			if (passwordVerified) {
				const payload = {
					email: user.email,
					userId: user.userId,
					username: user.userName,
				};
				const accessToken = Utils.generateAccessToken(payload);
				const refreshToken = jwt.sign(
					payload,
					process.env.REFRESH_TOKEN_SECRET as string
				);
				const tokens = { accessToken, refreshToken };
				ACTIVE_USERS_SESSIONS_AND_TOKENS[user.userId as string] = {
					...tokens,
					lastActivity: Date.now(),
				};

				res.status(200).json(tokens);
				return;
			}
		}
		res.status(404).send(`bad combination of email and password`);
	}
);
usersRouter.get("/token", (req, res) => {
	const authorizationHeader = req.headers.authorization; // 'Bearer <refresh-token>'
	if (typeof authorizationHeader == "string") {
		const refreshToken = authorizationHeader.split(" ")?.[1];
		if (refreshToken) {
			try {
				const userData = jwt.verify(
					refreshToken,
					process.env.REFRESH_TOKEN_SECRET as string
				);
				if (typeof userData == "object") {
					const session = ACTIVE_USERS_SESSIONS_AND_TOKENS[userData.userId];
					// Checking if there's an active session for the user AND the accessToken that is allowed in this session is really the accessToken that was provided in the request
					if (session && session.refreshToken == refreshToken) {
						const accessToken = Utils.generateAccessToken(userData);
						session.accessToken = accessToken;
						res.json({ accessToken });
						return;
					}
				}
			} catch (err) {}
		}
	}
	res.status(401).send("Unauthorized! please log in!");
});

export default usersRouter;
