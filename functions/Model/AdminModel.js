import { Schema, model } from "mongoose";

/**
 * @deprecated
 */

const adminSchema = new Schema(
    {
      login: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
    },
    {
      timestamps: true,
    },
);

const Admin = model("Admin", adminSchema);

export default Admin;
