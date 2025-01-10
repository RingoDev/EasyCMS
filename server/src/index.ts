import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import { getAuthorizationMiddleware } from "./middlewares";
import cookieParser from "cookie-parser";
import dataRouter from "./routes/dataRouter";
import imageRouter from "./routes/imageRouter";
import fileUpload from "express-fileupload";
import cors from "cors";
import publicRouter from "./routes/publicRouter";
import { Roles } from "./types/roles";

// load .env files into environment
dotenv.config();

//####################################
// Database configuration
//####################################

mongoose
  .connect(process.env.DB_CONNECTION!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to mongodb database");
  })
  .catch((e) => {
    console.log(e);
  });

//####################################
// Express configuration
//####################################

// TODO dont use in production
const disableAuthentication = process.env.DISABLE_AUTHENTICATION === "true";

// Create a new express app instance
const app: express.Application = express();

// static files that are served to everybody
app.use("/images", express.static("images"));

// allows Cross-Origin Resource sharing
// @ts-ignore
app
  .use(
    cors({
      // origin: "http://localhost:3000",
      origin: (incomingOrigin, callback) => {
        if (incomingOrigin !== undefined) {
          const origins = [
            "http://localhost:3000",
            "http://localhost:*",
            "https://easycms.netlify.app",
            "https://stefflwirt.web-stories.at",
          ];
          if (origins.includes(incomingOrigin)) callback(null, incomingOrigin);
        } else {
          // its easier to allow every origin
          callback(null, incomingOrigin);
        }
      },
      // origin: /^((localhost:3000)|(easyCMS.netlify.app))$/,
      methods: ["HEAD", "GET", "PUT", "POST", "DELETE", "PATCH"],
      allowedHeaders: "Set-Cookie, Accept, Content-Type",
      credentials: true,
    }),
  )
  // parses Request body into json
  .use(bodyParser.json())
  // parses cookies into usable cookies
  .use(cookieParser())
  // allows upload of files
  .use(
    // @ts-expect-error - seems as if lib has some ts issues
    fileUpload({
      limits: { fileSize: 1024 * 1024 * 50 },
      useTempFiles: true,
      tempFileDir: "/tmp/",
      abortOnLimit: true,
      responseOnLimit: "File Too Big",
    }),
  )

  // User Management

  // checks and renews token on all requests and sets role in locals
  .use(getAuthorizationMiddleware(disableAuthentication))

  // handles login signup and logout
  .use("/api/auth", authRouter)

  // Data Endpoints

  // handles GET Requests for vessels has public access
  .use("/api/vessel", publicRouter)

  // from this point on only authorized users can proceed
  .use((req, res, next) => {
    if (res.locals.role === Roles.PUBLIC) {
      console.log("Stopped unauthorized access");
      res.status(401).send("You are not authorized to access this resource");
    } else next();
  })
  // handles Post Put Delete Requests for Vessels needs permissions
  .use("/api/vessel", dataRouter)

  // handles image upload needs permissions
  .use("/api/image", imageRouter);

const port = process.env.PORT!;

app.listen(port, () => {
  console.log("Started App on http://localhost:" + port);
});
