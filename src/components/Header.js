import {useState} from 'react'
import axios from 'axios';
import "./Header.css"
import { Button,TextField } from '@mui/material';
function Header() {

    const [book,setBook] = useState("");
    const [result,setResult] = useState([]);
    
    const apiKey = "AIzaSyBkDqtv_cQcsKogS2Tlq6ERJsHtdhTy9ko";
    
    function handleChange(e){
        const book = e.target.value
        setBook(book);
    }

    function handleSubmit(e){
        e.preventDefault()
        
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${apiKey}&maxResults=40`).then(res => {
            console.log(res.data.items);
            setResult(res.data.items)
        }
        )
    }


   



  return (
    <div className='main'>
        <div className='head'>
        <h2>Book Search</h2>
        
        <form onSubmit={handleSubmit}>
            <div className='search'>
            <TextField
                className='input'
                id="outlined-name"
                label=""
                value={book}
                size="small"
                onChange={handleChange}
                style={{width:'200px', backgroundColor:'white', borderRadius:'5px',boxShadow:'0 0 15px 0 green'}}
             
            />
             <Button variant="contained" color="success" size='medium'>
                    Search
            </Button>
            </div>
            
            
        </form>
        </div>
        {result.map(book => (
           <div className='result'>
            <img src={book.volumeInfo.imageLinks === undefined
                ? "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png"
                : `${book.volumeInfo.imageLinks.thumbnail}`} alt={book.title}/>
                <br />
                <div>
                <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">Preview</a>
                </div>
                <br />
                <span>{book.volumeInfo.title}</span>
                
                <span>{book.volumeInfo.authors}</span>
            </div>
        ))}
       
    </div>
  )
}

export default Header