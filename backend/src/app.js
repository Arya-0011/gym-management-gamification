import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import logger from "./util/logger";
import responseHandler from "./util/response.handler";
import routes from "./api/routes/index";
import configs from "./config";
import connect from "./util/database.connection";

export const app = express();
const PORT = configs.port;
const MONGO_URI = configs.mongodb.uri;

// Register Middleware Chain
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Inject Response Handler
app.use((req, res, next) => {
	req.handleResponse = responseHandler;
	next();
});

// Root API Call
app.get("/", (req, res, next) => {
	res.send("<h2>Online Gym Management System</h2>");
	next();
});

// Start the Server
app.listen(PORT, () => {
	logger.info(`Project is runnin on ${PORT}`);
	connect();
	routes(app);
	logger.info(`API Server up and running on PORT ${PORT}`);
});
