const app = require('./app')
const {serverPort} = require('./secret')

app.listen(serverPort, () => {
    console.log('Server is running at http://localhost:3001');
})