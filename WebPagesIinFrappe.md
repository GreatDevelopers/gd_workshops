## Web pages in Frappe

We assume your site domian is `https://gd.org/`

As Frappe is web app, so every thing there is web page. However web pages there,
might be very simple, or too complex. If you are not logged in, depending on the
setting of site, you will be presented a web page (by default it is login). The
default login page, named `login.html` is served from `apps/frappe/frappe/www`, and
if you are logged in, you will be served either `app.html` (if your role is
`system user`) or `me.html` (If your role is `web user`).
The page served may also depend on where you were on your previous login.
In the folder `apps/frappe/frappe/www` there are 19 html files. We will start working
with simple files. First file we will study is `about.html`. It will render some sample
text like:

> About Us
> 
> Some Introduction about your company that you would like your website visitor to know.
> More people than you think will read your About page. People always like to know who
> the are doing business with. Be authentic and avoid using jargon like
> 'value added services' etc. Be sure to update your company history and list of key
> team members in Website > About Us Settings

Now this not what you wish to see on your web page. To put your own information, one option
is to edit this file. But better option is not to amend default files. In your custom app,
say `karan`, create a filr `about.md` (we are taking simplest format, markdowm (.md), 
however, if you, you can have about.html), and put content, something like:

```txt
## About Us

This is custom About Us file, created by me. not the one, provided by Frappe.

```

Now, https://gd.org/about` will server your about.md from app `karan` and not
from the app `frappe`. 

