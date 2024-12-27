import moongoose from "mongoose";

const connectDBUsingMoongoose = async () => {
    try {
        const conn = await moongoose.connect(process.env.DB_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default connectDBUsingMoongoose;