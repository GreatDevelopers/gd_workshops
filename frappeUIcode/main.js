// Import global styles
import './index.css';

// Import Vue modules and components
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

// Import Frappe-UI components and utilities
import { Button, setConfig, frappeRequest, resourcesPlugin } from 'frappe-ui';

// Create a Vue app instance
let app = createApp(App);

// Configure Frappe-UI to use the correct request method for resources
setConfig('resourceFetcher', frappeRequest);

// Use Vue Router
app.use(router);

// Use the Frappe-UI resources plugin
app.use(resourcesPlugin);

// Register the Frappe-UI Button component globally
app.component('Button', Button);

// Mount the Vue app on the #app element
app.mount('#app');
