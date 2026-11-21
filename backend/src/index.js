import dotenv from "dotenv";

import { app } from "./app.js";
import { initDatabase } from "./db/init.js";

dotenv.config();
const HOST = process.env.HOST;
const PORT = process.env.PORT;

await initDatabase();

app.listen(PORT, HOST, () => {
    console.info(`express server running on http://${HOST}:${PORT}`);
});
