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
    email : String
});

const postSchema = new Schema({
    content : String,
    likes : Number,
    user : {
        type : Schema.Types.ObjectId, ref : "user"
    }
});

const User = mongoose.model("user",userSchema);
const Post = mongoose.model("post",postSchema);

const addData = async()=>{
    let user1 = await User.findOne({username : "Krish"});
    let post2 = new Post({
        content : "Bye Bye!",
        likes : 9
    })

    post2.user = user1;
    await post2.save();
};
// addData();

async function findData(){
    let res = await Post.find().populate("user");
    console.log(res);
}

findData();
