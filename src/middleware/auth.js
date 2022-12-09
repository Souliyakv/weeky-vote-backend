import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { CHECKUSERID } from "../model/users.js";
import { getConnection } from "./database.js";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const SALT_I = parseInt(process.env.SALT);

//  gen token ສ້າງ token

export const generateToken = (data) => {
  return jwt.sign({ data }, SECRET_KEY, { expiresIn: "7d" });
};

// verifyTokens ກວດສອບ token

export const verifyTokens = (data) => {
  const decodeToken = jwt.verify(data, SECRET_KEY, (err, decode) => {
    return decode;
  });
  return decodeToken;
};

// get user_id ດືງ user_id ອອກມາ

export const authID = (data) => {
  const dataRes = verifyTokens(data);
  const USER_id = dataRes.data;
  return USER_id;
};

// check user  ກວດສອບວ່າຜູ້ໃຊ້ນີ້ມີໂຕຕົນຫຼືບໍ່

export const CheckAuth = (req, res, next) => {
  const data= req.headers["token"];
  if (!data) return res.status(500).json({ msg: "Please login" });

  const dataRes = verifyTokens(data);

  if (dataRes === undefined || dataRes.length <= 0) {
    return res.status(500).json({ msg: "Please login" });
  }
  const USER_ID = dataRes.data;
  
  const con = getConnection();
  con.query(CHECKUSERID, [USER_ID], (err, result) => {
    if (err) throw err;
    if (result === undefined || result.length <= 0) {
      return res.json({ msg: "ບໍ່ມີບັນຊີຜູ້ໃຊ້ນີ້" });
    } else {
      next();
    }
  });
};

// gen password ສ້າງລະຫັດຜ່ານດ້ວຍວິທີການເຂົ້າລະຫັດ

export const genPassword = async (password) => {
  const saltHash = await bcrypt.genSalt(SALT_I);
  const hashPassword = await bcrypt.hash(password, saltHash);
  return hashPassword;
};

//  check password ກວດສອບລະຫັດຜ່ານວ່າຖືກຕ້ອງຫຼືບໍ່

export const comparePassword = async (loginPassword, password) => {
  return await bcrypt.compare(loginPassword, password);
};
