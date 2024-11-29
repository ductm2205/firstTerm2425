const dbConnection = require("../config/dbConnection");

async function paginate(req, emailsPerPage, target_user) {
  const userId = req.cookies?.userId;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * emailsPerPage;

  //
  let deletionColumn;
  if (target_user === "sender_id") {
    deletionColumn = "is_deleted_by_sender";
  } else if (target_user === "receiver_id") {
    deletionColumn = "is_deleted_by_recipient";
  } else {
    throw new Error("Invalid target_user value");
  }

  //
  const [total] = await dbConnection.execute(
    `
    SELECT COUNT(*) AS totalEmails FROM emails 
    WHERE ${target_user} = ? 
    AND ${deletionColumn} = false;
    `,
    [userId]
  );

  const totalEmails = total[0].totalEmails;
  const totalPages = Math.ceil(totalEmails / emailsPerPage);
  return { page, offset, totalPages };
}

module.exports = { paginate };
