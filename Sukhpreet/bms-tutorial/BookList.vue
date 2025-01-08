<template>
  <h2 class="title">Books</h2>
  <div class="container-books">
    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by book name, author, or ISBN"
        class="search-input"
      />
    </div>

    <button v-if="isLibrarian" class="add-btn-toggle" @click="toggleForm">
      {{ showForm ? "Close Form" : "+Add Book" }}
    </button>

     <div class="latest-btn-direction">
       <button class="latest-books-btn" @click="toggleLatestBooksModal">
         Show Latest Books
        </button>
      </div>

    <div class="book-list">
      <div v-if="showForm" class="modal-overlay" @click.self="toggleForm">
        <div class="modal-content">
          <button class="close-button" @click="toggleForm">✖</button>
          <add-book @book-added="handleBookAdded" />
        </div>
      </div>

      <div
        v-for="book in paginatedBooks"
        :key="book.name"
        class="book-card"
        @click="navigateToBookDetails(book.name)"
      >
        <img :src="book.image" alt="Book Image" v-if="book.image" />
        <div>
          <h3>{{ book.name }}</h3>
          <p><strong>Author:</strong> {{ book.author || "Unknown" }}</p>
          <p>
            <strong>Status:</strong>
            <span :class="book.status === 'Available' ? 'text-green' : 'text-red'">
              {{ book.status || "N/A" }}
            </span>
          </p>
          <p><strong>ISBN:</strong> {{ book.isbn || "N/A" }}</p>
        </div>
      </div>

      <div v-if="hasMoreBooks" class="load-more-container">
        <button class="load-more-btn" @click="loadMoreBooks">Load More</button>
      </div>
    </div>
  </div>

  <div v-if="showLatestBooksModal" class="modal-overlay" @click.self="toggleLatestBooksModal">
    <div class="modal-content">
      <button class="close-button" @click="toggleLatestBooksModal">✖</button>
      <h3 class="btn-latest">Latest Books</h3>
      <ol class="latest-list-ol">
        <li v-for="book in latestBooks" :key="book.name">
          <img :src="book.image" alt="Book Image" v-if="book.image" class="latest-cover-book"/>
          <div class="latest-content">
            <strong>{{ book.name }}</strong> <br> by {{ book.author || "Unknown" }}
          </div>
          
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AddBook from "./AddBook.vue";

export default {
  name: "BookList",
  components: {
    AddBook,
  },
  data() {
    return {
      books: [],
      searchQuery: "",
      showForm: false,
      displayedBooksCount: 10,
      isLibrarian: false,
      showLatestBooksModal: false,
      latestBooks: [], 
    };
  },
  computed: {
    filteredBooks() {
      const query = this.searchQuery.toLowerCase();
      return this.books.filter(
        (book) =>
          book.name.toLowerCase().includes(query) ||
          (book.author && book.author.toLowerCase().includes(query)) ||
          (book.isbn && book.isbn.toLowerCase().includes(query))
      );
    },
    paginatedBooks() {
      return this.filteredBooks.slice(0, this.displayedBooksCount);
    },
    hasMoreBooks() {
      return this.filteredBooks.length > this.displayedBooksCount;
    },
  },
  mounted() {
    this.fetchBooks();
    this.checkIfLibrarian();
  },
  created() {
  this.checkIfLibrarian();
},
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get(
          "http://books.localhost:8002/api/resource/Book",
          {
            params: {
              fields: JSON.stringify([
                "name",
                "author",
                "image",
                "status",
                "isbn",
                "description",
              ]),
            },
          }
        );
        this.books = response.data.data;
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
    handleBookAdded() {
      this.fetchBooks();
      this.toggleForm();
    },
    navigateToBookDetails(bookId) {
      this.$router.push(`/book/${bookId}`);
    },
    loadMoreBooks() {
      this.displayedBooksCount += 10;
    },
    async checkIfLibrarian() {
      try {
        const response = await axios.get(
          "http://books.localhost:8002/api/method/books_management.api.user_role",{
      headers: {
        Authorization: `token api key:api secret key`,
      },
    }
        );
        console.log("API Response:", response.data);
        if (response.data.message.role === "Librarian") {
          this.isLibrarian = true;
          console.log("User is a Librarian:", this.isLibrarian);

        }else {
      console.log("User is not a Librarian:", this.isLibrarian);
    }
      } catch (error) {
        console.error("Error checking user role:", error);
        alert("You do not have permission to access this resource.");
      }
    },
    toggleLatestBooksModal() {
      this.showLatestBooksModal = !this.showLatestBooksModal;
      if (this.showLatestBooksModal) {
        this.fetchLatestBooks();
      }
    },
    async fetchLatestBooks() {
      try {
        const response = await axios.get(
          "http://books.localhost:8002/api/resource/Book",
          {
            params: {
              fields: JSON.stringify(["name", "author","image"]),
              order_by: "creation desc", 
              limit_page_length: 5, 
            },
          }
        );
        this.latestBooks = response.data.data;
      } catch (error) {
        console.error("Error fetching latest books:", error);
      }
    },
  },
};
</script>

<style>
body {
  background-color: #121212; 
  color: #ffffff; 
  font-family: Arial, cursive;
  margin: 0;
  padding: 0;
}
.title{
  text-align: center;
  font-size: xx-large;
}
.container-books{
  margin-right:20%;
  margin-left: 20%; 
}
.book-list {
  display: flex;
  flex-direction: column; 
  gap: 20px; 
  padding: 20px;
}

.book-card {
  display: flex; 
  align-items: center; 
  background-color: #1e1e1e; 
  color: #ffffff; 
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3); 
  padding: 15px;
  overflow: hidden;
  cursor: pointer;
}

.book-card img {
  width: 150px; 
  height: 200px; 
  border-radius: 6px;
  margin-right: 20px; 
}

.book-card h3 {
  margin: 0 0 10px 0;
  font-size: 20px;
  font-weight: bold;
}

.book-card p {
  margin: 5px 0;
  text-align: left;
}

.book-card div {
  flex: 1; 
}

.text-green {
  color: #4caf50; 
  font-weight: bold;
}

.text-red {
  color: #f44336; 
  font-weight: bold;
}
.add-btn-toggle{
  background-color: #4c4646;
  color: #fff;
  border-radius: 5px;
  border: none;
  padding: 10px;
  margin-top: 2px;
  cursor: pointer;
}
.modal-overlayy {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #1e1e1e; 
  color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
}

.close-button:hover {
  color: #f44336; 
}
.search-container {
  margin: 20px;
  text-align: center;
}

.search-input {
  width: 80%;
  max-width: 500px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: #1e1e1e;
  color: #fff;
}

.search-input::placeholder {
  color: #bbb;
}
.load-more-btn {
  background-color: #1e1e1e;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 5px;
}

.load-more-btn:hover {
  background-color: #4c4646;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.latest-list-ol li{
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 2px solid #121212;
}
.latest-list-ol{
 margin: 0;
}
.latest-content{
  display:inline-block;
  align-items: center;
}
.modal-content {
  background: #1e1e1e;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}
.latest-cover-book{
  width: 100px;
  margin-bottom: 5px;
  border-radius: 5px;
}
.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  float: right;
}

.latest-books-btn {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #1e1e1e;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
.latest-btn-direction{
  text-align: end;
}
.latest-books-btn:hover {
  background-color: #4c4646;
}
@media screen and (max-width: 768px) {
  .book-card {
    width: 100%;
    overflow:scroll;
  }
}

@media screen and (max-width: 480px) {
  .book-card {
    width: 100%;
    overflow:scroll;
  }
}
</style>
