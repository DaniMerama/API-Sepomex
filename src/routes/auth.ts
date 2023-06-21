import { Router } from "express";

export const AuthRouter = () => {
  const authRouter = Router();
  const jwt = require("jsonwebtoken");
  const privateKey = process.env.JWT_SECRET;

  authRouter.post("/", async (req, res) => {
    const token = jwt.sign({ user: "escom", id_token: 2423 }, privateKey, {
      expiresIn: "1h",
    }); // 1 days | 1d
    res.send(token);
  });

  authRouter.post("/verify", async (req, res) => {
    const tokenVerify = req.headers.authorization?.split(" ")[1];
    let msg = "Ok";
    let code = 200;
    try {
      const payload = jwt.verify(tokenVerify, privateKey);
      console.log(payload);
    } catch (err: any) {
      console.log(err.name);
      msg = err.message;
      code = 401;
    }
    res.status(code).send({ msg: msg });
  });

  return { authRouter };
};
