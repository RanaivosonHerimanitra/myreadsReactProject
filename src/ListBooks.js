import React, {Component} from 'react'

class ListBooks extends Component {
    render() {
        return(
          
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.statusLabel}</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">

            {  this.props.books
              .filter(book=> {return book.shelf === this.props.status} )
              .map(
                (book)=> 
                ( 
                
                        <li key={book.title}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>  
                                    </div>
                                       <div className="book-shelf-changer">
                                         <select id="shelfstat" >
                                           <option  value="none" disabled>Move to...</option>
                                           <option onClick={()=>this.props.onChangeShelf(`${book.id}`,"wantToRead")} 
                                               value="wantToRead">Want to Read</option>
                                           <option onClick={()=>this.props.onChangeShelf(`${book.id}`,"currentlyReading")} value="currentlyReading">Currently Reading</option>
                                           <option onClick={()=>this.props.onChangeShelf(`${book.id}`,"read")} value="Read">Read</option>
                                           <option value="none">None</option>
                                         </select>
                                       </div>
                                </div>
                                      <div className="book-title">{book.title}</div>
                                      <div className="book-authors">{book.authors[0]}</div>
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
export default ListBooks