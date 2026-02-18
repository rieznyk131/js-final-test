const data = localStorage.getItem('selectedUser');
const user = JSON.parse(data);

console.log(user);

let userImgContainer = document.getElementsByClassName('user-img')[0];
let userImg = document.createElement('img');
userImg.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
userImgContainer.append(userImg);

let userinfoList = document.getElementById('user-details-list');
let showPostBtn = document.getElementById('show-post-btn');
let postContainer = document.getElementById('post-container');
let postsAll = document.getElementById('posts');
let closeBtn = document.createElement('button');
closeBtn.id = 'close-btn';
closeBtn.innerText = 'Close';

document.title = `User Details - ${user.name}`;

function renderObj(object, parent) {
    for (let key in object) {
        const value = object[key];

        let valueContainer = document.createElement('li');


        if (typeof value === 'object' && value !== null) {

            const title = document.createElement('strong');
            title.innerText = key + ':';

            valueContainer.appendChild(title);

            const nestedObj = document.createElement('ul');
            nestedObj.classList.add('nested-obj');

            parent.append(valueContainer, nestedObj);

            renderObj(value, nestedObj)
        } else {
            valueContainer.innerText = `${key}: ${value}`;
            parent.append(valueContainer);
        }
    }
}

function getPostsByUserId(userId) {
    let posts = fetch('http://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(posts => {

            for (let post of posts) {
                if (userId === post.userId) {
                    console.log(post);


                    let postElem = document.createElement('div');
                    postElem.classList.add('post-element');

                    let postTitle = document.createElement('p');
                    postTitle.innerText = `${post.title}`;

                    let postDetailsBtn = document.createElement('button');
                    postDetailsBtn.classList.add('post-details-btn');
                    postDetailsBtn.innerText = `post details`;

                    postElem.append(postTitle, postDetailsBtn);

                    postsAll.append(postElem);

                    postDetailsBtn.onclick = function () {
                        localStorage.setItem('selectedPost', JSON.stringify(post));
                        window.location.href = 'post-details.html';

                }

                }
            }
        })
}

renderObj(user, userinfoList)

showPostBtn.onclick = function () {
    getPostsByUserId(user.id)
    showPostBtn.disabled = true;
    postContainer.appendChild(closeBtn);
    // closeBtn.style.display = 'block';

}

closeBtn.onclick = function () {
    postsAll.innerText = ''
    showPostBtn.disabled = false;
    // closeBtn.style.display = 'none';
    postContainer.removeChild(closeBtn);
}









