const username = document.getElementById("username");

const btn = document.getElementById("btn");
const git_user = document.getElementById("github_user");
const git_img = document.getElementById("github_mainImg");
const git_username = document.getElementById("github_username");
const date = document.getElementById("git_joineddate");
const bio = document.getElementById("github_bio");
const repost = document.getElementById("repost");
const following = document.getElementById("following");
const followers = document.getElementById("followers");
const works_at = document.getElementById("works_at");
const local = document.getElementById("location");

let newImg = document.createElement("img");

btn.addEventListener("click", function(){
    const url = `https://api.github.com/users/${username.value}`;
    const profile = `https://github.com/${username.value}`

    async function GetUrl(){
        const response = await fetch(url);
        const data = await response.json();
        const dateData = data.created_at.slice(0, data.created_at.length - 10);
        
        newImg.alt = "Avatar from requested search"
        newImg.src = data.avatar_url;
        git_img.appendChild(newImg);
        git_img.style.border = "none";
        newImg.style.border = "none";

        git_user.innerText = data.login;
        git_username.innerHTML = `<a href="${profile}">@${data.login}</a>`;
        date.innerText = `Joined at ${dateData}`;
        repost.innerHTML = data.public_repos;
        following.innerHTML = data.following;
        followers.innerHTML = data.followers;

        bio.innerHTML =
        data.bio === "" || data.bio === null
          ? "This profile has no bio..."
          : data.bio;

        works_at.innerHTML =
          data.company === "" || data.company === null
            ? "Company not found..."
            : `Works at ${data.company}`;

        local.innerHTML =
            data.location === "" || data.location === null
              ? "Location not found..."
              : data.location;


        username.value = "";
        console.log(data)
    }
    GetUrl()
})