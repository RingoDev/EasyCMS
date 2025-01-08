import express from "express";
import UserController from "../services/UserController";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../services/jwtSetup";
import { Roles } from "../types/roles";
import { User } from "../schemas/User";

const router = express.Router();

function createToken(user: User) {
  // Generate a signed Json WebToken
  return jwt.sign(
    {
      // 2 hour expiry date
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
      data: {
        email: user.email,
        role: user.role,
      },
    },
    jwtSecret,
    { algorithm: "HS256" },
  );
}

// Signup

router.post<
  undefined,
  { user: { email: string; role: Roles } },
  { email: string; password: string; role: Roles },
  undefined,
  Record<string, Roles>
>("/signup", async (req, res, _next) => {
  // only admins and root can create accounts
  if (res.locals.role < Roles.ADMIN) {
    res.status(401).send();
    return;
  }

  UserController.create(req.body.email, req.body.password, req.body.role)
    .then((user) => {
      const token = createToken(user);

      // send jwt token as a httpOnly Cookie
      res
        .cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 2, // 2 hour max Age
          httpOnly: true,
          sameSite: "strict",
        })
        .send({ user: { email: user.email, role: user.role } });
    })
    .catch((_err) => {
      // Errorcode 500 because this happens due to internal server error
      // ... what about same username? todo
      res.status(500).send();
    });
});

// Login

router.post<
  undefined,
  { user: { email: string; role: Roles } },
  { email: string; password: string },
  undefined
>("/login", async (req, res, _next) => {
  UserController.login(req.body.email, req.body.password)
    .then((user) => {
      const token = createToken(user);

      // todo change from cookie to bearer header
      // send jwt token as a httpOnly Cookie
      res
        .cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 2, // 2 hour max Age
          httpOnly: true,
          sameSite: "strict",
        })
        .send({ user: { email: user.email, role: user.role } });
    })
    .catch((err) => {
      // credentials were incorrect
      console.log(err);
      res.status(400).send();
    });
});

// Logout
router.get("/logout", (req, res, _next) => {
  res.clearCookie("token");
  res.send();
});

router.post("/rootLogin", (req, res, _next) => {
  if (req.body.token === process.env.ROOT_TOKEN) {
    const token = createToken({
      email: "root",
      password: "root",
      role: Roles.ADMIN,
    });

    // send jwt token as a httpOnly Cookie
    res
      .cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 2, // 2 hour max Age
        httpOnly: true,
        sameSite: "strict",
      })
      .send("Logged in as Root");
    return;
  } else {
    res.status(401).send();
  }
});

export default router;
