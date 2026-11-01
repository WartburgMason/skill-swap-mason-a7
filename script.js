
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("contact-form").addEventListener("submit", (event) => {
        event.preventDefault();
        window.alert("Thank you for your input! We will get back to you shortly.");
        document.getElementById("contact-form").reset();
    });


});



async function loadSkills() {
    let allSkills=[];
    try{
        allSkills = await window.apiService.fetchSkills();
        displaySkills(allSkills);
    } catch (error){
        console.error('Failed to load skills: ', error);
        alert('Failed to load skills. Please make sure the server is running.');
    }
}

function displaySkills(skills) {
        const skillGrid = document.getElementById('skill-grid');
        skillGrid.innerHTML='';
        for (const skill of skills) {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            skillCard.innerHTML = `
                    <h3>${skill.title}</h3>
                    <span class="skill-details">
                        <p class="skill-description">${skill.category}</p>
                        <p class="tutor-name">Tutor: ${skill.provider}</p>
                        <p class="price">Price: $${skill.price}/hr</p>
                        <p class="long-description">${skill.description}</p>
                    </span>
                    <button class="button primary-button">Book Now</button>
            `;
            skillGrid.appendChild(skillCard);
        };
};

function calculateTotalCost(hours, rate){
    return ((hours * rate).toFixed(2));
};


//prevents form from submitting and displays an alert message instead
document.addEventListener("DOMContentLoaded", () => {
    const postForm = document.getElementById("post-form");
    postForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const skill = {
            title: document.getElementById("title").value,
            category: document.getElementById("category").value,
            price: parseInt(document.getElementById("price").value),
            provider: document.getElementById("provider").value,
            description: document.getElementById("description").value
        };

        try {
            await window.apiService.createSkill(skill);
            await window.display.loadSkills();
            alert("Skill posted successfully.");
            postForm.reset();

        } catch (error) {
            console.error("Failed to post skill: ", error);
            alert("Failed to post skill. Please try again.");
        }
    });

    document.addEventListener("click", (event) => {
        const button = event.target.closest("button, a, input[type='button'], input[type='submit']");
        if (!button || !/book\s*now/i.test(button.textContent || button.value || "")) return;

        const card = button.closest("article, .tutor-card, .tutor, .card, li") || button.parentElement;
        const rawName = card?.querySelector("[data-tutor-name], .tutor-name, .name")?.textContent.trim()
            || card?.querySelector("h1, h2, h3, h4")?.textContent.trim()
            || button.dataset.tutorName
            || "Tutor name unavailable";
        const name = rawName.replace(/^Tutor\s*:\s*/i, "").trim() || "Tutor name unavailable";
        const rateText = (card?.querySelector("[data-tutor-rate], .tutor-rate, .rate, [class*='price']")?.textContent.trim()
            || button.dataset.tutorRate
            || card?.innerText?.match(/\$\s?\d+(?:\.\d{1,2})?(?:\s*\/\s*(?:hour|hr))?/i)?.[0]
            || "Rate unavailable").replace(/^Price:\s*/i, "");
        
        alert(`You are booking with ${name} for their rate of ${rateText}.`);
    });
    
    });



