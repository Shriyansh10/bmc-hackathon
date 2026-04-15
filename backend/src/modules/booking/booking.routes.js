import { Router } from "express";
import validate from '../../common/middlewares/validate.middlewares.js'
import * as controller from './booking.controller.js'

const router = Router()

router.get('/seats', controller.getAllSeats)

export default router;