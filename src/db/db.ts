import mongoose, {model, Mongoose, Schema, Types} from "mongoose";
import dotenv from 'dotenv';

dotenv.config()
mongoose.connect(process.env.MONGO_URL!)

const UserSchema = new Schema({
    username: {type: String, required: true},
    password: String
})

const contentTypes = ['image', 'video', 'article', 'audio']
const ContentSchema = new Schema({
    link: {type: String, required: true},
    type: {type: String, enum:contentTypes, required: true},
    title: {type: String, required: true},
    tags: [{type: Types.ObjectId, ref: 'Tags'}],
    userId: {
        type: Types.ObjectId, 
        ref: 'Users', 
        required:true, 
        validate: async (value : Types.ObjectId) : Promise<void | Error> => {
        const user = await Users.findById(value);
        if(!user){
            throw new Error ("User does not exist")
        }
    }}
})

const TagSchema = new Schema({
    title: {type: String, required:true }
})

const LinkSchema = new Schema({
    hash: {type: String, required: true},
    userId: {type: Types.ObjectId, ref: 'Users', required: true}
})

const Users = model("Users", UserSchema)
const Content = model("Content", ContentSchema)
const Tags = model("Tags", TagSchema)
const Links = model("Links", LinkSchema)

module.exports = {
    Users,
    Content,
    Tags,
    Links
}