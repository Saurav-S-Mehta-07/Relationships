const mongoose = require("mongoose");
const { Schema } = mongoose;

main().then(()=>{
    console.log("mongoDb connection successful");
}).catch(err=>console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationshipDB');
}

const orderSchema = new Schema({
  item : String,
  price : Number,  
});
const Order = mongoose.model("order",orderSchema);
const addOrders = async()=>{
    let res = await Order.insertMany([
        {item:"Samosa", price: 30},
        {item: "chips", price: 50},
        {item: "Chocolate", price: 50}
    ]);
    console.log(res);
}
addOrders();