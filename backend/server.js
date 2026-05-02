import app from './src/app.js';
import connectDatabase from './config/databse.js';
connectDatabase();
const port = 3000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
