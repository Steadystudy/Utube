import "regenerator-runtime";
const form = document.querySelector("#commentForm");
const textarea = document.querySelector("textarea");
const videoContainer = document.querySelector("#videoContainer");

function addComment(text, id) {
  const videoComments = document.querySelector(".video__show-comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = `${text}`;
  const span2 = document.createElement("span");
  span2.innerText = `Delete`;
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
}

const handleSubmit = async (event) => {
  event.preventDefault();
  const text = textarea.value;
  if (text === "") {
    return;
  }
  const videoId = videoContainer.dataset.id;
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

form.addEventListener("submit", handleSubmit);
