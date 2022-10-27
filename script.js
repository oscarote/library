// Object constructor
function Book(title, author, pages, read) {
    console.log(this.title);
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let readMsg = null;
        read === "yes" ? (readMsg = "already read") : (readMsg = "not read yet");
        return `${title} by ${author}, ${pages} pages, ${readMsg}`
    }
}
// Testing
let hobbit = new Book("The Hobbit", "JRR Tolkien", 524, "yes");
let edsla = new Book("El Señor de los Anillos", "JRR Tolkien", 5566, "no");

// Library
let myLibrary = [hobbit, edsla];

function addBookToLibrary() {
    //do stuff
}

// Document selectors
const bookCards = document.querySelector(".bookCards");

// Show library on index
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