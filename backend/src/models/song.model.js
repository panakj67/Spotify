import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    artist:{
        type: String,
        required: true,
        trim: true
    },
    poster:{ 
        type: String,
        default: "https://images.unsplash.com/photo-1690203261438-3fad3cca5a4f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    audio:{
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

// Add text indexes for better search performance
songSchema.index({ title: 'text', artist: 'text' });

const songModel = mongoose.model("song", songSchema);

export default songModel;