let mainContainer = document.getElementById("container");

fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(users => {
        console.log(users);

        for (let user of users) {
            let userItem = document.createElement("div");
            userItem.classList.add("user-item");

            let userImg = document.createElement("img");
            userImg.classList.add("user-img");
            userImg.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

            let userId = document.createElement("p");
            userId.innerText = `User ID: ${user.id}`;

            let userName = document.createElement("p");
            userName.innerText = `User Name: ${user.name}`;

            let detailBtn = document.createElement("button");
            detailBtn.innerText = "Details";

            detailBtn.onclick = function () {
                localStorage.setItem('selectedUser', JSON.stringify(user));
                window.location.href = 'user-details.html';
            }

            userItem.append(userImg, userId, userName, detailBtn);
            mainContainer.appendChild(userItem);

        }
    })
