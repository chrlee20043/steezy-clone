const client = require("../client");

// Query to create a user

const createUser = async ({
  username,
  password,
  name,
  accountCreationDate,
  subscriptionStatus,
}) => {
  try {
    // individual rows
    const {
      rows: [user],
    } = await client.query(
      // INSERT SQL query
      // insert into table(col1, col2, col3, col4, col5)
      // VALUES(var1, var2, var3, var4, var5)
      // RETURNING everything
      `
        INSERT INTO users(username, password, name, "accountCreationDate", "subscriptionStatus")
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;
    `,
      [username, password, name, accountCreationDate, subscriptionStatus]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

// GET - /api/users - get all users

const getAllUsers = async () => {
  try {
    const { rows } = await client.query(`
            SELECT *
            FROM users;
        `);
    // console.log(rows);
    return rows;
  } catch (error) {
    throw error;
  }
};

// GET - /api/users/:userId - get user by id

const getUserById = async (userId) => {
  try {
    const {
      rows: [users],
    } = await client.query(`
      SELECT *
      FROM users
      WHERE user_id = ${userId};
    `);
    return users;
  } catch (error) {
    throw error;
  }
};

// GET - get user by username

async function getUserByUsername(username) {
  // first get the user
  try {
    const { rows } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username = $1;
    `,
      [username]
    );
    if (!rows || !rows.length) return null;
    const [user] = rows;
    delete user.password;
    return user;
  } catch (error) {
    console.error(error);
  }
}

// PUT - update user (if you it is me)

const updateUser = async (userId, updatedFields) => {
  try {
    const {
      username,
      password,
      name,
      accountCreationDate,
      subscriptionStatus,
    } = updatedFields;
    const query = `
      UPDATE users
      SET username = $2, password = $3, name = $4, "accountCreationDate" = $5, "subscriptionStatus" = $6
      WHERE user_id = $1
      RETURNING *;
    `;

    const { rows } = await client.query(query, [
      username,
      password,
      name,
      accountCreationDate,
      subscriptionStatus,
    ]);

    if (rows && rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

// DELETE user (only if it is you)

const deleteUser = async (userId) => {
  try {
    await client.query(
      `
    DELETE FROM users
    WHERE user_id = $1;
    `,
      [userId]
    );
    const {
      rows: [user],
    } = await client.query(
      `
      DELETE FROM users
      WHERE user_id = $1
    RETURNING *
    `,
      [userId]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
};
