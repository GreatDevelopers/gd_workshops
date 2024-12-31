<template>
  <div class="book-details">
    <button class="back-btn" @click="$router.push('/')">Back</button>
    <div class="specific-book-card">

      <img :src="book.image" alt="Book Image" />
      <div class="information-book">

        <h1>{{ book.name }}</h1>
        <p><strong>Author:</strong> {{ book.author }}</p>
        <p><strong>ISBN:</strong> {{ book.isbn }}</p>
        <p><strong>Status:</strong> {{ book.status }}</p>
        <div class="des-book" v-if="book.description" v-html="book.description"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BookDetails",
  data() {
    return {
      book: {},
    };
  },
  async created() {
    const bookId = this.$route.params.id; 
    try {
      const response = await axios.get(
        `http://books.localhost:8002/api/resource/Book/${bookId}`
      );
      this.book = response.data.data; 
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  },
};
</script>

<style>
.book-details {
  margin-right: 20%;
  margin-left: 20%
}
.specific-book-card{
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 400px;
  border-radius: 5px;
  overflow: hidden;
  background-color: #1e1e1e;
}
.book-details img {
  width: 400px;
  height: 450px;
}
.information-book{
  padding: 10px;
  text-align: justify;
}
.back-btn{
  background-color: #1e1e1e;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
  }
</style>
