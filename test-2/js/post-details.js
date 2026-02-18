const data = localStorage.getItem('selectedPost');
const post = JSON.parse(data);

console.log(post);

let userImg = document.getElementById('user-img');
userImg.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'

let userId = document.getElementById('user-id');
userId.innerText = `User ID: ${post.userId}`;

let postId = document.getElementById('post-id');
postId.innerText = `Post ID: ${post.id}`;

let postTitle = document.getElementById('post-title');
postTitle.innerText = `Title: ${post.title}`;

let postBody = document.getElementById('post-body');
postBody.innerText = `Body: ${post.body}`;

let commentsWrapper = document.getElementById('comments-wrapper');

document.title = `${post.title} - Post Details`;

let comments = fetch('https://jsonplaceholder.typicode.com/comments')
    .then(res => res.json())
    .then(comments => {
        for (let comment of comments) {
            if (post.id === comment.postId) {
                console.log(comment);


                let commentContainer = document.createElement('div')
                commentContainer.classList.add('comment-container');

                let commentAuthorInfo = document.createElement('div')
                commentAuthorInfo.classList.add('commentator-info');

                let imgContainer = document.createElement('div')
                imgContainer.classList.add('img-container');

                let commentAuthorImg = document.createElement('img')
                commentAuthorImg.classList.add('comment-author-img');
                commentAuthorImg.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
                imgContainer.appendChild(commentAuthorImg)


                let commentAuthorEmail = document.createElement('p')
                commentAuthorEmail.innerText = `E-mail: ${comment.email}`;

                commentAuthorInfo.append(imgContainer, commentAuthorEmail);

                let commentInfo = document.createElement('div')
                commentInfo.classList.add('comment-info');

                let postId = document.createElement('p');
                postId.classList.add('post-id-comment');
                postId.innerText = `Post ID: ${comment.postId}`;

                let commentId = document.createElement('p');
                commentId.classList.add('comment-id');
                commentId.innerText = `Comment ID: ${comment.id}`;

                commentInfo.append(postId, commentId);

                let commentContent = document.createElement('div');
                commentContent.classList.add('comment-content');

                let commentName = document.createElement('p');
                commentName.classList.add('comment-title');
                commentName.innerText = `Name: ${comment.name}`;

                let commentBody = document.createElement('p');
                commentBody.classList.add('comment-body');
                commentBody.innerText = `Body: ${comment.body}`;

                commentContent.append(commentName, commentBody);

                commentContainer.append(commentAuthorInfo, commentInfo, commentContent);

                commentsWrapper.appendChild(commentContainer)
            }
        }
    })