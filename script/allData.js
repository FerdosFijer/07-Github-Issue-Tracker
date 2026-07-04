function setNumIssue(value) {
    const balanceElement = document.getElementById("numIssue");
    balanceElement.innerText = value;
}
let allIssues = [];
const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        // .then (json => console.log(json.data))
        .then(json => {
            allIssues = json.data;
            displayIssues(allIssues)
            });
};

const displayIssues = (Issues) => {
    const statusContainer = document.getElementById("status-container");
    // console.log(statusContainer);
    statusContainer.innerHTML = "";

    Issues.forEach(Issue => {
        // console.log( "Fijer have a", Issue)
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `<div
        <span>${Issue.status === "open" ? `<div class="card bg-base-100 w-86 shadow-md border-t-4 border-green-500 ></div>` : `<div class="card bg-base-100 w-86 shadow-md border-t-4 border-blue-500 ></div>`} </span>  
        <figure class=" shadow-sm">
            <div onclick="issueDetails(${Issue.id})" class="card-body">

                <div class="flex justify-between">
                    <span>${Issue.status === "open" ? `<img src="./assets/Open-Status.png" alt="">` : `<img src="./assets/Closed- Status .png" alt="">`} </span>
                    <span>  ${Issue.priority === "high"? `<span class="badge badge-soft badge-secondary ">HIGH</span>`: Issue.priority === "medium"? `<span class="badge badge-soft badge-warning">MEDIUM</span>`: `<span class="badge badge-soft badge-success">LOW</span>`}</span>
                </div>

                <h2 class="card-title"> ${Issue.title} </h2>
                <p>${Issue.description}</p>

                <div class="card-actions justify-start">
                    <div  class="badge badge-outline badge-secondary">Fashion</div>
                    <div class="badge badge-soft badge-warning">Products</div>
                </div>
            </div>
        </figure>
        <div class="card-body">
            <p>#${Issue.id}  by ${Issue.author}</p>
            <p>${Issue.createdAt.split("T")[0]}</p>
    </div> `;
        statusContainer.appendChild(btnDiv);
    })
}

const filterIssues = (status) => {
    if (status === "all") {
        displayIssues(allIssues);
        setNumIssue(`${allIssues.length} Issues`)
    } else {
        const filtered = allIssues.filter(
            issue => issue.status.toLowerCase() === status
        );
        displayIssues(filtered);
        setNumIssue(`${filtered.length} Issues`)
    }
};
const removeActive = () => {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(btn => {
        btn.classList.remove("btn-primary");
    });
};

const setActive = (status) => {
    removeActive();

    const clickBtn = document.getElementById(`filter-btn-${status}`);
    clickBtn.classList.add("btn-primary");

    filterIssues(status);
};

const issueDetails = async (id) => {
    const url= `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    // console.log(url);
    const res = await fetch(url);
    const json3 = await res.json();
    displayIssueDetails(json3.data);
};

const displayIssueDetails = (issue) => {
    console.log(issue); 
    const modalBox = document.getElementById("details-container");
    console.log(modalBox);
    modalBox.innerHTML = `
    <div class="space-y-6">
                   <div>
                   <h2 class="font-bangla text-2xl font-bold pb-2">${issue.title} </h2>
                    <div class="flex items-center gap-2 ">
                        <span class="badge badge-success rounded-full">${issue.status}</span>
                        <p class="w-1 h-1 rounded-full border-3 border-gray-500"></p>
                        <span>Opened by ${issue.author} </span>
                        <p class="w-1 h-1 rounded-full border-3 border-gray-500"></p>
                        <span>${issue.createdAt.split("T")[0]}</span>
                    </div>
                   </div>
                    <div class="card-actions justify-start ">
                        <div class="badge badge-outline badge-secondary rounded-full">BUG</div>
                        <div class="badge badge-soft badge-warning rounded-full">HELP WANTED</div>
                    </div>
                    <p>${issue.description}</p>
                    <div class="grid grid-cols-2 bg-slate-200  p-4 rounded-md">
                        <div>
                            <p> Assignee:</p>
                            <p class="font-bold"> ${issue.assignee}</p>
                        </div>
                        <div>
                            <p> Priority:</p>
                            <span class="badge badge-error rounded-full">${issue.priority}</span>
                        </div>
                </div>`;
    document.getElementById("issue_modal").showModal();
}
loadIssues();

document.getElementById("btn-search").addEventListener("click", () => {
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    // console.log(searchValue);

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            // console.log("Like my own", data)
            const allIssue = data.data;
            console.log(allIssue);
            const filterIssue = allIssue.filter((description) => description.description.toLowerCase().includes(searchValue));
            displayIssues(filterIssue);
        });
});
