const mongoose = require("mongoose");
const { Schema } = mongoose;

main().then(()=>{
    console.log("mongoDb connection successful");
}).catch(err=>console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationshipDB');
}

const userSchema = new Schema({
      username : String,
      addresses : [
        {
            location : String,
            city : String,
        },
      ],
});

const User = mongoose.model("user",userSchema);

const addUsers = async()=>{
    let user1 = new User({
        username: "Suraj Mehta",
        addresses : [
            {location:"221B baker street", city : "London"},
        ]
    });
    user1.addresses.push({location:"49T street", city:"US"});
   let result =  await user1.save();
   console.log(result);
}

addUsers();