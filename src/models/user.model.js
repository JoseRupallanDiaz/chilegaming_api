import mongoose from 'mongoose';

const roles = {
    admin: "Admin",
    user: "User"
}

const userSchema = new mongoose.Schema({
        email:{
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required: true,
        },
        fullname:{
            type: String,
            required: true,
        },
        role:{
            type: String,
            default: roles.user,
        }
    }
);

const userModel = mongoose.model('User', userSchema);

export default userModel;