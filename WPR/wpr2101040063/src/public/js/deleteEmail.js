async function deleteEmail(emailId) {
  const confirmDelete = confirm("Are you sure you want to delete this email?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`/email/delete/${emailId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      alert(data.success);
      const previousPage = document.referrer || "/inbox";
      window.location.href = previousPage;
    } else {
      const errorData = await response.json();
      alert(errorData.error || "Failed to delete the email.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while trying to delete the email.");
  }
}
