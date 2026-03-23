import crypto from "crypto"

export function generateToken() {
  return crypto.randomBytes(6).toString("hex");
}