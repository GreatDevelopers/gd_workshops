import './index.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import {
  Button,
  Card,
  Input,
  setConfig,
  frappeRequest,
  resourcesPlugin,
} from 'frappe-ui'

let app = createApp(App)

setConfig('resourceFetcher', frappeRequest)

app.use(router)
app.use(resourcesPlugin)

app.component('Button', Button)
app.component('Card', Card)
app.component('Input', Input)

app.mount('#app')// Import CSS styles from the 'index.css' file.
import './index.css'

// Import required modules from Vue, router, and App.vue.
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

// Import components and utilities from the 'frappe-ui' library.
import {
  Button,
  Card,
  Input,
  setConfig,
  frappeRequest,
  resourcesPlugin,
} from 'frappe-ui'

// Create a new Vue app instance.
let app = createApp(App)

// Set the resourceFetcher to frappeRequest, a configuration for the frappe-ui library.
setConfig('resourceFetcher', frappeRequest)

// Use the Vue router for navigation.
app.use(router)

// Use the resourcesPlugin from frappe-ui for handling resources.
app.use(resourcesPlugin)

// Register global components to be used throughout the app.
app.component('Button', Button) // Register 'Button' component.
app.component('Card', Card)     // Register 'Card' component.
app.component('Input', Input)   // Register 'Input' component.

// Mount the Vue app to the element with the ID 'app'.
app.mount('#app')
