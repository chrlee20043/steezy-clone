const client = require("../client");

const createInstructor = async ({ name, bio, style, imageURL }) => {
  try {
    const {
      rows: [instructor],
    } = await client.query(
      `
            INSERT INTO instructors(name, bio, style, "imageURL")
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `,
      [name, bio, style, imageURL]
    );
    return instructor;
  } catch (error) {
    throw error;
  }
};

module.exports = { createInstructor };
