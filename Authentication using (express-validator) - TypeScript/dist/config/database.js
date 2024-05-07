import { connect, disconnect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URL = process.env.MONGODB_URL;
// connect to database
async function dbConnect() {
    try {
        await connect(URL)
            .then(() => console.log("DB connected Succefull"))
            .catch((err) => {
            console.log(err);
            process.exit(1);
        });
    }
    catch (err) {
        console.log(err);
        throw new Error("Database connection Failed");
    }
}
// disconnect to database
async function disconnectFromDatabae() {
    try {
        await disconnect();
    }
    catch (err) {
        console.log(err);
        throw new Error("Could not disconnet to database");
    }
}
// export
export { dbConnect, disconnectFromDatabae };
//# sourceMappingURL=database.js.map