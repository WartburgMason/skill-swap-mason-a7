// Function to display skills dynamically
function displaySkills(skills) {
        const skillGrid = document.getElementById('skill-grid');
        skillGrid.innerHTML='';
        console.log(skillGrid)
        for (const skill of skills) {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            skillCard.innerHTML = `
                    <h3>${skill.title}</h3>
                    <span class="skill-details">
                        <p class="skill-description">${skill.category}</p>
                        <p class="tutor-name">Tutor: ${skill.tutor}</p>
                        <p class="price">Price: $${skill.price}/hr</p>
                    </span>
                    <button class="button primary-button">Book Now</button>
            `;
            skillGrid.appendChild(skillCard);
        };
};

function calculateTotalCost(hours, rate){
    return ((hours * rate).toFixed(2));
};


//define all skill that will be displayed and filtered.
const skills = [
    {title: "JavaScript", category: "Programming",tutor: "John Doe", price: 20},
    {title: "Python", category: "Programming", tutor: "Jane Smith", price: 25},
    {title: "Web Development", category: "Programming", tutor: "Bob Johnson", price: 0},
    {title: "Guitar Lessons", category: "Music", tutor: "Alice Brown", price: 15},
    {title: "Italian Cooking", category: "Cooking", tutor: "Mario Rossi", price: 30},
    {title: "Yoga Instruction", category: "Fitness", tutor: "Sarah Davis", price: 20}
];
function filterSkillsByCategory(skills, category) {
    if (category === 'All') {
        return skills;
    }
    else{
        return skills.filter(skill => skill.category === category);
    }
};
function filterSkillsByPrice(skills, maxRate) {
    if (maxRate===''){
        return skills;
    }
    else{
        return skills.filter(skill => skill.price <= maxRate);
    };
};

function matchSkills(userneeds, skills){
    categoryFilterList=filterSkillsByCategory(skills, userneeds.category);
    finalFilterList=filterSkillsByPrice(categoryFilterList, userneeds.maxPrice);
    return finalFilterList;
};
//module line for Jest testing
//module.exports = {filterSkillsByCategory, calculateTotalCost, matchSkills};
//Waits for DOM to load and does initial display and sets event listener to dropdown for category filter

document.addEventListener("DOMContentLoaded", () => {
    displaySkills(skills)
    document.getElementById("skill-filter").addEventListener("change", function() {
        categ=document.getElementById("skill-filter").value;
        displaySkills(filterSkillsByCategory(skills, categ));
    });
    
    document.getElementById('hours').addEventListener("change", function(){
        hours=document.getElementById('hours').value;
        rate=document.getElementById('rate').value;
        amount=calculateTotalCost(hours, rate)
        resultBox=document.getElementById('cost-result')
        resultBox.innerHTML = `$${amount}`;
    });
    document.getElementById('rate').addEventListener("change", function(){
        hours=document.getElementById('hours').value;
        rate=document.getElementById('rate').value;
        amount=calculateTotalCost(hours, rate)
        resultBox=document.getElementById('cost-result')
        resultBox.innerHTML = `$${amount}`;
    });
    document.getElementById('find-matches').addEventListener("click", function(){
        FMcateg=(document.getElementById("FMskill-filter")).value;
        maxRate=(document.getElementById("max-rate")).value;
        userneeds={category: FMcateg, maxPrice: maxRate};
        displaySkills(matchSkills(userneeds, skills));
    });
});
