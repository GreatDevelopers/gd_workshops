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

- Now create todo/frontend/src/pages/ActionDetails.vue as:
[ActionDetails.vue](frappeUIcode/actionDetails.vue)

- Also edit todo/frontend/src/main.js as:
[main.js](frappeUIcode/main.js)

- Edit router.js as:
[router.js](frappeUIcode/router.js)

- Output:
  
![I8](https://github.com/Diya050/gd_workshops/assets/124448340/5bdeb7a8-1fd2-43fd-8799-95def6e34fb0)

