const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://iNotebook:gRvIo6aVt4BxHR5V@cluster0.2ebgj.mongodb.net/inotebook?retryWrites=true&w=majority';
const mongoURI = 'mongodb+srv://iNotebook:fgms8NYedGLPUI8r@cluster0.5somuo4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// iNotebook

const connectToMongo = () => mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { console.log("Connected to DB"); }).catch((error) => { console.log(error); });

module.exports = connectToMongo;

// fgms8NYedGLPUI8r