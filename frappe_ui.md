# Working with Frappe UI

Frappe UI is a set of components and utilities to build frontend apps based on the Frappe Framework.

Along with generic components which are required to build a frontend like Button, Link, Dialog, etc., frappe-ui also contains utilities for handling server-side data fetching, directives and utilities.

In this tutorial, we will build a Fullstack Web-App, a ToDo app with Frappe Framework and Frappe UI.

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

  ![I1](I1.png)
  
  ![I2](I2.png)
  
- Create another doctype named `Category` in `ToDo` module and add fields as shown below:

  ![I3](I3.png)

  ![I4](I4.png)

`Note:` Make the 'title' field unique.

- Create another doctype named `Action Task` in `ToDo` module and add fields as shown below:

 ![I5](I5.png)

- Add two more rows in `Action` doctype:

 ![I6](I6.png)

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

![I7](I7.png)   

- On clicking [click to send 'ping' request], we should get pong in response with "error": null. This ensures that our backend and frontend are connected.
- Edit the code in todo/frontend/src/pages/Home.vue as:
```vue
<template>
  <div class="mx-20">
    <div class="flex flex-row items-center justify-between">
      <h2 class="text-5xl font-black text-gray-900">Lists</h2>
      <Button icon-left="plus">New List</Button>
    </div>

    <div class="mt-2">
      <Card title="General">
        <div>
          <ul>
            <li
              class="flex flex-row space-y-2 items-center justify-between"
              v-for="action in actions.data"
              :key="action.title"
            >
              <router-link :to="`/actions/${action.name}`">
                {{ action.title }}
              </router-link>
              <Button @click="completeAction(action.name)" icon="check" />
            </li>
          </ul>

          <Button @click="addActionDialogShown = true" icon-left="plus"
            >New Action</Button
          >
        </div>
      </Card>
    </div>

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
          <Input
            v-model="action.title"
            type="text"
            required
            placeholder="Give your action a title..."
            label="Title"
          />
          <Input
            v-model="action.category"
            label="List"
            type="select"
            :options="categoryOptions"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { Dialog, createListResource, Card, Input } from 'frappe-ui'
import { reactive, ref, computed } from 'vue'

const action = reactive({
  title: '',
  category: 'General',
})

const addActionDialogShown = ref(false)

const actions = createListResource({
  doctype: 'Action',
  fields: ['name', 'title', 'status', 'description', 'date', 'due_date'],
  filters: {
    status: 'ToDo',
  },
  limit: 100,

})
actions.reload()

const categories = createListResource({
  doctype: 'Category',
  fields: ['name'],
  transform(categories) {
    return categories.map((c) => c.name)
  },
  cache: 'actions',
})
categories.reload()

const categoryOptions = computed(() => {
  if (categories.list.loading || !categories.data) {
    return []
  }
  return categories.data
})

const completeAction = (actionName) => {
  actions.setValue.submit({
    name: actionName,
    status: 'Completed',
    onSuccess() {
      actions.reload()
    },
  })
}

const addAction = () => {
  console.log(action)
  actions.insert.submit(action)
}
</script>
```
- Now create todo/frontend/src/pages/ActionDetails.vue as:
```vue
<template>
  <div class="mx-20 my-4" v-if="!action.get.loading">
    <div class="flex flex-row items-center justify-between">
      <h1 class="font-black text-5xl text-gray-900">{{ action.doc.title }}</h1>

      <div class="flex flex-row items-center space-x-1">
        <Button icon-left="arrow-left" @click="router.back()">Go back</Button>
        <Button
          @click="action.setValue.submit({ status: 'Archived' })"
          appearance="white"
          class="text-red-400 border-red-400"
          icon-left="trash"
          v-if="action.doc.status != 'Archived'"
          >Delete</Button
        >
        <Button
          @click="action.setValue.submit({ status: 'Completed' })"
          appearance="white"
          class="text-green-600 border-green-600"
          icon-left="check"
          v-if="action.doc.status === 'ToDo'"
          >Mark As Done</Button
        >
      </div>
    </div>

    <div>
      <!-- <TextEditor
        editor-class="prose-sm border max-w-none rounded-b-lg p-3 overflow-auto h-64 focus:outline-none"
        :fixedMenu="true"
        :content="content"
        @change="(val) => (content = val)"
      /> -->
    </div>
  </div>
  <LoadingIndicator v-else class="w-6 text-blue-500" />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { TextEditor, createDocumentResource, LoadingIndicator } from 'frappe-ui'

const router = useRouter()
const props = defineProps(['name'])
const content = ref('')

const action = createDocumentResource({
  doctype: 'Action',
  name: props.name,
})

action.reload()
</script>
```
- Also edit todo/frontend/src/main.js as:
```js
import './index.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import { Button, setConfig, frappeRequest, resourcesPlugin } from 'frappe-ui'

let app = createApp(App)

setConfig('resourceFetcher', frappeRequest)

app.use(router)
app.use(resourcesPlugin)

app.component('Button', Button)
app.mount('#app')
```
- Edit router.js as:
```js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/actions/:name',
    component: () => import("@/pages/ActionDetails.vue"),
    props: true
  }
]

let router = createRouter({
  history: createWebHistory('/frontend'),
  routes,
})

export default router
```

