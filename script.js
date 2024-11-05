function searchBooks() {
    const searchInput = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    
    
    resultsDiv.innerHTML = '';
    
    
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchInput)}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                data.items.forEach(book => {
                    const bookInfo = book.volumeInfo;
                    const title = bookInfo.title;
                    const authors = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author';
                    
                    const bookElement = document.createElement('div');
                    bookElement.innerHTML = `
                        <h3>${title}</h3>
                        <p>By: ${authors}</p>
                        <hr>
                    `;
                    resultsDiv.appendChild(bookElement);
                });
            } else {
                resultsDiv.innerHTML = '<p>No books found</p>';
            }
        })
        .catch(error => {
            resultsDiv.innerHTML = '<p>Error fetching books</p>';
            console.error('Error:', error);
        });
} 
