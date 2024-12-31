<template>
  <div class="book-form">
    <h2>Add a New Book</h2>
    <form @submit.prevent="addBook">
      <div>
        <label for="book_name">Book Name</label>
        <input v-model="book.book_name" type="text" id="book_name" required />
      </div>
      <div>
        <label for="author">Author</label>
        <input v-model="book.author" type="text" id="author" required />
      </div>
      <div>
        <label for="isbn">ISBN</label>
        <input v-model="book.isbn" type="text" id="isbn" required />
      </div>
      <div>
        <label for="status">Status</label>
        <select v-model="book.status" id="status" required>
          <option value="Available">Available</option>
          <option value="Issued">Issued</option>
        </select>
      </div>
      <div>
        <label for="image">Image</label>
        <!-- <input @change="handleFileUpload" type="file" id="image" /> -->
        <!-- <input v-model="bookImageURL" placeholder="Enter Image URL" /> -->
        <input type="text" id="image" v-model="book.image" class="form-control" placeholder="Enter Image URL" />

      </div>
      <div>
        <label for="publisher">Publisher</label>
        <input v-model="book.publisher" type="text" id="publisher" />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea v-model="book.description" id="description"></textarea>
      </div>
      <div>
        <label for="route">Route</label>
        <input v-model="book.route" type="text" id="route" />
      </div>
      <div>
        <label for="published">Published</label>
        <input v-model="book.published" type="checkbox" id="published" />
      </div>
      <button type="submit">Add Book</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddBook',
  data() {
    return {
      book: {
        book_name: '',
        author: '',
        isbn: '',
        status: 'Available', // Default status
        image: '', // For file upload
        publisher: '',
        description: '',
        route: '',
        published: false, // Checkbox for Published
      },
    };
  },
  methods: {
    // onFileChange(event) {
    //   const file = event.target.files[0];
    //   if (file) {
    //     this.book.image = file;
    //   }
    // },
    async addBook() {
      try {
        // Create a FormData object to handle file upload
        const formData = new FormData();

      formData.append('doctype', 'Book');
      formData.append('book_name', this.book.book_name);
      formData.append('author', this.book.author);
      formData.append('isbn', this.book.isbn);
      formData.append('status','Available');
      formData.append('publisher', this.book.publisher);
      formData.append('description', this.book.description);
      formData.append('route', this.book.route);
      formData.append('published', true);

if (this.book.image) {
  formData.append('image', this.book.image);  // Ensure the image file is being appended correctly
}

        // Send the POST request to Frappe API
        const response = await axios.post(
          'http://books.localhost:8002/api/resource/Book',
          formData,
          {
            headers: {
              Authorization: 'token  api key:api secret key', 
              //  'Content-Type': 'application/json', // Correct content type for file upload
            },
          }
        );

        console.log('Book added successfully', response.data);

        this.$emit('book-added');
        this.resetForm();
      } catch (error) {
        console.error('Error adding book:', error.response?.data || error.message);
      }
    },
    resetForm() {
      this.book = {
        book_name: '',
        author: '',
        isbn: '',
        status: 'Available',
        image: null,
        publisher: '',
        description: '',
        route: '',
        published: false,
      };
    },
  },
};
</script>

<style scoped>
.book-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
  /* border: 1px solid #ccc; */
  border-radius: 8px;
  background-color: #1e1e1e;
}

.book-form h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.book-form form div {
  margin-bottom: 1rem;
}

.book-form label {
  color: #fff;
  display: block;
  margin-bottom: 0.5rem;
}

.book-form input,
.book-form select,
.book-form textarea {
  background-color: #1e1e1e;
  color: #fff;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.book-form button {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.book-form button:hover {
  background-color: #0056b3;
}
</style>
