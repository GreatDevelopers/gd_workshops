<h1>Magazines Management System</h1>
This App is developing in Linux ubuntu 24.04.1 LTS

So, I am going to develop Books Management System
Using frappe and Jinja + Bootstrap

First of all let's create an App:
Open terminal (ctrl + Alt + t)
Run this command under frappe-bench directory
<br>
<code>$ bench new-app magazines_management</code>
<br>
<br>
Congrats we have created our app within a second!
Now, we're going to create our site.
Run this command under frappe-bench directory
<br>
<code>$ bench new-site book.localhost</code>
<br>
<br>
Congrats we have created our site 
so now we can open on browser and can do further process
But before going to browser we need to tell our operating system that magazines.localhost should point to localhost.
so to do this we need to add this (127.0.0.1 magazines.localhost)
How can we do and where we have to add this?
so we need to add at /etc/hosts file.
we can do it manually by navigate in hosts file and add manually, Just write:
127.0.0.1 books.localhost
But there is another way just run this:
<br>
<code>$ bench --site magazines.localhost add-to-hosts</code>
<br>
<br>
So, Open any browser (Recommanded Chrome)
and Type http://magazines.localhost:8002/#login
This will show credentials for login
<br>
<img src='https://github.com/sukhlotey/Book-Management-system-tutorial/blob/main/Desktop/frappe-app/Screenshot%20from%202024-11-29%2023-36-30.png?raw=true'/>
<br>
Now Install app on site
Run this command under frappe-bench directory
<br>
<code>$ bench --site magazines.localhost magazines_management</code>
<br>
To check the app installed?
Run this command to check the app installed or not!
<br>
<code>$ bench --site magazines.localhost list-apps</code>
<br>
This should show our app(book_management) and frappe(default)
![Screenshot from 2025-01-09 04-08-00](https://github.com/user-attachments/assets/9dc52f2c-3c5b-4a4f-8cce-6c783c87d766)
<br><br>
### Let's setup desk of application
First of all create all doctypes that needed.
#### Create Book Doctype 
* Step: 1 Search for doctype list in search bar <br>
![Screenshot from 2024-12-30 15-03-14](https://github.com/user-attachments/assets/cccf6b12-9ec0-4989-b076-93d40072f423)
<br>

* Step: 2 Click to button +Add DocType
* Step: 3 File Module with Magazines Management and doctype name is Magazine
* Step: 4 Save
* Step: 5 Go to Fields
* Add Row

| Label          | Data Type        | Name        |
|----------------|------------------|-------------|
| Magazine Name      | Data             | book_name   |
| Author         | Data             | author      |
| Image          | Attach Image     | image       |
| ISSN           | Data             | isbn        |
| Status         | Select           | status      |
| Publisher      | Data             | publisher   |
| Description    | Text Editor      | description |
| Route          | Data             | route       |
| Published      | Check            | published   |

<br>
It should look like:
<br>

![Screenshot from 2025-01-09 04-13-46](https://github.com/user-attachments/assets/9c70cd31-eab9-4ba6-a389-7f6dd49f77d4)
<br><br>
#### Create Magazine Reader Doctype
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
![Screenshot from 2025-01-09 04-15-43](https://github.com/user-attachments/assets/f570ce7c-63b7-4eb4-86eb-f00bd5de7fef)
<br><br>
#### Create Magazine Subscription Doctype
* Go to fields
* Add Row

| Label           | Type  | Name           | Mandatory | Options             |
|------------------|-------|----------------|-----------|---------------------|
| Magazine Reader  | Link  | magazine_reader| true      | Magazine Reader     |
| Full Name        | Data  | full_name      |           |                     |
| From Date        | Date  | from_date      |           |                     |
| To Date          | Date  | to_date        |           |                     |
| Paid             | Check | paid           |           |                     |
| Amended From     | Link  | amended_from   |           | Library Membership  |

<br>
It should look like:
<br>

![Screenshot from 2025-01-09 04-18-06](https://github.com/user-attachments/assets/0158ebba-f895-4de1-b870-f7266a7c2118)
<br><br>
#### Create Magazine Transaction Doctype
* Go to fields
* Add Row

| Label           | Type   | Name           | Mandatory | Options               |
|------------------|--------|----------------|-----------|----------------------|
| MAgazine        | Link   | magazine       | true      | Magazine              |
| Magazine Reader | Link   | amended_from   | true      | Magazine Reader       |
| Type            | Select | type           |           | Issue, Return         |
| Date            | Data   | date           | true      |                       |

So, Four Doctypes are created.

#### Let's create a role with name od Admin (who have the access to add magazines)
* Step: 1 search for role
* Step: 2 create new role
* Step: 3 set Role Permissions Manager
* Step: 4 Give access to Librarian (create, read, delete, write, print, report, export, share)
* Step: 5 Give Admin role access to Doctypes (Magazine,Magazine Subscription, Magazine Transaction)
![Screenshot from 2025-01-09 04-21-15](https://github.com/user-attachments/assets/d79254b4-a612-49eb-aca3-02e5e6186f2f)
<br>
<hr>

### Go to doctype directory in app and navigate to template

```bash
$ cd frappe-bench/apps/magazines_management/magazines_management/magazines_management/doctype/magazines/template/
```
There are two default files:
I. magazine.html 
II. magazine_raw.html

I. First file is for a specific card of magazine
II. List of the all magazines
How: I added bootsrap CSS and JS CDN:
CSS:https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css
JS:https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js

Lets see demo:<br>
magazine.html 
<br>
<img src="https://private-user-images.githubusercontent.com/82471879/401196902-8cc254d6-58d8-49fd-aa14-aad30e1259f7.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzYzNzczOTcsIm5iZiI6MTczNjM3NzA5NywicGF0aCI6Ii84MjQ3MTg3OS80MDExOTY5MDItOGNjMjU0ZDYtNThkOC00OWZkLWFhMTQtYWFkMzBlMTI1OWY3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAxMDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMTA4VDIyNTgxN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWI5NWIzYjEyNjY1MmYxZjM4Y2Y2YmVhYzQ0NjI3M2MwOGQ1YTBlNjg5YmVmNWUyYTM5N2M4OGQ4ZWUzYjVlMTEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.RFB44veU3Czl2dcqRFdN-XyQc4fA7rdGZbjLEmE_SM4" />
<br>
magazine_row.html<br>
<img style="500px" src="https://private-user-images.githubusercontent.com/82471879/401196651-a0172194-7277-4008-ac44-e3765e273b0b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzYzNzczOTcsIm5iZiI6MTczNjM3NzA5NywicGF0aCI6Ii84MjQ3MTg3OS80MDExOTY2NTEtYTAxNzIxOTQtNzI3Ny00MDA4LWFjNDQtZTM3NjVlMjczYjBiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAxMDglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMTA4VDIyNTgxN1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTE1NTEwNzVjN2VlZTkwNzY1NWU1NzJhNDEzMjViMzZkNzVlMzdiN2E1NDBiYTNkNWQzNjQ5NTUxNGI4ZjQ1NTkmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.kbYhD963-0iC8j1E3__fO-sxOEEpGFgJPs4MR3pl2aI"/>
<br>

