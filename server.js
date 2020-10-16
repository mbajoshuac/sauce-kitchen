const app = require('./app')
const mongoose = require('mongoose');

const DB_LOCAL = "mongodb://127.0.0.1:27017/sauce_kitchen_db"
mongoose.connect(DB_LOCAL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connection Successful');
}).catch((err) => {
    console.log(err);
})



const port = 8000
app.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
})