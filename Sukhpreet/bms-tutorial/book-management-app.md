<h1>Book Management System</h1>
This App is developing in Linux ubuntu 24.04.1 LTS

So, I am going to develope BMS(Books Management System)
Using frappe and FrappeUI, VueJS, TailwindCSS

First of all let's create an App:
Open terminal (ctrl + Alt + t)
Run this command under frappe-bench directory
<br>
<code>$ bench new-app book_management</code>
<br>
<img src='https://github.com/sukhlotey/Book-Management-system-tutorial/blob/main/Desktop/frappe-app/Screenshot%20from%202024-11-29%2023-09-38.png?raw=true' />
<br>
Congrats we have created our app within a second!

Now, we're going to create our site.
Run this command under frappe-bench directory
<br>
<code>$ bench new-site book.localhost</code>
<br>
<img src='https://github.com/sukhlotey/Book-Management-system-tutorial/blob/main/Desktop/frappe-app/Screenshot%20from%202024-11-29%2023-18-57.png?raw=true' />
<br>
Congrats we have created our site 
so now we can open on browser and can do further process
But before going to browser we need to tell our operating system that books.localhost should point to localhost.
so to do this we need to add this (127.0.0.1 books.localhost)
How can we do and where we have to add this?
so we need to add at /etc/hosts file.
we can do it manually by navigate in hosts file and add manually, Just write:
127.0.0.1 books.localhost
But there is another way just run this:
<br>
<code>$ bench --site books.localhost add-to-hosts</code>
<br>
<img src='https://github.com/sukhlotey/Book-Management-system-tutorial/blob/main/Desktop/frappe-app/Screenshot%20from%202024-11-29%2023-27-34.png?raw=true'/>
<br>
So, Open any browser (Recommanded Chrome)
and Type http://books.localhost:8002/#login
This will show credentials for login
<br>
<img src='https://github.com/sukhlotey/Book-Management-system-tutorial/blob/main/Desktop/frappe-app/Screenshot%20from%202024-11-29%2023-36-30.png?raw=true'/>
<br>
Now Install app on site
Run this command under frappe-bench directory
<br>
<code>$ bench --site books.localhost books_management</code>
<br>
To check the app installed?
Run this command to check the app installed or not!
<br>
<code>$ bench --site books.localhost list-apps</code>
<br>
This should show our app(book_management) and frappe(default)
![Screenshot from 2024-12-30 14-53-49](https://github.com/user-attachments/assets/8124830f-1bce-4fd8-bd7a-8d232463727f)
<br><br>
### Let's setup desk of application
First of all create all doctypes that needed.
#### Create Book Doctype 
* Step: 1 Search for doctype list in search bar <br>
![Screenshot from 2024-12-30 15-03-14](https://github.com/user-attachments/assets/cccf6b12-9ec0-4989-b076-93d40072f423)
<br>

* Step: 2 Click to button +Add DocType
* Step: 3 File Module with Book Management and doctype name is Book
* Step: 4 Save
* Step: 5 Go to Fields
* Add Row

| Label          | Data Type        | Name        |
|----------------|------------------|-------------|
| Book Name      | Data             | book_name   |
| Author         | Data             | author      |
| Image          | Attach Image     | image       |
| ISBN           | Data             | isbn        |
| Status         | Select           | status      |
| Publisher      | Data             | publisher   |
| Description    | Text Editor      | description |
| Route          | Data             | route       |
| Published      | Check            | published   |

<br>
It should look like:
<br>

![Screenshot from 2024-12-30 15-23-26](https://github.com/user-attachments/assets/cda781b1-7985-41f8-b71d-265db3e229ce)
<br><br>
#### Create Library Member Doctype
* Go to fields
* Add Row

| Label          | Type            | Name        | Options          |
|----------------|-----------------|-------------|------------------|
| First Name     | Data            | first_name  |                  |
| Last Name      | Data            | last_name   |                  |
| Full Name      | Data            | full_name   |                  |
| Email Address  | Data            | email_address | Email          |
| Phone          | Data            | phone       |                  |

<br>
It Should look like:
<br>

![Screenshot from 2024-12-30 15-34-15](https://github.com/user-attachments/assets/861be22b-be19-4147-bedd-43325df9a63d)
<br><br>
#### Create Library Membership Doctype
* Go to fields
* Add Row

| Label           | Type  | Name           | Mandatory | Options             |
|------------------|-------|----------------|-----------|---------------------|
| Library Member   | Link  | library_member | true      | Library Member      |
| Full Name        | Data  | full_name      |           |                     |
| From Date        | Date  | from_date      |           |                     |
| To Date          | Date  | to_date        |           |                     |
| Paid             | Check | paid           |           |                     |
| Amended From     | Link  | amended_from   |           | Library Membership  |

<br>
It should look like:
<br>

![Screenshot from 2024-12-30 16-05-08](https://github.com/user-attachments/assets/e3a858a0-c38b-41a7-825a-fc7d3c7f63c3)
<br><br>
#### Create Library Transaction Doctype
* Go to fields
* Add Row

| Label           | Type   | Name           | Mandatory | Options               |
|------------------|--------|----------------|-----------|----------------------|
| Book            | Link   | book           | true      | Book                  |
| Library Member  | Link   | amended_from   | true      | Library Transaction   |
| Type            | Select | type           |           | Issue, Return         |
| Date            | Data   | date           | true      |                       |

So, Four Doctypes are created.

#### Let's create a role with name od Librarian (who have the access to add books)
* Step: 1 search for role
* Step: 2 create new role
* Step: 3 set Role Permissions Manager
* Step: 4 Give access to Librarian (create, read, delete, write, print, report, export, share)
* Step: 5 Give Librarian role access to Doctypes (Book,Library Membership, Library Transaction)
![Screenshot from 2025-01-01 00-36-15](https://github.com/user-attachments/assets/f18eea5a-6afb-42e7-a82b-8c7017dbb95e)

# Let's setup the frontend side
### We are using the VueJS
Vue.js is an open-source JavaScript framework for building user interfaces (UIs) and single-page applications.
- In Frappe application, there are lot of directories and files.
One directory <strong>www</strong> is main directory for frontend files.
<br>

Here are Steps to setup the VueJS:
<br>
* Step:1 Navigate to the www directory.
```bash
cd books_management/www
```
<code>books_management/books_management/www</code>
* Step:2 Initialize vuejs
<code>npm create vite@latest .</code>
* Step:3 npm start
* Step:4 npm run build
* Step:5 Copy the dist content to public folder.
```bash
cp -r ~/frappe-bench/apps/book_management/book_management/www/dist/* ~/frappe-bench/apps/book_management/public/
```
The step to copy the dist folder to the public directory of your Frappe app is necessary because Frappe serves static files, such as HTML, CSS, and JavaScript, from the public directory of your app. 
* Step:6 The default vue main file App.vue [App](App.vue)
* Step:7 Dependencies
```bash
npm install axios vue-router watch
```
* Step:8 Create directory with name Components
```bash
cd src
mkdir components
```
We are going to create Three components:
<br>
1. AddBook.vue
2. BookList.vue
3. BookDetail.vue
<br>

a. AddBook.vue for button which is popup the form of books credentials
[AddBook](AddBook.vue)

b. BookList.vue for List the all books that added
[BookList](BookList.vue)

c. BookDetails.vue is show up the book's description when specific book is clicked it navigate to the selected book and display the description.
[BookDetails](BookDetails.vue)

Now Run the Application

```bash
npm run dev
```
### The first rendering view page:

![Screenshot from 2025-01-01 01-55-13](https://github.com/user-attachments/assets/cab36c0d-0a6f-44e4-a2a0-8089c786609a)

### Searching Book

![Screenshot from 2025-01-01 02-06-18](https://github.com/user-attachments/assets/b28a490c-105e-47c9-a291-6e76c0749c48)

### Latest Books
![Screenshot from 2025-01-01 01-56-02](https://github.com/user-attachments/assets/ed668844-9aae-4658-b6ad-fcd228d04f4e)

### Add Book Form
![Screenshot from 2025-01-01 01-56-12](https://github.com/user-attachments/assets/0889bc97-f08a-46da-ab30-47a55df61b66)

### Book Detail
![Screenshot from 2025-01-01 01-56-44](https://github.com/user-attachments/assets/9858b683-deb0-416f-9f11-55d05fc1e55e)





