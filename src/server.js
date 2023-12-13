const app = require('./app')
const {serverPort} = require('./secret')
const connectDB = require("./config/db");

app.listen(serverPort, async () => {
    console.log('Server is running at http://localhost:3001');
    await connectDB()
})