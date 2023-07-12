![image](https://github.com/Diya050/gd_workshops/assets/124448340/3ebec490-d552-473b-a3fe-20ec53528362)# Working with Frappe UI

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
