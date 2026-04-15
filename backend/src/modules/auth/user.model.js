// models/user.model.js

import ApiError from "../../common/utils/api-error.js";

// Create user


export const createUser = async (pool, { name, email, hashedPassword }) => {
  try{
    const result = await pool.query(
      `INSERT INTO users (name, email, password, created_at)
      VALUES ($1, $2, $3, $4)
      RETURNING name, email, created_at`,
      [name, email, hashedPassword, new Date()]
    );
    
    return result.rows[0];
  }catch(error){
    console.log(error)
  }
};


// Get user by email
export const getUserByEmail = async (pool, email) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  return result.rows[0];
};


// Get user by id
export const getUserById = async (pool, id) => {
  const result = await pool.query(
    `SELECT id, name, email, created_at FROM users WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};


// Update user
export const updateUserName = async (pool, id, name) => {
  const result = await pool.query(
    `UPDATE users SET name = $1 WHERE id = $2 RETURNING *`,
    [name, id]
  );

  return result.rows[0];
};


// Delete user
export const deleteUser = async (pool, id) => {
  await pool.query(
    `DELETE FROM users WHERE id = $1`,
    [id]
  );
};