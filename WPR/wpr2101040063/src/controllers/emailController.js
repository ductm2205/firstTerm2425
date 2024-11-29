const { paginate } = require("../utils/paginate");
const { getOtherUsers, getUserById } = require("../utils/userQueries");
const {
  getEmailById,
  getAllInboxes,
  getAllOuboxes,
  createNewEmail,
  deleteOneEmail,
} = require("../utils/emailQueries");
const emailsPerPage = 5;

async function renderInboxPage(req, res) {
  const userId = req.cookies.userId;
  try {
    const user = await getUserById(userId);

    // paginate
    const { page, offset, totalPages } = await paginate(
      req,
      emailsPerPage,
      "receiver_id"
    );

    // get income emails
    const emails = await getAllInboxes(userId, emailsPerPage, offset);

    res.render("emails/inbox", {
      user,
      emails,
      page,
      totalPages,
      success: null,
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.render("error", { error: error });
  }
}

async function renderOutboxPage(req, res) {
  const userId = parseInt(req.cookies.userId);
  try {
    const user = await getUserById(userId);

    // paginate
    const { page, offset, totalPages } = await paginate(
      req,
      emailsPerPage,
      "sender_id"
    );

    // get emails sent by current user
    const emails = await getAllOuboxes(userId, emailsPerPage, offset);

    res.render("emails/outbox", {
      user,
      emails,
      page,
      totalPages,
      success: req.cookies.success ? req.cookies.success : null,
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.render("error", { error });
  }
}

async function renderEmailDetail(req, res) {
  const userId = parseInt(req.cookies.userId);
  try {
    const user = await getUserById(userId);
    const emailId = req.params.email_id;

    const email = await getEmailById(emailId);

    res.render("emails/detail", {
      user,
      email,
      error: null,
      success: null,
    });
  } catch (error) {
    console.log(error);
    res.render("error", { error });
  }
}

async function renderComposePage(req, res) {
  const userId = parseInt(req.cookies.userId);
  try {
    const user = await getUserById(userId);

    // if replying to an email
    const receiver_id = req.params.receiver_id;

    // email_id
    const emailId = req.params.email_id ? req.params.email_id : null;

    let receiver = null;
    let users = [];

    // if not replying
    if (!receiver_id) {
      users = await getOtherUsers(userId);

      res.render("emails/compose", {
        user,
        receiver,
        receivers: users,
        error: null,
        success: null,
      });
    }
    // replying
    else {
      // get the email that is being replied
      const email = await getEmailById(emailId);

      // get the receiver
      receiver = await getUserById(receiver_id);

      res.render("emails/compose", {
        user,
        receiver,
        email: email ? email : null,
        error: null,
        success: null,
      });
    }
  } catch (error) {
    console.log(error);
    res.render("error", { error });
  }
}

async function sendEmail(req, res) {
  const userId = parseInt(req.cookies.userId);

  // get the path of the file
  const attachmentPath = req.file ? `/uploads/${req.file.filename}` : null;

  // get form data
  const { receiver_id, subject, body } = req.body;

  try {
    const isCreated = await createNewEmail(
      userId,
      receiver_id,
      subject,
      body,
      attachmentPath
    );

    if (!isCreated) {
      res.render("error", {
        error: "Error sending email, please try again!",
      });
    }

    res.cookie("success", "Email sent successfully!", {
      maxAge: 3000,
    });
    res.redirect("/outbox");
  } catch (error) {
    console.log(error);
    res.render("error", { error });
  }
}

async function deleteEmailById(req, res) {
  const userId = parseInt(req.cookies.userId);

  const emailId = req.params.email_id;

  try {
    const email = await getEmailById(emailId);

    if (!email) {
      return res.status(404).json({ error: "Email not found" });
    }

    // check if user is sender or receiver
    const updateField =
      userId == email.sender_id
        ? "is_deleted_by_sender"
        : "is_deleted_by_recipient";

    //
    const isDeleted = await deleteOneEmail(emailId, updateField);

    if (!isDeleted) {
      return res.status(500).json({ error: "Failed to delete email" });
    }

    res.status(200).json({ success: "Email deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the email" });
  }
}

async function deleteMultipleEmails(req, res) {
  const userId = parseInt(req.cookies.userId);

  const emailIds = req.body.emailIds;

  try {
    emailIds.forEach(async (emailId) => {
      const email = await getEmailById(emailId);
      if (!email) {
        return res.status(404).json({ error: "Email not found" });
      }

      // check if user is sender or receiver
      const updateField =
        userId == email.sender_id
          ? "is_deleted_by_sender"
          : "is_deleted_by_recipient";

      const isDeleted = await deleteOneEmail(emailId, updateField);

      if (!isDeleted) {
        return res
          .status(500)
          .json({ error: "Failed to delete email: " + email.subject });
      }
    });

    res.status(200).json({ success: "Emails deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the email" });
  }
}

module.exports = {
  renderInboxPage,
  renderOutboxPage,
  renderComposePage,
  renderEmailDetail,
  sendEmail,
  deleteEmailById,
  deleteMultipleEmails,
};
