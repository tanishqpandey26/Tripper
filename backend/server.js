const express =require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const CreateItineraryRouter = require('./Routes/CreateItineraryRouter');

require('dotenv').config()
require('./Models/db');
const port = process.env.port ||  8080;


app.get('/ping', (req,res)=>{
   res.send('PONG')
})

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);
app.use('/api/itineraries', CreateItineraryRouter );


app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})