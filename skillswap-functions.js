// Function to display skills dynamically

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


//define all skill that will be displayed and filtered.
let allSkills=[];
async function loadSkills() {
    try{
        allSkills = await window.apiService.fetchSkills();
        displaySkills(allSkills);
    } catch (error){
        console.error('Failed to load skills: ', error);
        alert('Failed to load skills. Please make sure the server is running.');
    }
}


function filterSkillsByCategory(skills, category) {
    console.log(skills);
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

function matchSkillsToUser(userneeds, skills){
    categoryFilterList=filterSkillsByCategory(skills, userneeds.category);
    finalFilterList=filterSkillsByPrice(categoryFilterList, userneeds.maxPrice);
    return finalFilterList;
};
//module line for Jest testing
module.exports = {filterSkillsByCategory, calculateTotalCost, matchSkillsToUser};
//Waits for DOM to load and does initial display and sets event listener to dropdown for category filter

document.addEventListener("DOMContentLoaded", () => {
    loadSkills();
    document.getElementById("skill-filter").addEventListener("change", function() {
        categ=document.getElementById("skill-filter").value;
        displaySkills(filterSkillsByCategory(allSkills, categ));
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
        displaySkills(matchSkillsToUser(userneeds, allSkills));
    });
});
window.display ={displaySkills, loadSkills}