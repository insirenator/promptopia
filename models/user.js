import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
  },
  image: {
    type: String,
  }
});

/*
  In a traditional Express Server, which is always running, you can
  create a model and just export it.
  But in a serverless backend, we need to check if the model is
  already registered with the database. "models" allows us to achieve
  that.
*/

// If the model is already registered, return it else create one.

const User = models.User || model("User", UserSchema);

export default User;