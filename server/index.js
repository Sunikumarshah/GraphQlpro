const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const cors = require('cors');  
require('dotenv').config();
// Import CORS middleware


const app = express();
app.use(cors({
    origin: 'origin: process.env.FRONTEND_URL' // Allow only this frontend origin
}));
// MongoDB connection
mongoose.connect(process.env.DATA_BASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// GraphQL middleware
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// Start the server
app.listen(4000, () => {
    console.log('Server is running on port 4000...');
});
// shahsunilkumar373
// IlKUikAPQ6v9McuB