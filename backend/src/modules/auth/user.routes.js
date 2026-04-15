import { Router } from "express";
import validate from '../../common/middlewares/validate.middlewares.js'
import DtoClass from "./dto/register.dto.js";
import * as controller from './user.controller.js'

const router = Router()

router.post('/register', validate(DtoClass), controller.register)

export default router;