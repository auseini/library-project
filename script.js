//array to hold all books for library
let myLibrary = JSON.parse(localStorage.getItem("myLibrary") || "[]");



//location to bookHolder div
const bookHolder = document.getElementById("bookHolder");
//var to hold author input
const author = document.getElementById("author");
//var to hold title input
const title = document.getElementById("title");
//var to hold num poages
const pages = document.getElementById("pages");
//var to hold completed status
const completed = document.getElementById("completed");
//reference to book count log
const totalBooks = document.getElementById("total");
//regerence to books read log
const booksRead = document.getElementById("read");
let numRead = 0;


//call func to update display
updateDisplay();
countBooksRead();

//book class and constructor
class Book {
	constructor(
		title = "Unknown",
		author = "Unknown",
		numPages = 0,
		hasRead = false
	){
		this.title = title;
		this.author = author;
		this.numPages = numPages;
		this.hasRead = hasRead;
		this.id = myLibrary.length + 1;
	}
}

//function to create book
function createBook(){
	//create book element
	const book = new Book(
		title.value,
		author.value,
		+pages.value,
		completed.value === "true"
	);
	console.log(book.hasRead);
	console.log(completed.value);
	//check if book is completed
	if(book.hasRead){
		
		console.log("yanny");
		booksRead.textContent = ++numRead;
	}

	//add book to array
	myLibrary.push(book);
	console.log(myLibrary);
	//closeForm after adding new book
	closeForm();
	//update display
	updateDisplay();
}

//function to add book to library
function addBookToLibrary(book){
	//create necessary elements for book card
	const bookCard = document.createElement("div");
	const bookCardInner = document.createElement("div");
	const bookCardFront = document.createElement("div");
	const bookCardBack = document.createElement("div");

	//call function to give div prober classes
	setClasses(bookCard, bookCardInner, bookCardFront, bookCardBack);
	//give id to bookcard id
	bookCard.setAttribute("id", book.id);
	//set parents of divs
	setParents(bookCard, bookCardInner, bookCardFront, bookCardBack);

	//create text attributes and add them to correct side of card
	//create title element
	const titleEl = document.createElement("p");
	titleEl.setAttribute("lang","en");
	titleEl.setAttribute("class", "bookTitle");
	titleEl.textContent = book.title;
	bookCardFront.appendChild(titleEl);

	//elements for bookCardBack
	//author element
	const authorEl = document.createElement("p");
	authorEl.setAttribute("lang","en");
	authorEl.textContent = "Author: " + book.author;
	bookCardBack.appendChild(authorEl);

	//pages element
	const pagesEl = document.createElement("p");
	pagesEl.setAttribute("lang","en");
	pagesEl.textContent = "Pages:" + book.numPages;
	bookCardBack.appendChild(pagesEl);

	//book number
	const bookNum = document.createElement("p");
	bookNum.setAttribute("lang", "en");
	bookNum.textContent = "Book #: " + book.id;
	bookCardBack.append(bookNum);

	//finished text
	const finished = document.createElement("p");
	finished.setAttribute("lang", "el");
	finished.textContent = "Completed?";
	bookCardBack.appendChild(finished);

	//has read input
	const readInput = document.createElement("input");
	readInput.setAttribute("type", "checkbox");
	readInput.addEventListener("change", updateBooksRead);
	readInput.setAttribute("checked", book.hasRead);
	bookCardBack.appendChild(readInput);

	//remove button
	const del = document.createElement("button");
	del.addEventListener("click", deleteBook);
	del.setAttribute("class", "delete");
	del.textContent = "Delete";
	bookCardBack.appendChild(del);

	
	//add book to book holder
	bookHolder.appendChild(bookCard);
	
}
//function to update display
function updateDisplay(){
	
	//delete all book cards
	deleteBookCards();

	//clear local storage and reset storage 
	localStorage.clear;
	localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

	//display books on screen
	for(let i = 0; i < myLibrary.length; i++){
		myLibrary[i].id = i + 1;
		console.log(myLibrary[i].id);
		addBookToLibrary(myLibrary[i]);
		bookHolder.childNodes
	}
	//update log
	totalBooks.textContent = myLibrary.length;
}
//function to delete all bookCards
function deleteBookCards(){
	for(const x of myLibrary){
		const book = document.getElementById("" + x.id);
	
		//check if book exists 
		if(book){
			bookHolder.removeChild(book);
		}
		
	}
}
//function to delete book
function deleteBook(e){
	//get reference to bookCard element
	const bookCard = e.target.parentNode.parentNode.parentNode;
	const book = myLibrary[+bookCard.id - 1];

	if(confirm("Are you sure?")){
		if(book.hasRead){
			booksRead.textContent = --numRead;
		}
		bookHolder.removeChild(bookCard);
		myLibrary.splice(+bookCard.id-1, 1);
		updateDisplay();
	}
}
//function to update books read
function updateBooksRead(e){
	console.log(e.target);
	let id = e.target.parentNode.parentNode.parentNode.id - 1;

	if(e.target.checked){
		booksRead.textContent = ++numRead;
	} else {
		booksRead.textContent = --numRead;
	}
	myLibrary[+id].hasRead = !myLibrary[+id].hasRead;

	//update local storage
	localStorage.clear();
	localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}
//function to count num of books read at beginning
function countBooksRead(){
	for(let book of myLibrary){
		if(book.hasRead){
			numRead++;
		}
	}
	booksRead.textContent = numRead;	
}
//function to set classes of divs
function setClasses(bookCard, bookCardInner, bookCardFront, bookCardBack){
	bookCard.classList.add("bookCard");
	bookCardInner.classList.add("bookCardInner");
	bookCardFront.classList.add("bookCardFront");
	bookCardBack.classList.add("bookCardBack");
}//function to set partents of book card divs
function setParents(bookCard, bookCardInner, bookCardFront, bookCardBack){
	bookCard.appendChild(bookCardInner);
	bookCardInner.appendChild(bookCardFront);
	bookCardInner.appendChild(bookCardBack);
	bookHolder.appendChild(bookCard);
}
//functions to open and close creation form
function openForm(){
	document.getElementById("createForm").style.display = "flex";
}
function closeForm(){
	document.getElementById("createForm").style.display = "none";
	resetForm();
}
//function to reset text input fioelds of book form
function resetForm(){
	document.forms["form"].reset();
}