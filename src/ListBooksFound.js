import React, {Component} from 'react'

class ListBooksFound extends Component {
    render() {
        return(
          
        <div className="bookshelf">
          <h2 className="bookshelf-title"></h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
            {  this.props.booksFound  
              .map(
                (book)=> 
                ( 
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>  
                                    </div>
                                       <div className="book-shelf-changer">
                                         
                                         <select value={book.shelf} onChange={event => 
                                              this.props.onChangeAddShelf(book, event.target.value)}>
                                             <option value="none" disabled>{book.shelf === 'none' ? 'Add' : 'Move'} to...</option>
                                             <option value="currentlyReading">Currently Reading</option>
                                             <option value="wantToRead">Want to Read</option>
                                             <option value="read">Read</option>{book.shelf !== 'none' && 
                                                                                <option value="none">None</option>}
                                         </select>
                                       </div>
                                </div>
                                      <div className="book-title">{book.title}</div>
                                      <div className="book-authors">{book.authors ? book.authors[0] : ''}</div>
                            </div>
                        </li>  
                    
                )
             )
            }
            </ol>
                </div>

        </div>)
    }
 }
export default ListBooksFound