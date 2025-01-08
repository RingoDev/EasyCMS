import User, { IUser } from "../schemas/User";
import { Roles } from "../types/roles";

export default class UserController {
  static login(email: string, password: string) {
    return new Promise<IUser>((resolve, reject) => {
      console.log(email);
      User.findOne({ email: email })
        .then((user) => {
          console.log(user);
          if (user !== null) {
            user
              .authenticate(password)
              .then((valid) => {
                if (valid) resolve(user);
                else reject({ message: "Password incorrect" });
              })
              .catch((e) => reject(e));
          } else reject({ message: "User not found" });
        })
        .catch((err) => reject(err));
    });
  }

  static create(email: string, password: string, role: Roles) {
    return new Promise<IUser>((resolve, reject) => {
      if (!validEmail(email)) reject("Not a valid Email-address");
      User.create({ email, password, role })
        .then((user) => {
          resolve(user);
        })
        .catch((err) => reject(err));
    });
  }
}

function validEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}
