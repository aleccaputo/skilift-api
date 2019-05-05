import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    firstName: String,
    lastName: String
});

userSchema.statics.findByUsername = async function(username){
    return this.findOne({username})
};

const User = mongoose.model('User', userSchema);

export default User;