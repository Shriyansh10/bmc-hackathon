import Joi from "joi";
import BaseDto from '../../../common/dto/base.dto.js'

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

class DtoClass extends BaseDto{
    static schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(3).max(200).required(),
    })
}

export default DtoClass