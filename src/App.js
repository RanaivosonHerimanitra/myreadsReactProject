import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import update from 'react-addons-update';
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
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }
  /** Life cycle event to load data on render*/
  componentDidMount() {
    BooksAPI.getAll().then( (books)=>{
      this.setState ({books:books})
    })
  }
  /** create a shelf for a fetched book */
  createShelf = (book,shelf)=> {
    //update the book in question 
    BooksAPI.update(book, shelf).then(() => {
      book[0]["shelf"]=shelf
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
        book[0].shelf = shelf
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
      })
    }
  }

   updateQuery = (query)=> {
     this.setState({query:query.trim()})
   }
  render() {
    
    if (this.state.query)
      {
       
        BooksAPI.search(this.state.query,10)
        .then(searchResults => {   
          this.setState({
            showingBooks:searchResults
          })
        })
      } 
     
    return (
      
      <div className="app">
        <Route path="/create" render= {()=> (
          <div className="search-books">
            <div className="search-books-bar">
              {/*<a className="close-search" onClick={() => 
                this.setState({ showSearchPage: false })}>Close</a> **/}
                <Link className="close-search" to="/">Close></Link>
              <div className="search-books-input-wrapper">
                
                <input type="text" 
                       value={this.state.query} 
                       onChange={(event)=>this.updateQuery(event.target.value)}
                       placeholder="Search by title or author"/>
                       
              </div>
            </div>
            <div className="search-books-results">
              <div className="books-grid">
             
                   <ListBooksFound onChangeAddShelf={this.createShelf} books={this.state.books} booksFound ={this.state.showingBooks}/> 
              </div>
            </div>
           
          </div>
        )} 
        />
        {/* {this.state.showSearchPage ? 
        **/}
          
        
      {/*  ) : ( **/}
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
              {/* <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a> **/}
              <Link to="/create">Add a book></Link>
            </div>
          </div>) } />
      {/*  )} **/}
      </div>
    )
  }
}

export default BooksApp
