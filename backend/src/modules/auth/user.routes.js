import { Router } from "express";
import validate from '../../common/middlewares/validate.middlewares.js'
import RegisterDto from "./dto/register.dto.js";
import LoginDto from "./dto/login.dto.js";
import * as controller from './user.controller.js'

const router = Router()

router.post('/register', validate(RegisterDto), controller.register)
router.post('/login', validate(LoginDto), controller.login)

export default router;