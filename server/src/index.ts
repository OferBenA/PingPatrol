import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { request, response } from "express";
import mongoose from "mongoose";
import userRouter from "./controllers/users.router";
import domainsRouter from "./controllers/domains.router";
import { authMiddleware } from "./middlewares/authMiddleware";
import ping from 'ping';
import { DomainModel } from "./models/domain.model";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/";

const mongoConnect = async () => {
	try {
		await mongoose.connect(mongoURI);
		console.log(`mongoDB is connected to: ${mongoURI}`);
	} catch (error) {
		console.error(error);
	}
};
mongoConnect()

app.use("/public", express.static("./views/assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
	cors({
		origin: "http://localhost:5173", // Allow requests from your frontend
	})
);

app.get(`/`, (req, res) => {
	const userAgent = req.headers["user-agent"];
	console.log(userAgent);
	res.status(200).json({ status: "great success" });
});

app.use("/api/users", userRouter);
app.use("/api/domains", authMiddleware, domainsRouter);

const domainLogger = async () => {
	console.log(`hello world`);
  const domains = await DomainModel.find();
  console.log(domains)


};

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
	domainLogger();
});
