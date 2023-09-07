const client = require("../client");

// POST to create/add a class

const createVideoClass = async ({
  instructor_id,
  style,
  level,
  videoURL,
  saved,
}) => {
  try {
    // individual rows
    const {
      rows: [videoClass],
    } = await client.query(
      // INSERT SQL query
      // insert into table(col1, col2, col3, col4, col5)
      // VALUES(var1, var2, var3, var4, var5)
      // RETURNING everything
      `
        INSERT INTO videoclasses(instructor_id, style, level, "videoURL", saved)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;
      `,
      [instructor_id, style, level, videoURL, saved]
    );
    return videoClass;
  } catch (error) {
    throw error;
  }
};

// const getAllVideos = async () => {
//   try {
//     const { rows } = await client.query(`
//       SELECT *
//       FROM videoclasses;
//     `);
//     return rows;
//   } catch (error) {
//     throw error;
//   }
// };

// GET videos with instructor name

const getVideoClassesWithInstructorName = async () => {
  try {
    // console.log("get class with instructor name");
    const { rows } = await client.query(`
      SELECT instructors.name AS instructor_name, instructors."imageURL" AS "imageURL", instructors.bio AS "instructorBio", videoclasses.*
      FROM instructors
      JOIN videoclasses ON instructors.instructor_id = videoclasses.instructor_id;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
};

// GET video by video id

const getVideoClassById = async (videoId) => {
  try {
    const {
      rows: [videoClasses],
    } = await client.query(
      `
        SELECT instructors.name AS instructor_name, instructors."imageURL" as "imageURL", instructors.bio AS "instructorBio", videoclasses.*
        FROM instructors
        JOIN videoclasses ON instructors.instructor_id = videoclasses.instructor_id
        WHERE video_id = ${videoId};
      `
    );
    return videoClasses;
  } catch (error) {
    throw error;
  }
};

// GET video by instructor id

const getVideoClassByInstructorId = async (instructorId) => {
  try {
    const {
      rows: [videoClasses],
    } = await client.query(
      `
        SELECT instructors.name AS instructor_name, videoclasses.*
        FROM instructors
        JOIN videoclasses ON instructors.instructor_id = videoclasses.instructor_id WHERE videoclasses.instructor_id = ${instructorId};
      `
    );
    return videoClasses;
  } catch (error) {
    throw error;
  }
};

// PUT - update video (if you added it)

const updateVideoClass = async (videoId, updatedFields) => {
  try {
    const { instructor_id, style, level, videoURL, favorite } = updatedFields;
    const query = `
      UPDATE videoclasses
      SET instructor_id = $2,  style = $3, level = $4, "videoURL" = $5, saved = $6
      WHERE video_id = $1
      RETURNING *;
    `;

    const { rows } = await client.query(query, [
      videoId,
      instructor_id,
      style,
      level,
      videoURL,
      favorite,
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

const deleteVideoClass = async (videoId) => {
  try {
    await client.query(
      `
        DELETE FROM videoclasses
        WHERE video_id = $1;
      `,
      [videoId]
    );
    const {
      rows: [videoClass],
    } = await client.query(
      `
        DELETE FROM videoclasses
        WHERE video_id = $1
        RETURNING *
      `,
      [videoId]
    );
    return videoClass;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createVideoClass,
  getVideoClassesWithInstructorName,
  getVideoClassById,
  getVideoClassByInstructorId,
  updateVideoClass,
  deleteVideoClass,
};
