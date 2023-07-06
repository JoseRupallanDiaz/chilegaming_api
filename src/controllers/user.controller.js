import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {KEY} from '../config/enviorment.js';

async function login(req, res){
    try {
        const user = await userModel.findOne({email: req.body.email}).exec();
        if(user == null){
            return res.status(400).send("User does not exists.");
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(isMatch){
            console.log("User "+user.email+" verified successfully, generating token...");
            const token = jwt.sign({
                user: {
                    id: user._id,
                    email: user.email,
                    expiration: Date.now() + 600 * 1000,
                }
            }, KEY);
            console.log("Sending token.")
            return res.status(200).send({token});
        } else {
            return res.status(400).send("Invalid password.");
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send({error: e.message});
    }
}

async function register(req, res){
    console.log("Registering new user...");
    try {
        await userModel.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            fullname: req.body.fullname,
        });
        console.log("User registered successfully.");
        return res.status(201).send("User registered successfully.");
    } catch (e) {
        console.log("Failed to register new user.");
        return res.status(500).send({error: e.message});
    }
}

async function changePassword(req, res) {
    try {
        const user = await getUserById(req.token.id);
        const verifyPassword = await bcrypt.compare(req.body.oldPassword, user.password);
        if(verifyPassword){
            const newPassword = bcrypt.hashSync(req.body.newPassword, 10);
            userModel.findByIdAndUpdate(req.token.id, {password: newPassword});
            return res.status(200).send("Password updated.");
        } else {
            return res.status(400).send({error: "Passwords does not match."});
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send({error: e});
    }
}

function verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const payload = jwt.verify(token, KEY);
        if (Date.now() > payload.expiration) {
            return res.status(401).send({error: "token expired."});
        } else {
            req.token = payload;
            next();
        }
    } catch (e) {
        return res.status(401).send({error: e.message});
    }
}

async function getUserById(id){
    const user = await userModel.findById(id).exec();
    return user;
}

export {login, register, getUserById, changePassword, verifyToken};