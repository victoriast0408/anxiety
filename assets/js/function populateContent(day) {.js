function populateContent(day) {
    const content = courseContent.days.find(d => d.day === day);

    if (!content) return;

    // Update media section
    document.querySelector("#media h2").textContent = content.title;
    document.querySelector("#media p").textContent = content.description;

    const mediaContainer = document.querySelector("#media");
    const iframes = mediaContainer.querySelectorAll("iframe");

    iframes.forEach((iframe, index) => {
        if (content.videos[index]) {
            iframe.src = content.videos[index].src;
            iframe.title = content.videos[index].title;
        } else {
            iframe.src = "";
            iframe.title = "Video not available";
        }
    });

    // Update task section
    document.querySelector("#task h3 span").textContent = content.task.badge;
    const taskList = document.querySelector("#task ol");
    taskList.innerHTML = "";
    content.task.steps.forEach(step => {
        if (Array.isArray(step)) {
            const ul = document.createElement("ul");
            step.forEach(subStep => {
                const li = document.createElement("li");
                li.textContent = subStep;
                ul.appendChild(li);
            });
            taskList.appendChild(ul);
        } else {
            const li = document.createElement("li");
            li.textContent = step;
            taskList.appendChild(li);
        }
    });

    // Update advice section
    document.querySelector("#reflection p").textContent = content.advice;
}
