export const getUserWithRefreshTokenById = async (pool) => {
  const result = await pool.query(
    `SELECT s.name, b.user_id, s.is_booked
    FROM seats s
    LEFT JOIN bookings b
    ON s.id = b.seat_id`,
  );

  return result.rows;
};