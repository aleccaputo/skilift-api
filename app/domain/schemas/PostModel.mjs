import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        username: String,
        firstName: String,
        lastName: String,
        destination: String,
        body: String,
        seatsLeft: Number,
    },
    {
        timestamps: true
    }
);

postSchema.statics.findByUsername = async function(username){
    return this.findOne({username})
};

const Post = mongoose.model('Post', postSchema);

export default Post;