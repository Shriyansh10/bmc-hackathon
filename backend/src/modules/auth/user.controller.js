import ApiResponse from '../../common/utils/api-response.js';
import * as services from './user.service.js'

const register = async (req, res) => {
    const user = await services.register(req.body);
    ApiResponse.created(res, 'User created successfully', user)
}

export {register}