const dbConnection = require("../config/dbConnection");

/**
 *
 * @param {*} id
 * @returns An email with given id
 */
async function getEmailById(id) {
  if (!id) {
    console.log("Invalid email.id: " + id);
  }
  try {
    const query = `
    SELECT e.*, 
       sender.full_name AS sender_name, 
       receiver.full_name AS receiver_name
    FROM emails e
    JOIN users sender ON e.sender_id = sender.id
    JOIN users receiver ON e.receiver_id = receiver.id
    WHERE e.id = ?;
    `;

    const [emails] = await dbConnection.execute(query, [id]);

    return emails[0];
  } catch (error) {
    console.log("Error fetching data: " + error);
  }
}

/**
 *
 * @param {*} receiver_id
 * @param {*} emailsPerPage
 * @param {*} offset
 * @returns All emails sent to receiver_id
 */
async function getAllInboxes(receiver_id, emailsPerPage, offset) {
  if (!receiver_id) {
    console.log("Invalid receiver.id: " + id);
  }
  try {
    const query = `
      SELECT e.*, u.full_name AS sender_name
      FROM emails e
      JOIN users u ON e.sender_id = u.id
      WHERE e.receiver_id = ? AND e.is_deleted_by_recipient = false
      ORDER BY e.sent_at DESC
      LIMIT ? OFFSET ?;
    `;
    const [emails] = await dbConnection.execute(query, [
      receiver_id,
      emailsPerPage,
      offset,
    ]);
    return emails;
  } catch (error) {
    console.log("Error fetching inboxes: " + error);
  }
}

/**
 *
 * @param {*} sender_id
 * @param {*} emailsPerPage
 * @param {*} offset
 * @returns All emails sent by sender_id
 */
async function getAllOuboxes(sender_id, emailsPerPage, offset) {
  if (!sender_id) {
    console.log("Invalid sender.id: " + id);
  }
  try {
    // get emails sent by current user
    const query = `
        SELECT e.*, u.full_name AS receiver_name
        FROM emails e
        JOIN users u ON e.receiver_id = u.id
        WHERE e.sender_id = ? AND e.is_deleted_by_sender = false
        ORDER BY e.sent_at DESC
        LIMIT ? OFFSET ?;
      `;

    const [emails] = await dbConnection.execute(query, [
      sender_id,
      emailsPerPage,
      offset,
    ]);

    return emails;
  } catch (error) {
    console.log("Error fetching outboxes: " + error);
  }
}

/**
 *
 * @param {*} sender_id
 * @param {*} receiver_id
 * @param {*} subject
 * @param {*} body
 * @param {*} attachment_path
 * @param {*} is_deleted_by_sender
 * @param {*} is_deleted_by_recipient
 * @returns A boolean indicates whether the email has been sent or not
 */
async function createNewEmail(
  sender_id,
  receiver_id,
  subject = "(no subject)",
  body = "(no body)",
  attachment_path,
  is_deleted_by_sender = false,
  is_deleted_by_recipient = false
) {
  if (!sender_id || !receiver_id) {
    console.log("Invalid user.id!");
    return false;
  }
  const query = `
    INSERT INTO Emails (sender_id, receiver_id, subject, body, attachment_path, is_deleted_by_sender, is_deleted_by_recipient)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;
  const values = [
    sender_id,
    parseInt(receiver_id),
    subject,
    body,
    attachment_path,
    is_deleted_by_sender,
    is_deleted_by_recipient,
  ];

  try {
    const [result] = await dbConnection.execute(query, values);
    const newEmailId = result.insertId;

    if (!newEmailId) {
      return false;
    }
    return true;
  } catch (error) {
    console.log("Error sending email: " + error);
    return false;
  }
}

/**
 *
 * @param {*} id
 * @param {*} updateField
 * @returns A boolean indicates whether the email has been deeted or not
 */
async function deleteOneEmail(id, updateField) {
  if (!id) {
    console.log("Invalid email id for deleting!");
    return false;
  }

  const query = `
  UPDATE emails
  SET ${updateField} = true
  WHERE id = ?;
  `;

  try {
    const [isDeleted] = await dbConnection.execute(query, [id]);

    if (!isDeleted.affectedRows) {
      return false;
    }

    return true;
  } catch (error) {
    console.log("Error deleting email: " + error);
    return false;
  }
}

module.exports = {
  getEmailById,
  getAllInboxes,
  getAllOuboxes,
  createNewEmail,
  deleteOneEmail,
};
