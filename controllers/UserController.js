import User from "../models/UserModel.js";
import Animal from "../models/AnimalModel.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ['id', 'name', 'email']
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};


export const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

export const Register = async (req, res) => {
  const {name, email, password, confPassword} = req.body;
  if(password != confPassword) return res.status(400).json({msg: "Password dan Confirmasi password tidak sama"});
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.status(200).json({msg: "registrasi berhasil"});
  } catch (error) {
    console.log(error.message);
  }
};

export const Login = async (req, res) => {
  try {
      const user = await User.findOne({
          where: {
              email: req.body.email
          }
      });

      if (!user) {
          return res.status(404).json({ msg: "Email tidak terdaftar" });
      }

      const match = await bcrypt.compare(req.body.password, user.password);

      if (!match) {
          return res.status(400).json({ msg: "Password salah" });
      }

      res.status(200).json({name: user.name, email: user.email });
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
  }
};


// Get all animals 
export const getAnimalChck = async (req, res) => {
  try {
      const response = await Animal.findAll();
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};
