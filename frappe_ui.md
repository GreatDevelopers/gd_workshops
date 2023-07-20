# Working with Frappe UI

Frappe UI is a set of components and utilities to build frontend apps based on the Frappe Framework.

Along with generic components which are required to build a frontend like Button, Link, Dialog, etc., frappe-ui also contains utilities for handling server-side data fetching, directives and utilities.

In this tutorial, we will build a Fullstack Web-App, a ToDo app with Frappe Framework and Frappe UI. 

![I8](https://github.com/Diya050/gd_workshops/assets/124448340/5bdeb7a8-1fd2-43fd-8799-95def6e34fb0)

# The Backend Part

- Install frappe-bench by following: https://frappeframework.com/docs/v14/user/en/installation.
- Create an app named ToDo:
```bash
$ bench new-app todo
```
- Create a site named todo.com and make it point to localhost.
```bash
$ bench new-site todo.com
$ bench --site todo.com add-to-hosts
```
- Install app on site:
```bash
$ bench --site todo.com install-app todo
$ cd sites/
$ bench use todo.com/
$ bench start
```
- To create DocTypes in our app, we must log in to Desk. Go to http://todo.com:8000 and it should show you a login page. Enter Administrator as the user and password that you set while creating the site.
- Create a doctype named `Action` in `ToDo` module and add fields as shown below:

  ![I1](https://github.com/Diya050/gd_workshops/assets/124448340/78d3dbcb-16dd-4663-a411-c774bf897fd9)


  ![I2](https://github.com/Diya050/gd_workshops/assets/124448340/d5802769-4011-428e-9875-6fd87c70b9c4)
  
- Create another doctype named `Category` in `ToDo` module and add fields as shown below:

  ![I3](https://github.com/Diya050/gd_workshops/assets/124448340/36a9e361-9258-4ed7-8c2b-db06db173793)

  ![I4](https://github.com/Diya050/gd_workshops/assets/124448340/df0dff34-19b8-4045-819b-293efad9643c)

`Note:` Make the 'title' field unique.

- Create another doctype named `Action Task` in `ToDo` module and add fields as shown below:

 ![I5](https://github.com/Diya050/gd_workshops/assets/124448340/d6f044be-1431-4899-972d-979f79759ce1)


- Add two more rows in `Action` doctype:

![I6](https://github.com/Diya050/gd_workshops/assets/124448340/aab37b9f-46a5-4691-903f-f0202d4660f5)

- Add categories like General, College, Artwork etc. and actions like Buying Groceries, Completing Assignments, Finishing a painting etc.
- This completes the backend part.

# The Frontend Part

- Open another terminal:
```bash
$ cd frappe-bench
$ bench get-app https://github.com/NagariaHussain/doppio
$ bench add-frappe-ui
```
- This will install frappe.ui on our system and we will be prompted to enter a Dashboard Name[frontend], App Name[todo] and Ok to proceed? (y).
```bash
$ cd apps/
$ cd todo/
$ cd frontend/
$ yarn dev
```
- Opening link http://localhost:8080/, doing login to our FrappeUI App and we'll see:
- 
![I7](https://github.com/Diya050/gd_workshops/assets/124448340/f9c74628-320c-4fb9-978c-a5f7501cb323)

- On clicking [click to send 'ping' request], we should get pong in response with "error": null. This ensures that our backend and frontend are connected.
- Edit the code in todo/frontend/src/pages/Home.vue as:
 [Home.vue](frappeUIcode/home.vue)
```vue
<template>
  <!-- Main container -->
  <div class="mx-20"><br><br>
  
    <!-- Page title and New Action button -->
    <div class="flex flex-row items-center justify-between">
         <h1 class="text-7xl font-algerian text-gray-1500">Action List</h1>
         <Button icon-left="plus" @click="addActionDialogShown = true">New Action</Button>
    </div>

    <!-- Category-wise Action List -->
    <div class="mt-2"><br>
      <Card v-for="category in categories" :key="category.name" :title="category.name">
        <div>
          <hr>
          <ul>
          
            <!-- Individual Actions in the Category -->
            <li
              class="flex flex-row space-y-2 items-center justify-between"
              v-for="action in getCategoryActions(category.name)"
              :key="action.name"
            >
              <!-- Link to the Action details page -->
              <router-link :to="`/actions/${action.name}`">
                {{ action.title }}
              </router-link>
              <!-- Button to toggle Action status -->
              <Button @click="toggleActionStatus(action)" :icon="getActionStatusIcon(action)" />
            </li>
            
          </ul>
        </div>
      </Card>
    </div>


    <!-- Dialog for adding a new action -->
    <Dialog
      :options="{
        title: 'Add New Action',
        actions: [
          {
            label: 'Add Action',
            appearance: 'primary',
            handler: ({ close }) => {
              addAction()
              close() // closes dialog
            },
          },
          { label: 'Cancel' },
        ],
      }"
      v-model="addActionDialogShown"
    >
      <template #body-content>
        <div class="space-y-2">
          <!-- Input fields for the new action details -->
          <Input
            v-model="action.title"
            type="text"
            required
            placeholder="Enter the action title..."
            label="Action Title"
          />
          <Input
            v-model="action.category"
            type="select"
            :options="categoryOptions"
            label="Category"
          />
          <Input
          v-model="action.status"
          type="select"
          :options="['Todo', 'Completed']"
          label="Status"
        />
        
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { Dialog, createListResource, Card, Input, Button } from 'frappe-ui'
import { reactive, ref, computed } from 'vue'

// Reactive data
const action = reactive({
  title: '',
  category: '',
})

const addCategoryDialogShown = ref(false)
const newCategory = ref('')

const addActionDialogShown = ref(false)

// List resource for fetching actions
const actions = createListResource({
  doctype: 'Action',
  fields: ['name', 'title', 'status', 'category'],
  limit: 100,
})
actions.reload()

// Computed property for unique categories
const categories = computed(() => {
  if (actions.loading || !actions.data) {
    return []
  }
  const uniqueCategories = [...new Set(actions.data.map((action) => action.category))]
  return uniqueCategories.map((category) => ({ name: category }))
})

// Computed property for category options in the new action dialog
const categoryOptions = computed(() => {
  if (categories.value.length === 0) {
    return []
  }
  return categories.value.map((category) => category.name)
})


// Function to add a new action
const addAction = () => {
  actions.insert.submit(action)
}

// Function to toggle the status of an action
const toggleActionStatus = (action) => {
  if (action.status === 'Completed') {
    action.status = 'Todo';
  } else {
    action.status = 'Completed';
  }
  actions.update.submit(action);
}

//Function to get the icon name based on the status of an action
const getActionStatusIcon = (action) => {
  return action.status === 'Completed' ? 'check' : 'undo';
}

// Function to get actions of a specific category
const getCategoryActions = (categoryName) => {
  return actions.data.filter((action) => action.category === categoryName);
}
</script>
```


- Now create todo/frontend/src/pages/ActionDetails.vue as:
[ActionDetails.vue](frappeUIcode/actionDetails.vue)

- Also edit todo/frontend/src/main.js as:
[main.js](frappeUIcode/main.js)

- Edit router.js as:
[router.js](frappeUIcode/router.js)

- Output:
  
![I8](https://github.com/Diya050/gd_workshops/assets/124448340/5bdeb7a8-1fd2-43fd-8799-95def6e34fb0)

