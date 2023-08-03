import userModel from "../models/user.js";

export default class UserManager{
    createUser=(user)=>{
        return userModel.create(user);
    }

    createCart = async (cart) => {
        try {
            const { uid, cid } = cart;
            const user = await this.getUserById(uid);
            user.carts.push(cid);
            await user.save();
            return user;
        } catch (error) {
            return error
        }
    }

    getUsers=()=>{
        return userModel.find().lean();
    }

    getUserByEmail=(email)=>{
        return userModel.findOne({email});
    }

    getUserById=(id)=>{
        return userModel.findOne({ _id: id }).lean();
    }

    updatePassword=(email,newHasedPassword)=>{
        return userModel.updateOne({email},{$set:{password:newHasedPassword}});
    }
}
