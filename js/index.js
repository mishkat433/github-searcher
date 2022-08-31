const loadData = async (search) => {
    const url = `https://api.github.com/users/${search}`;
    const res = await fetch(url)
    const data = await res.json()

    display(data);
}

document.getElementById("searchBtn").addEventListener("click", () => {
    const inputValue = document.getElementById("searchInput");
    loadData(inputValue.value);
    localStorage.setItem("name", inputValue.value)
    inputValue.value = '';

})
document.getElementById("searchInput").addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        loadData(e.target.value);
        localStorage.setItem("name", e.target.value);
        e.target.value = '';
    }
})



const display = (data) => {
    const mainDisplay = document.getElementById("display");

    if (data.name === null) {
        mainDisplay.innerHTML = `
        <h1 class="text-red-500 text-center font-bold text-3xl">Data Not Found, Please Try Again...</h1>
        `
    }
    else {
        mainDisplay.innerHTML = `
        <div>
            <div class="flex flex-col lg:flex-row  justify-between text-center items-center text-white" >
                <p class="bg-emerald-800 px-5 mb-3 lg:mb-0 py-1 rounded-md">Your Id : ${data.id} </p>
                <p class="bg-pink-500 px-5 mb-3 lg:mb-0 py-1 rounded-md">Public Repositories : ${data.public_repos} </p>
                <p class="bg-orange-500 px-5 mb-3 lg:mb-0 py-1 rounded-md">Followers : ${data.followers} </p>
                <p class="bg-red-500 px-5 mb-3 lg:mb-0 py-1 rounded-md ">Following : ${data.following}</p>
                <p class="bg-lime-500 px-5 mb-3 lg:mb-0 py-1 rounded-md"> Start Date : ${data.created_at.slice(0, 10)} </p>
            </div>
            <div class="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-7 mt-4">
                <div class="w-full lg:w-1/2">
                    <img class="w-full lg:w-4/5 rounded-md" src="${data.avatar_url}" alt="">
                </div>
                <div class="text-center lg:text-left">
                    <h1 class="text-3xl font-semibold text-white mb-2">User Name : ${data.name ? data.name : "not found"}</h1>
                    <h2 class="text-2xl font-semibold text-white mb-5">Login Name : ${data.login}</h2>
                    <a href="${data.html_url}" target="blank" class=" bg-green-700 rounded-lg p-2 text-white hover:bg-green-600">Go to yoru
                        Profile</a>
                </div>
            </div>
        </div>
        `
    }
}

document.getElementById("clear").addEventListener("click", () => {
    const confirmation = confirm("Do you want to clear this profile?")
    if (confirmation) {
        localStorage.clear()
        const mainDisplay = document.getElementById("display").innerHTML = `
        <h1 class="text-red-500 text-center font-bold text-3xl">Data Not Found, Please Try Again...</h1>
        `
    }

})

loadData(localStorage.getItem("name"));

document.getElementById("date").innerText = new Date().getFullYear();