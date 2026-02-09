const dialog = document.querySelector('dialog');
const btnAdd = document.querySelector('.btn-add');
const result = document.querySelector('.result');

class Book{
    #id;

    constructor (title, author, pages, read){
        this.#id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    get id(){
        return this.#id;
    }

}

class Library{

    #books;

    constructor(){
        this.#books = [];
    }

    add(newbook){
        this.#books.push(newbook);
    }

    delate(index){
        this.#books.splice(index, 1);
        this.render();
    }

    render(){
        let cardBook = '';

        this.#books.forEach((book, index) => {
            cardBook += `
            <article>
                <p>id: ${book.id}</p>
                <p>title: ${book.title}</p>
                <p>author: ${book.author}</p>
                <p>pages: ${book.pages}</p>
                <p>status: ${book.read}</p>
                <button data-index = "${index}" class="btn-delete">delate</button>
            </article>
            `;
        });

        result.innerHTML = cardBook;
    }
}

const myLibrary = new Library();

btnAdd.addEventListener('click', () => dialog.showModal());

dialog.addEventListener('close', () => {

    if (dialog.returnValue === 'add') {

        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const pages = document.querySelector('#pages').value;
        const status = document.querySelector('#status').value;

        const newBook = new Book(title, author, pages, status);
        myLibrary.add(newBook);
        myLibrary.render();
    }
});

result.addEventListener('click', (e) => {

    if (e.target.classList.contains('btn-delete')){
        
        const index = e.target.getAttribute('data-index');

        myLibrary.delate(index);
    }
});

const book1 = new Book('Anonimus', 'X', 221, 'read');
const book2 = new Book('elias', 'elias', 221, 'not-read');

myLibrary.add(book1);
myLibrary.add(book2);
myLibrary.render();