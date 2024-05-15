class DataServices {

    addBook({ formData }) {
        // POST request to add new book
        // fetch('http://localhost:3000/books', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(formData)
        // })

        setPostData(formData);

    }

}


export default DataServices