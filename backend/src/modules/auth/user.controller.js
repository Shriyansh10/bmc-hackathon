import ApiResponse from '../../common/utils/api-response.js';
import * as services from './user.service.js'

const register = async (req, res) => {
    const user = await services.register(req.body);
    ApiResponse.created(res, 'User Created Successfully', user)
}

const login = async (req, res) => {
    const {user, accessToken, refreshToken} = await services.login(req.body);
    res.cookies('refreshToken', refreshToken)
    ApiResponse.created(res, 'User Login Successfully', {user, accessToken})
}

export {register, login}