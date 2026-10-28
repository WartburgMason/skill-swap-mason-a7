


//prevents form from submitting and displays an alert message instead
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("form").forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            window.alert("Thank you for your input! We will get back to you shortly.");
            form.reset();
        });
    });


});


document.addEventListener("DOMContentLoaded", () => {
    const bookNowButtons = document.querySelectorAll("div.skill-grid button");
    bookNowButtons.forEach((button) => {
        button.addEventListener("click", () => {
                const card = button.closest(".skill-card, .skill, article, li") || button.parentElement;
                const priceElement = card?.querySelector("[data-price], .price");
                const tutorElement = card?.querySelector("[data-tutor-name], .tutor-name");
                untrimprice=priceElement ? priceElement.textContent.trim() : "N/A";
                const price = untrimprice.replace(/^Price:\s*/, "");
                tutor=tutorElement ? tutorElement.textContent.trim() : "N/A";
                window.alert(`You have booked a session with ${tutor} for ${price}. We will contact you shortly to confirm the details.`);
        });
    });
});