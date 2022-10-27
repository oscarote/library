// Object constructor
function Book(title, author, pages, read) {
    console.log(this.title);
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        let readMsg = null;
        read === "true" ? (readMsg = "already read") : (readMsg = "not read yet");
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
const formElement = document.getElementById("addBookForm");


// Event listeners
addBookBtn.addEventListener("click", () => {
    modalDiv.classList.add("active");
    overlayDiv.classList.add("active");
});

overlayDiv.addEventListener("click", closeModal);

window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal() });

formElement.addEventListener("submit", (e) => addBookToLibrary(e));

// Library
let myLibrary = [];

function addBookToLibrary(e) {
    e.preventDefault();
    const tittle = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("isRead").checked;
    myLibrary.push(new Book(tittle, author, pages, read));
    closeModal();
    document.getElementById("addBookForm").reset();
    refreshLibrary();
}

// Show library on index
function refreshLibrary() {
    bookCards.innerText = "";
    for (let book in myLibrary) {
        const singleCard = document.createElement("div");
        singleCard.className = "card";
        singleCard.setAttribute("data-attribute", book);

        for (const [key, value] of Object.entries(myLibrary[book])) {
            if (key === "info") break;
            if (key === "read") {
                const readBtn = document.createElement("button");
                if (value === true) {
                    readBtn.className = "read";
                    readBtn.innerText = "Read";
                } else {
                    readBtn.className = "notRead";
                    readBtn.innerText = "Not read";
                }
                singleCard.appendChild(readBtn);
                readBtn.addEventListener("click", toggleRead);
            } else {
                const h4 = document.createElement("h4");
                h4.innerText = key;
                singleCard.appendChild(h4);

                const para = document.createElement("p");
                para.innerText = value;
                singleCard.appendChild(para);
            }
        }

        const removeBtn = document.createElement("button");
        removeBtn.className = "removeCard";
        removeBtn.innerText = "Remove";
        singleCard.appendChild(removeBtn);
        removeBtn.addEventListener("click", deleteCard);

        bookCards.appendChild(singleCard);
    }
}

// Card buttons
function toggleRead() {
    console.log(this.getAttribute("class"));
    const dataAtt = this.closest("div").getAttribute("data-attribute");
    if (this.getAttribute("class") === "read") {
        myLibrary[dataAtt].read = false;
    } else {
        myLibrary[dataAtt].read = true;
    }
    refreshLibrary();
}

function deleteCard() {
    console.log(this.closest("div").getAttribute("data-attribute"));
    const dataAtt = this.closest("div").getAttribute("data-attribute");
    myLibrary.splice(dataAtt, 1);
    refreshLibrary();
}