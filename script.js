// Object constructor
function Book(title, author, pages, read) {
    console.log(this.title);
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let readMsg = null;
        read === "on" ? (readMsg = "already read") : (readMsg = "not read yet");
        return `${title} by ${author}, ${pages} pages, ${readMsg}`
    }
}

// Close modal
function closeModal() {
    modalDiv.classList.remove("active");
    overlayDiv.classList.remove("active");
}

// Document selectors
const bookCards = document.querySelector(".bookCards");
const modalDiv = document.getElementById("addBookModal");
const overlayDiv = document.querySelector(".overlay");
const addBookBtn = document.getElementById("addBook");
const submitBtn = document.querySelector("button[type=\"submit\"]");

// Event listeners
addBookBtn.addEventListener("click", () => {
    modalDiv.classList.add("active");
    overlayDiv.classList.add("active");
});

overlayDiv.addEventListener("click", closeModal);

window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal() });

submitBtn.addEventListener("click", addBookToLibrary);

// Library
let myLibrary = [];

function addBookToLibrary(e) {
    e.preventDefault();
    myLibrary.push(new Book(document.getElementById("title").value, document.getElementById("author").value, document.getElementById("pages").value, document.getElementById("isRead").value));
    console.log(document.getElementById("isRead").value);
    closeModal();
    refreshLibrary();
}

// Show library on index
function refreshLibrary() {
    bookCards.innerText = "";
    for (let book in myLibrary) {
        const singleCard = document.createElement("div");
        singleCard.className = "card";

        for (const [key, value] of Object.entries(myLibrary[book])) {
            if (key === "info") break;
            const h4 = document.createElement("h4");
            h4.innerText = key;
            singleCard.appendChild(h4);

            const para = document.createElement("p");
            para.innerText = value;
            singleCard.appendChild(para);
        }

        bookCards.appendChild(singleCard);
    }
}

// First load
refreshLibrary();