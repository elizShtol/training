const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

router.post(
  "/register",
  [
    check("email", "Некорректный email").isLength({ min: 6 }),
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    console.log("CHE",req.body )
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: "Некорректный ввод" });
      }
      // console.log("USER",User)
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      // console.log("CA")
      if (candidate) {
        return res.status(400).json({ message: "Такой юзер есть" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: "пользователь создан" });
    } catch (e) {
      res.status(500).json({ message: e });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Введите корректный email"),
    check("password", "Введите пароль").exists(),
  ],
  async (req, res) => {
    try {
      // console.log("CHE")
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({
            errors: errors.array(),
            message: "Некорректные данные при входе",
          });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "Такой пользователь не найден" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "Пароль не правильный" });
      }

      const token = jwt.sign(
        { userId: user.id, userName: email },
        config.get("jwtSecret"),
        { expiresIn: "1h" }
      );
      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "что-то пошло не так" });
    }
  }
);

module.exports = router;
