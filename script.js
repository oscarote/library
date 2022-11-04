// Class declaration for book
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    get info() {
        return this.isReadMsg();
    }

    isReadMsg() {
        let readMsg = null;
        this.read === true ? (readMsg = "already read") : (readMsg = "not read yet");
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readMsg}`
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
    const errorMsg = document.querySelector(".errorMsg");
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("isRead").checked;
    if (myLibrary.some(item => item.title === title)) {
        errorMsg.innerText = "This book is already in the library";
        return;
    }
    myLibrary.push(new Book(title, author, pages, read));
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
    const dataAtt = this.closest("div").getAttribute("data-attribute");
    if (this.getAttribute("class") === "read") {
        myLibrary[dataAtt].read = false;
    } else {
        myLibrary[dataAtt].read = true;
    }
    refreshLibrary();
}

function deleteCard() {
    if (confirm("Are you sure?")) {
        const dataAtt = this.closest("div").getAttribute("data-attribute");
        myLibrary.splice(dataAtt, 1);
        refreshLibrary();
    } else {
        alert("Book was not removed");
    }
}