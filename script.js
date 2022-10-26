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