const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        // .then (json => console.log(json.data))
        .then(json => displalyIssues(json.data));
};

const displalyIssues = (Issues) => {
    const statusContainer = document.getElementById("status-container");
    // console.log(statusContainer);
    statusContainer.innerHTML = "";

    Issues.forEach(Issue => {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `<div class="card bg-base-100 w-86 shadow-md border-t-4 border-green-500  ">
        <figure class=" shadow-sm">
            <div onclick="issueDetails(${Issue.id})" class="card-body">

                <div class="flex justify-between">
                    <img src="./assets/Open-Status.png" alt="">
                    <span class="badge badge-warning ">Most Popular</span>
                </div>

                <h2 class="card-title"> ${Issue.id}. Fix navigation menu on mobile devices </h2>
                <p>The navigation menu doesn't collapse properly on mobile devices...</p>

                <div class="card-actions justify-start">
                    <div  class="badge badge-outline badge-secondary">Fashion</div>
                    <div class="badge badge-soft badge-warning">Products</div>
                </div>
            </div>
        </figure>
        <div class="card-body">
            <p>#1 by john_doe</p>
            <p>1/15/2024</p>
    </div> `;
        statusContainer.appendChild(btnDiv);
    })
}
const issueDetails = async (id) => {
    const url= `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    // console.log(url);
    const res = await fetch(url);
    const json3 = await res.json();
    displayIssueDetails(json3.data);
};

// const createElements = (arrs) => {
//     const htmlElements = arrs.map((el) => `<span class= "btn"> ${el}</span>`);
//     // console.log(htmlElements.join(" "));
//     return htmlElements.join(" ");
// }

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
                        <span>${issue.createdAt}</span>
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