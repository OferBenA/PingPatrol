import express from "express";
import { v4 as uuidv4 } from "uuid";
import { UserModel } from "../models/users.model";

const usersRouter = express.Router();

usersRouter.put("/register", async (req, res) => {
	const { email, userName, password } = req.body;
	console.log(req.body);
	const user = await UserModel.findOne({
		$or: [{ email }, { userName }],
	});
	// res.status(200).send('test!');
	if (user) {
		if (user.userName == userName) {
			res.status(400).send("username already in use" );
            return;
		}
		 if (user.email == email) {
			res.status(400).send("email already in use");
            return;
		}
        //  else {
		// 	res.status(201).send("User registered successfully!");
        //     return;
		// }
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

export default usersRouter;
