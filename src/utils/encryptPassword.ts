import bcrypt from "bcrypt";

export function encryptPassword(string: string) {
  return bcrypt.hash(string, 10);
}
export function decryptPassword(
  currentPassword: string,
  databasePassword: string
) {
  return bcrypt.compare(currentPassword, databasePassword);
}
