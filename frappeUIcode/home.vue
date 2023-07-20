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
