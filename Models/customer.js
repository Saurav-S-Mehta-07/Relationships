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

//Middleware 

// customerSchema.pre("findOneAndDelete", async()=>{
//     console.log("pre middleware");
// })

customerSchema.post("findOneAndDelete", async(customer)=>{
    if(customer.orders.length){
       let res =  await Order.deleteMany({_id: {$in : customer.orders}});
       console.log(res);
    }
})

const Order = mongoose.model("order",orderSchema);
const Customer = mongoose.model("customer",customerSchema);

const addCustomers= async()=>{
    let newCust = new Customer({
        name : "Karan Arjun",
    });

    let newOrder = new Order({
        item: "Burgur",
        price:100
    });

    newCust.orders.push(newOrder);
    
    await newCust.save();
    await newOrder.save();
    console.log("added new customer");
}
// addCustomers();

const deleteCustomer = async()=>{
    let res = await Customer.findByIdAndDelete('693aaee1203ff444aedbfd83');
    console.log(res);
}
deleteCustomer();

const findCustomer = async ()=>{

    //in this orders : objectId of order
    // let res = await  Customer.find();

    //in this orders : full details of order
    let res = await Customer.find().populate("orders"); //here orders feild name
    console.log(res[0]); //orders: [objectId]
}
// findCustomer();

const addOrders = async()=>{
    let res = await Order.insertMany([
        {item:"Samosa", price: 30},
        {item: "chips", price: 50},
        {item: "Chocolate", price: 50}
    ]);
    console.log(res);
}
// addOrders();