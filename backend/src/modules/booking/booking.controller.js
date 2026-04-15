import * as bookingServices from './booking.service.js'
import ApiResponse from '../../common/utils/api-response.js'

const getAllSeats = async (req,res ) => {
    const seats = await bookingServices.getAllSeats();
    ApiResponse.ok(res, 'Fetched all the seats with their booking status', seats)
}

export {getAllSeats}