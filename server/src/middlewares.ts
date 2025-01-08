import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { Roles } from "./types/roles";

const jwtSecret = process.env.JWT_SECRET!;

export const getAuthorizationMiddleware = (disableAuthentication: boolean) => {
  if (!disableAuthentication) return authorizationMiddleware;
  const authorizeAllRequests: RequestHandler<
    any,
    string,
    any,
    any,
    Record<string, Roles>
  > = (req, res, next) => {
    console.log("Setting Role to Admin");
    res.locals.role = Roles.ADMIN;
    next();
  };
  return authorizeAllRequests;
};
export const authorizationMiddleware: RequestHandler<
  any,
  string,
  any,
  any,
  Record<string, Roles>
> = (req, res, next) => {
  console.log("authorizing a request");
  const token: string | undefined = req.cookies.token;
  if (token === undefined) {
    // no token set so we set Role to public and let next middleware decide if Public is permission enough
    res.locals.role = Roles.PUBLIC;
    console.log("No token found -> Public Access");
    next();
    return;
  }

  try {
    // if jwt cannot be verified an error is thrown otherwise we continue to next middleware
    const { data } = jwt.verify(token, jwtSecret) as {
      data: { email: string; role: Roles };
    };

    //#############################
    // Renewing token
    //#############################

    // Generate a signed Json WebToken
    const newToken = jwt.sign(
      {
        // 1 hour expiry date
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: {
          email: data.email,
          role: data.role,
        },
      },
      jwtSecret,
      { algorithm: "HS256" },
    );

    // send jwt token as a httpOnly Cookie
    res.cookie("token", newToken, {
      maxAge: 1000 * 60 * 60 * 2, // 2 hours max Age
      httpOnly: true,
      sameSite: "strict",
    });

    //###############################
    console.log("Renewed Token -> Role: " + data.role);
    // set role to token role and call next middleware
    res.locals.role = data.role;
    next();
  } catch (e) {
    // if the token is wrong respond with 400 Bad Request
    res.status(400).send("Token was not verifiable");
  }
};
