document.addEventListener('DOMContentLoaded', function () {
    const dayContentContainer = document.getElementById('day-content');
    const videoContainer = document.getElementById('media'); 
    const taskContainer = document.getElementById('task'); 
    const reflectionContainer = document.getElementById('reflection'); 

    fetch('data/day1.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Display mini-task
            const miniTaskElement = document.getElementById('mini-task');
            if (miniTaskElement) {
                miniTaskElement.textContent = data.miniTask || 'No mini-task available.';
            } else {
                console.error('Element with ID "mini-task" not found.');
            }

            // Display reflection prompt
            const reflectionPromptElement = document.getElementById('reflection-prompt');
            if (reflectionPromptElement) {
                reflectionPromptElement.textContent = data.reflectionPrompt || 'No reflection prompt available.';
            } else {
                console.error('Element with ID "reflection-prompt" not found.');
            }
        })
        .catch(error => {
            console.error('Error loading day 1 content:', error);
            if (dayContentContainer) {
                dayContentContainer.innerHTML = '<p>Sorry, there was an error loading the content for Day 1.</p>';
            }
        });

    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dayLinks = document.querySelectorAll('.dropdown-menu a');

    // Toggle dropdown menu visibility
    dropdownToggle.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent the click from propagating to the document
        dropdownMenu.classList.toggle('open');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function () {
        if (dropdownMenu.classList.contains('open')) {
            dropdownMenu.classList.remove('open');
        }
    });

    // Prevent dropdown from closing when clicking inside the menu
    dropdownMenu.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    // Set the active day dynamically
    dayLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            // Remove active class from all links
            dayLinks.forEach(link => link.classList.remove('active'));

            // Add active class to the clicked link
            this.classList.add('active');

            // Optionally, you can load content for the selected day here
            const selectedDay = this.getAttribute('data-day');
            console.log(`Day ${selectedDay} selected`);
        });
    });

    const navLinks = document.querySelectorAll(".dropdown-menu a");

    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();

            // Get the day from the data attribute
            const day = parseInt(link.getAttribute("data-day")); // Ensure the correct day is retrieved

            // Ensure the correct day is selected
            if (!isNaN(day)) {
                // Update active link
                navLinks.forEach(nav => nav.classList.remove("active"));
                link.classList.add("active");

                // Populate content for the selected day
                populateContent(day); // Dynamically load content for the selected day

                // Update progress bar
                const progressBar = document.querySelector(".progress-bar");
                progressBar.style.width = `${(day / 8) * 100}%`; // Adjust for 8 days

                // Collapse the dropdown menu
                dropdownMenu.classList.remove("open");

                console.log(`Day ${day} selected`); // Log the correct day
            } else {
                console.error("Invalid day selected");
            }
        });
    });

    // Load content for Day 1 by default
    populateContent(1);
});

function populateContent(day) {
    const content = courseContent.days.find(d => d.day === day);

    if (!content) return;

    const mediaCard = document.getElementById("media");
    const taskCard = document.getElementById("task");
    const reflectionCard = document.getElementById("reflection");

    if (day === 8) {
        // Special handling for "Завершення курсу"
        mediaCard.innerHTML = `
            <h2 class="day-title">${content.title}</h2>
            <div class="completion-text">${content.description}</div>
        `;
        taskCard.style.display = "none"; // Hide task card
        reflectionCard.style.display = "none"; // Hide reflection card
    } else {
        // Update task section
        taskCard.style.display = "block";
        taskCard.innerHTML = `
            <h3>${content.task.badge}</h3>
            <ol>
                ${content.task.steps.map(step => {
                    if (Array.isArray(step)) {
                        return `<ul>${step.map(subStep => `<li>${subStep}</li>`).join('')}</ul>`;
                    } else {
                        return `<li>${step}</li>`;
                    }
                }).join('')}
            </ol>
        `;

        // Update advice section
        reflectionCard.style.display = "block";
        reflectionCard.innerHTML = `
            <h3>${content.advice}</h3>
        `;
    }
}