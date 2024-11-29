const dbConnection = require("../config/dbConnection");

/**
 *
 * @param {*} userId
 * @returns All users except for the current user
 */
async function getOtherUsers(userId) {
  if (!userId) {
    console.log("Invalid user.id!");
  }

  try {
    const [users] = await dbConnection.execute(
      `
    SELECT * FROM users
    WHERE id != ?;
    `,
      [userId]
    );

    return users;
  } catch (error) {
    console.log("Error fetching user: " + error);
  }
}

/**
 *
 * @param {*} id
 * @returns User with a given id
 */
async function getUserById(id) {
  if (!id) {
    console.log("Invalid user.id!");
  }
  const userId = id;

  try {
    const [users] = await dbConnection.execute(
      `
          SELECT * 
          FROM users
          WHERE id = ?
          `,
      [userId]
    );

    const user = users[0];

    return user;
  } catch (error) {
    console.log("Error fetching users: " + error);
  }
}

module.exports = { getOtherUsers, getUserById };
