import Joi from "joi";
import BaseDto from '../../../common/dto/base.dto.js'

class DtoClass extends BaseDto{
    static schema = Joi.object({
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(8).max(200).required(),
    })
}

export default DtoClass