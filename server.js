import app from "./src/index.js"
import ConnectionDB from "./src/config/db.js"
ConnectionDB()
app.listen(3000,()=>{
    console.log("server running port ",3000)
})