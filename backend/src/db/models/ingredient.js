import mongoose, { Schema } from "mongoose";

const ingredientSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: String, required: true },
});

export const User = mongoose.model("user", ingredientSchema);
