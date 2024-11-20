document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:5000/comments";
  const email = sessionStorage.getItem("email");
  const userStatusDiv = document.getElementById("userStatus");
  const commentForm = document.getElementById("commentForm");
  const commentsList = document.getElementById("commentsList");

  if (!email) {
    userStatusDiv.innerHTML = `
      <p style="color: white; text-align: center; font-size: 20px;">
        You must <a href="./Login.html" style="color: greenyellow;">log in</a> to leave a comment.
      </p>`;
    commentForm.style.display = "none";
  } else {

  }

  const fetchComments = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch comments.");
      }

      const comments = await response.json();
      renderComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  commentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const text = document.getElementById("commentText").value.trim();
    const token = sessionStorage.getItem("token");

    if (!text) {
      alert("Comment text is required.");
      return;
    }

    const newComment = { text };
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment.");
      }

      const savedComment = await response.json();
      renderComment(savedComment);
      commentForm.reset();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  });

  const renderComments = (comments) => {
    commentsList.innerHTML = "";
    comments.forEach(renderComment);
  };

  const renderComment = ({ name, text, createdAt }) => {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    commentDiv.innerHTML = `
      <div class="comment-header">
        <span class="comment-author">${name || "Anonymous"}</span>
        <span class="comment-date">${new Date(createdAt).toLocaleDateString()}</span>
      </div>
      <p class="comment-content">${text}</p>
    `;
    commentsList.prepend(commentDiv);
  };

  fetchComments();
});

document.addEventListener("DOMContentLoaded", () => {
  const appointmentButton = document.querySelector(".appointment");

  if (appointmentButton) {
    appointmentButton.addEventListener("click", () => {
      window.location.href = "./trainer.html";
    });
  }
});
