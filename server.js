const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const app = require('./app')
const mongoose = require('mongoose');



mongoose.connect(process.env.databaseURI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connection Successful');
}).catch((err) => {
    console.log(err);
})


// Server Listening to port
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
})