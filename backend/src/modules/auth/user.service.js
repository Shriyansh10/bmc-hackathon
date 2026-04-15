import * as models from "./user.model.js"; 
import ApiError from "../../common/utils/api-error.js";
import * as utils from "../../common/utils/jwt.utils.js";
import pool from '../../common/config/db.js'

const register = async ({ name, email, password }) => {
  try {
    const hashedPassword = await utils.hash(password);
    console.log(hashedPassword)
    const user = await models.createUser(pool, { name, email, hashedPassword });
    return user;
  } catch (error) {
    throw ApiError.badRequest('User not created')
  }
};

export {register}


