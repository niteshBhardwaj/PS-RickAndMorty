import mongoose, {Schema} from 'mongoose';

let CharacterSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
      type: String,
      required: [true, 'name field is required'],
      trim: true,
      text: true
    },
    status: {
        type: String,
        required: true,
    },
    species: {
        type: String
    },
    type: {
        type: String
    },
    gender: {
        type: String
    },
    origin: {
        name: {
            type: String
        }
    },
    location: {
        name: {
            type: String
        }
    },
    image: {
        type: String
    },
    created: {
        type: Date,
        required: true
    }
})

export default mongoose.model('character', CharacterSchema);