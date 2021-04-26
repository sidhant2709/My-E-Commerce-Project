const app = require('./app');

const connectDatabase = require('./configs/database');

const dotenv = require('dotenv');

// Handle the uncaught exceptions

process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`)
    console.log("Shutting down the server due to uncaught exceptions");
    process.exit(1)
})



// Setting up config file
dotenv.config({ path: 'backend/configs/config.env' })

//Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Listening to PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
});

//Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`)
    console.log("Shutting down the server due to unhandled Promise rejection")
    server.close(() => {
        process.exit(1)
    })
})