// Import Vue Router functions for creating the router and web history
import { createRouter, createWebHistory } from 'vue-router';

// Define the routes for the application
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'), // Lazy loading of the Home component
  },
  {
    path: '/actions/:name',
    component: () => import('@/pages/ActionDetails.vue'), // Lazy loading of the ActionDetails component
    props: true, // Pass route parameters as props to the component
  },
];

// Create the router instance
let router = createRouter({
  history: createWebHistory('/frontend'), // Set up web history mode with a base URL of '/frontend'
  routes, // Pass the defined routes to the router instance
});

// Export the router instance to be used in the app
export default router;
