import mongoose from "mongoose"

mongoose.connect(process.env.STRING_CONNECT_DB);

let db = mongoose.connection;

export default db;