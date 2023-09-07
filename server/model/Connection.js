const mongoose = require('mongoose');

const main = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connection successful to MongoDB`);
        return connect;
    } catch (error) {
        console.log(`Error generated during building the connection: ${error}`);
        throw error; // Re-throw the error to handle it further if needed
    }
};

// main()
//     .then(() => console.log("Success"))
//     .catch(() => console.log("Failed"));

module.exports = main;
