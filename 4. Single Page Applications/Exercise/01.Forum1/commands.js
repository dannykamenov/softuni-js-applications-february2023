import { main, createUrl, commentUrl } from "./app.js";

function createPost(e) {
  e.preventDefault();
  const form = new FormData(e.target);
  const title = form.get("topicName");
  const username = form.get("username");
  const postText = form.get("postText");
  const date = Date.now();
  if (
    e.target.parentElement.className === "new-topic-border" &&
    e.submitter.className === "public"
  ) {
    if (title === "" || username === "" || postText === "") {
      alert("All fields are required!");
      return;
    }
    const post = {
      title,
      username,
      postText,
      date,
    };
    fetch(createUrl, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    getPosts();
  } else {
    const clearForm = document.querySelector("form");
    clearForm.reset();
  }
  if(e.target.parentElement.className === "answer" && e.submitter.tagName === "BUTTON"){
    const id = e.target.parentElement.id;
    if(username === "" || postText === ""){
      alert("All fields are required!");
      return;
    }else{
      const comment = {
        username,
        postText,
        date,
        id
      }
      fetch(commentUrl, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      });
      getComments(id);
    }
  } 
}

function getPosts() {
  main.innerHTML = `
  <div class="new-topic-border">
  <div class="header-background">
      <span>New Topic</span>
  </div>
  <form>
      <div class="new-topic-title">
          <label for="topicName">Title <span class="red">*</span></label>
          <input type="text" name="topicName" id="topicName">
      </div>
      <div class="new-topic-title">
          <label for="username">Username <span class="red">*</span></label>
          <input type="text" name="username" id="username">
      </div>
      <div class="new-topic-content">
          <label for="postText">Post <span class="red">*</span></label>
          <textarea type="text" name="postText" id="postText" rows="8" class="height"></textarea>
      </div>
      <div class="new-topic-buttons">
          <button class="cancel">Cancel</button>
          <button class="public">Post</button>
      </div>

  </form>
</div>`;
  fetch(createUrl)
    .then((res) => res.json())
    .then((data) => {
      Object.values(data).forEach((post) => {
        const result = createPostElement(post);
        main.innerHTML += result;
      });
    });
}

function createPostElement(post) {
  const title = post.title;
  const username = post.username;
  const postText = post.postText;
  const postId = post._id;
  const date = new Date(post.date).toLocaleString();
  return `
    <div class="topic-container" id="${postId}">
    <div class="topic-name-wrapper">
    <div class="topic-name">
    <a href="javascript:void(0)" class="normal">
    <h2>${title}</h2>
    </a>
    <div class="columns">
    <div>
    <p>Date: <time>${date}</time></p>
    <div class="nick-name">
    <p>Username: <span>${username}</span></p>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    `;
}

function openPost(e) {
  if (e.target.tagName === "H2") {
    let id =
      e.target.parentElement.parentElement.parentElement.parentElement.id;
    fetch(createUrl)
      .then((res) => res.json())
      .then((data) => {
        Object.values(data).forEach((post) => {
          if (post._id === id) {
            const result = clickFullPost(post);
            main.innerHTML = result;
          }
        });
        getComments(id);
      });
  }
  if(e.target.tagName === "A" && e.target.parentElement.tagName === 
  "LI"){
    getPosts();
  }

}

function clickFullPost(post) {
  const title = post.title;
  const username = post.username;
  const postText = post.postText;
  const postId = post._id;
  const date = new Date(post.date).toLocaleString();
  return `
  <div class="topic-container">
    <div class="topic-name">
      <a href="#" class="normal">
        <h2>${title}</h2>
      </a>
    </div>
</div>


<div class="comment">
  <div class="header">
      <img src="./static/profile.png" alt="avatar">
      <p><span>${username}</span> posted on <time>${date}</time></p>

      <p class="post-content">${postText}</p>
   </div>
   <div id="user-comments">
   </div>
</div>

<div class="answer-comment">
<p><span>currentUser</span> comment:</p>
<div class="answer" id="${postId}">
    <form>
        <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
        <div>
            <label for="username">Username <span class="red">*</span></label>
            <input type="text" name="username" id="username">
        </div>
        <button>Post</button>
    </form>
</div>
</div>
  `;
}

function getComments(id){
  let commentSection = document.querySelector("#user-comments");
  commentSection.innerHTML = "";
  fetch(commentUrl)
  .then((res) => res.json())
  .then((data) => {
    Object.values(data).forEach((comment) => {
      if(comment.id === id){
        const result = createCommentElement(comment);
        commentSection.innerHTML += result;
      }
    });
  });
}

function createCommentElement(comment){
  const username = comment.username;
  const postText = comment.postText;
  const date = new Date(comment.date).toLocaleString();
  return `
  <div id="user-comment">
  <div class="topic-name-wrapper">
      <div class="topic-name">
          <p><strong>${username}</strong> commented on <time>${date}</time></p>
          <div class="post-content">
              <p>${postText}</p>
          </div>
      </div>
  </div>
</div>
  `;

}

export { createPost, getPosts, openPost };
