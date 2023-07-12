<template>
  <div class="mx-20"><br><br>
    <div class="flex flex-row items-center justify-between">
      <h1 class="text-7xl font-algerian text-gray-1500">Action List</h1>
      
      <Button icon-left="plus" @click="addActionDialogShown = true">New Action</Button>
    </div>

    <div class="mt-2"><br>
      <Card v-for="category in categories" :key="category.name" :title="category.name">
        <div>
          <hr>
          <ul>
            <li
              class="flex flex-row space-y-2 items-center justify-between"
              v-for="action in getCategoryActions(category.name)"
              :key="action.name"
            >
              <router-link :to="`/actions/${action.name}`">
                {{ action.title }}
              </router-link>
              <Button @click="toggleActionStatus(action)" :icon="getActionStatusIcon(action)" />
            </li>
          </ul>
        </div>
      </Card>
    </div>

    <Dialog
      :options="{
        title: 'Add New Category',
        actions: [
          {
            label: 'Add Category',
            appearance: 'primary',
            handler: ({ close }) => {
              addCategory()
              close() // closes dialog
            },
          },
          { label: 'Cancel' },
        ],
      }"
      v-model="addCategoryDialogShown"
    >
      <template #body-content>
        <div class="space-y-2">
          <Input
            v-model="newCategory"
            type="text"
            required
            placeholder="Enter the category name..."
            label="Category Name"
          />
        </div>
      </template>
    </Dialog>

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
            placeholder="Enter the action title..."
            label="Action Title"
          />
          <Input
            v-model="action.category"
            type="select"
            :options="categoryOptions"
            label="Category"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { Dialog, createListResource, Card, Input, Button } from 'frappe-ui'
import { reactive, ref, computed } from 'vue'

const action = reactive({
  title: '',
  category: '',
})

const addCategoryDialogShown = ref(false)
const newCategory = ref('')

const addActionDialogShown = ref(false)

const actions = createListResource({
  doctype: 'Action',
  fields: ['name', 'title', 'status', 'category'],
  limit: 100,
})
actions.reload()

const categories = computed(() => {
  if (actions.loading || !actions.data) {
    return []
  }
  const uniqueCategories = [...new Set(actions.data.map((action) => action.category))]
  return uniqueCategories.map((category) => ({ name: category }))
})

const categoryOptions = computed(() => {
  if (categories.value.length === 0) {
    return []
  }
  return categories.value.map((category) => category.name)
})

const addCategory = () => {
  const categoryName = newCategory.value.trim();
  if (categoryName) {
    const category = { name: categoryName };
    categories.value.push(category);
    newCategory.value = '';
  }
}

const addAction = () => {
  actions.insert.submit(action)
}

const toggleActionStatus = (action) => {
  if (action.status === 'Available') {
    action.status = 'Issued';
  } else {
    action.status = 'Available';
  }
  actions.update.submit(action);
}

const getActionStatusIcon = (action) => {
  return action.status === 'Available' ? 'check' : 'undo';
}

const getCategoryActions = (categoryName) => {
  return actions.data.filter((action) => action.category === categoryName);
}
</script>

