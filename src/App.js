import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import update from 'react-addons-update';
import sortBy from 'sort-by';
import escapeRegExp from 'escape-string-regexp'
import ListBooksToRead from './ListBooksToRead'
import ListBooksRead from './ListBooksRead'
import ListBooksCurrentRead from './ListBooksCurrentRead'
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
  /** create a shelf for a specific book */
  createShelf = (bookId,cond)=> {
     //store init state within var
     const data = this.state.showingBooks;
     //book corresponding to the supplied id
     var bookArray = data.filter((bookList)=>bookList.id===bookId); 
     bookArray[0]["shelf"]=cond
     
    
    //then merge with current list:
    const newData =  update(this.state.books, {$push: bookArray});
    
    this.setState({
       books:newData
    })
  }
  /**adding a book to a specific shelf */
  addTo = (bookId,cond)=> {
    //store init state within var
    const data = this.state.books;
    //book corresponding to the supplied id
    const bookArray = data.filter((bookList)=>bookList.id===bookId); 
    //remaining books
    const restbook = data.filter((bookList)=>bookList.id!==bookId); 
    //get index corresponding to supplied id:
    //const bookIndex = data.findIndex(function(e) {
     // return e.id === bookId;
     //});
    //update book with new shelf value (at index 0 because It's just 1 object)
    
    const updatedBook =update(bookArray, {0:{shelf: {$set: cond} }}  ) 
   
    //then merge:
    const newData =  update(restbook, {$push: updatedBook});
    
    this.setState({
       books:newData
    })
   }
   updateQuery = (query)=> {
     this.setState({query:query.trim()})
   }
  render() {
    
    if (this.state.query)
      {
        const match = new RegExp(escapeRegExp(this.state.query),'i')
        BooksAPI.search(this.state.query,10)
        .then(searchResults => {   
           //searchResults.filter((books)=>match.test(books.title) || match.test(books.authors[0])) 
           //console.log(searchResults)
          this.setState({
            showingBooks:searchResults
          })
        })
      } 
     
    return (
      
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => 
                this.setState({ showSearchPage: false })}>Close</a>
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
        
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              <ListBooksRead onChangeShelf={this.addTo} statusLabel="Currently Reading" status="currentlyReading" books ={this.state.books}/>
              <ListBooksRead onChangeShelf={this.addTo} statusLabel="Want to read" status="wantToRead" books ={this.state.books}/>
              <ListBooksRead onChangeShelf={this.addTo} statusLabel="Read" status="read" books ={this.state.books}/>
                
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
