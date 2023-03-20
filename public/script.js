const input = window.document.querySelector("#user");
const card = window.document.querySelector("#card");

const overview = {
    avatar_url: window.document.querySelector("#avatar_url-profile-github"),
    name: window.document.querySelector("#name-profile-github"),
    login: window.document.querySelector("#login-profile-github"),
    bio: window.document.querySelector("#bio-profile-github"),
    followers: window.document.querySelector("#followers-profile-github"),
    following: window.document.querySelector("#following-profile-github"),
    location: window.document.querySelector("#location-profile-github"),
    blog: window.document.querySelector("#blog-profile-github"),
}

const stats = window.document.querySelector("#stats");
const languages = window.document.querySelector("#languages");

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const username = input.value;
        fetch(`http://localhost:3000/?username=${username}`)
        .then(response => response.json())
        .then(data => {
            if (data.message) return window.alert(data.message);
            
            card.style.display = "flex";

            if (data.type === "User") {
                stats.style.display = "block";
                languages.style.display = "block";
                stats.src = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dracula&include_all_commits=true&count_private=true`;
                languages.src = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&langs_count=7&theme=dracula`;
            } else {
                stats.style.display = "none";
                languages.style.display = "none";
            };

            for (const key in overview) {
                for (const dataKey in data) {
                    if (dataKey === key) {
                        if (overview[key].id === "blog-profile-github") overview[key].lastElementChild.href = data[key];
                        if (overview[key].id === "avatar_url-profile-github") {
                            overview[key].src = data[key];
                            continue;
                        };
                        overview[key].lastElementChild.innerText = data[key];
                    };
                };
            };
        })
        .catch(error => {
            window.alert(error);
        });
    };
});