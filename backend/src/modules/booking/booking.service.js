import pool from '../../common/config/db.js'
import * as models from './booking.model.js'

const getAllSeats = async () => {
    const seats = models.getUserWithRefreshTokenById(pool)
    return seats;
}

export {getAllSeats}