import {Schema, model} from 'mongoose'
import TUser from './user.interface';
import bcrypt from "bcrypt";
import config from '../../config';


const userSchema = new Schema<TUser>({
id: {
    type: String,
    required: true,
},
password:{
    type: String,
    required: true,
},
needsPasswordChange:{
    type: Boolean,
    default: true,
},
role:{
    type: String,
    enum: ["admin","faculty", "student"],
},
status:{
    type: String,
    enum: ["in-progress","blocked"],
    default: "in-progress"
},
isDeleted:{
    type: Boolean,
    default:false,
},
},
{
    timestamps: true
});


userSchema.pre('save', async function ( next ) {
    const user = this;

    // hashing password before save into db
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    );

    next();
})

userSchema.post('save', function ( doc, next){
    // set empty string after saving hash password
    doc.password = '';

    next();
})
export const UserModel = model<TUser>("Users", userSchema)