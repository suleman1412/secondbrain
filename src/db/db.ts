import mongoose, {model, Schema, Types} from "mongoose";
import dotenv from 'dotenv';

dotenv.config()
mongoose.connect(process.env.MONGO_URL!)

const UserSchema = new Schema({
    username: {type: String, required: true, unique:true},
    password: { type: String, required: true }
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
        const user = await UsersModel.findById(value);
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

export const UsersModel = model("Users", UserSchema)
export const ContentModel = model("Content", ContentSchema)
export const TagsModel = model("Tags", TagSchema)
export const LinksModel = model("Links", LinkSchema)
