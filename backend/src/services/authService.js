import { findUser } from "../models/authModel.js";
import bcrypt from "bcrypt";

export async function login({ email, password }) {
  const user = await findUser(email);

  if (!user) {
    throw new Error("Utilisateur n existe pas");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Mot de passe incorrecte");
  }

  return {
    id: user.id,
    email: user.email
  };
}
