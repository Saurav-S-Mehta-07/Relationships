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

const customerSchema = new Schema({
      name : String,
      orders : [
        { type: Schema.Types.ObjectId, ref: 'order' }
      ]
});

const Order = mongoose.model("order",orderSchema);

const Customer = mongoose.model("customer",customerSchema);

const addCustomers= async()=>{
    let cust1 = new Customer({
        name : "Mayank Verma",
    });

    let order1 = await Order.findOne({item : "Samosa"});
    let order2 = await Order.findOne({item : "chips"});

    cust1.orders.push(order1);
    cust1.orders.push(order2);

    let res = await cust1.save();
    console.log(res);
}
// addCustomers();

const findCustomer = async ()=>{

    //in this orders : objectId of order
    // let res = await  Customer.find();

    //in this orders : full details of order
    let res = await Customer.find().populate("orders"); //here orders feild name
    console.log(res[0]); //orders: [objectId]
}
findCustomer();

const addOrders = async()=>{
    let res = await Order.insertMany([
        {item:"Samosa", price: 30},
        {item: "chips", price: 50},
        {item: "Chocolate", price: 50}
    ]);
    console.log(res);
}
// addOrders();