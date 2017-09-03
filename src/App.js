import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import update from 'react-addons-update';

import ListBooksToRead from './ListBooksToRead'
import ListBooksRead from './ListBooksRead'
import ListBooksCurrentRead from './ListBooksCurrentRead'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
 
  state = {
    books: [],
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
  /** filter Books based on their status */
  filterBooks = (cond) => {( this.state.books.filter(book =>book.shelf === cond) )}
  /**adding a book to a specific shelf */
  addTo = (bookId,cond)=> {
    //store init state within var
    const data = this.state.books;
    //book corresponding to the supplied id
    const bookArray = data.filter((bookList)=>bookList.id===bookId); 
    //remaining books
    const restbook = data.filter((bookList)=>bookList.id!==bookId); 
    //get index corresponding to supplied id:
    const bookIndex = data.findIndex(function(e) {
      return e.id === bookId;
     });
    //update book with new shelf value (at index 0 because It's just 1 object)
    
    const updatedBook =update(bookArray, {0:{shelf: {$set: cond} }}  ) 
   
    //then merge:
    const newData =  update(restbook, {$push: updatedBook});
    
    this.setState({
       books:newData
    })
   }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => 
                this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              <ListBooksCurrentRead onChangeShelf={this.addTo} status="currentlyReading" books ={this.state.books}/>
              <ListBooksToRead onChangeShelf={this.addTo} status="wantToRead" books ={this.state.books}/>
              <ListBooksRead onChangeShelf={this.addTo} status="read" books ={this.state.books}/>
                
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
