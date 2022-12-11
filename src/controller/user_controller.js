import { getConnection } from "../config/database.js";
import { CHECKEMAIL, REGISTER } from "../model/users.js";
import { v4 as uuidv4 } from "uuid";
import {
  comparePassword,
  generateToken,
  genPassword,
} from "../middleware/auth.js";
import UploadImage from "../config/cloudinary.js";

//  Create register 
export const Register_Controller = (req, res) => {
  const con = getConnection();
  try {
    const { fname, lname, email, password, position, imagePf } = req.body;
    if (!fname) return res.json({ msg: "ກະລຸນາໃສ່ຊື່ຂອງເຈົ້າ" });
    if (!lname) return res.json({ msg: "ກະລຸນາໃສ່ນາມສະກຸນຂອງເຈົ້າ" });
    if (!email) return res.json({ msg: "ກະລຸນາໃສ່ email ຂອງເຈົ້າ" });
    if (!password) return res.json({ msg: "ກະລຸນາໃສ່ລະຫັດຜ່ານຂອງເຈົ້າ" });
    if (!position) return res.json({ msg: "ກະລຸນາເລືອກຕຳແໜ່ງຂອງເຈົ້າ" });

    // Check user regist 
    con.query(CHECKEMAIL, [email], async (err, result) => {
      if (err) throw err;
      if (result === undefined || result.length > 0) {
        return res.json({ msg: "ມີບັນຊີຜູ້ໃຊ້ນີ້ແລ້ວ" });
      } else {
        const uid = uuidv4();
        const getPassword = await genPassword(password);
        const image = await UploadImage(imagePf);
        const values = [
          [uid, fname, lname, email, getPassword, position, image],
        ];
        con.query(REGISTER, [values], (err, resDate) => {
          if (err) throw err;
          if (resDate.affectedRows == 0)
            return res.json({ msg: "ບໍ່ສາມາດສະໝັກສະມາຊິກໄດ້" });
          const token = generateToken(uid);
          return res.json({
            type: "success",
            msg: "ສ້າງສະມາຊິກສຳເຫຼັດ",
            success: true,
            token: token,
          });
        });
      }
    });
  } catch (error) {
    return console.log(error);
  }
};

//  Login user 

export const Login_Controller = (req, res) => {
  try {
    const con = getConnection();
    const { email, password } = req.body;
    if (!email) return res.json({ msg: "ກະລຸນາໃສ່ Email ຂອງເຈົ້າ" });
    if (!password) return res.json({ msg: "ກະລຸນາໃສ່ລະຫັດຜ່ານຂອງເຈົ້າ" });
    // Check user login 
    con.query(CHECKEMAIL, [email], async (err, result) => {
      if (err) throw err;
      if (result === undefined || result.length <= 0)
        return res.json({ msg: "ບໍ່ມີບັນຊີຜູ້ໃຊ້ນີ້" });
      const checkpassword = await comparePassword(password, result[0].password);
      if (!checkpassword) return res.json({ msg: "ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ" });
      const token = generateToken(result[0].user_id);
      return res.json({
        type: "success",
        msg: "ເຂົ້າສູ່ລະບົບສຳເຫຼັດ",
        token: token,
      });
    });
  } catch (error) {
    return console.log(error);
  }
};
