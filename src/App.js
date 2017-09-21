import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

//import sortBy from 'sort-by';
//import escapeRegExp from 'escape-string-regexp'
import ListBooks from './ListBooks'

import {Route,Link} from 'react-router-dom'
//import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooksFound from './ListBooksFound'

class BooksApp extends React.Component {
 
  state = {
    books: [],
    query:'',
    showingBooks:[],
    showSearchPage: false
  }
  /** Life cycle event to load data on render*/
  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({books}));
  }
  /** create a shelf for a fetched book */
  createShelf = (book,shelf)=> {
    //update the book in question 
    BooksAPI.update(book, shelf).then(() => {
      book.shelf=shelf
      //remaining books
      let books = this.state.books.filter(x => x.id !== book.id) ; 
     //add updated book to remaining books 
     books.push(book[0])  ;
     //update the state:
     this.setState({
        books:books
     })
    })
    
}
 
  /**adding a book to a specific shelf */
  addBook = (book, shelf) => {   
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
      })
    }
  }

   updateQuery = (query)=> {
     this.setState({query:query})
   }
   /* search a book **/
   searchBook = (query)=> {
    this.state.query=query
    if (this.state.query)
    {
      BooksAPI.search(this.state.query,10)
      .then(searchResults => { 
        searchResults.shelf="None",  
        this.setState({
          showingBooks:searchResults
        })
      })
    } 
   }
  render() {
    
    
     
    return (
      
      <div className="app">
        <Route path="/search" render= {()=> (
          <div className="search-books">
            <div className="search-books-bar">
             
                <Link className="close-search" to="/">Close></Link>
              <div className="search-books-input-wrapper">
                
                <input type="text" 
                       value={this.state.query} 
                       //onChange={(event)=>this.updateQuery(event.target.value)}
                       onChange={(event)=>this.searchBook(event.target.value)}
                       placeholder="Search by title or author"/>
                       
              </div>
            </div>
            <div className="search-books-results">
              <div className="books-grid">
             
                   <ListBooksFound onChangeAddShelf={this.addBook} books={this.state.books} booksFound ={this.state.showingBooks}/> 
              </div>
            </div>
           
          </div>
        )} 
        />
       
        <Route exact path="/" render= {()=> (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              <ListBooks onChangeShelf={this.addBook} statusLabel="Currently Reading" status="currentlyReading" books ={this.state.books}/>
              <ListBooks onChangeShelf={this.addBook} statusLabel="Want to read" status="wantToRead" books ={this.state.books}/>
              <ListBooks onChangeShelf={this.addBook} statusLabel="Read" status="read" books ={this.state.books}/>
                
              </div>
            </div>
            <div className="open-search">
              
              <Link to="/search">Add a book></Link>
            </div>
          </div>) } />
      
      </div>
    )
  }
}

export default BooksApp
