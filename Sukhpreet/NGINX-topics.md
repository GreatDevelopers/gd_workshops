## Installation-NGINX 
Tutorial for Nginx server for linux https://nginx.org/en/
<br>
Installation:
### Step 1:
* sudo apt update
### Step 2:
* sudo apt install nginx -y
### Step 3:
Once the installation is complete, start Nginx and enable it to run on boot:
<br>
* sudo systemctl start nginx
* sudo systemctl enable nginx
### Step 4:
Adjust your firewall settings (if necessary)
if you have firewall enabled, then allow HTTP and HTTPS traffic:
<br>
* sudo ufw allow 'Nginx Full'
### Step 5:
Verify Nginx Installation
<br>
* sudo systemctl status nginx
**************************************
Now open on browser to see default welcome page for nginx server by:
<br>
* http://localhost

![Screenshot from 2024-09-28 11-54-01](https://github.com/user-attachments/assets/d5102388-1038-4cad-bbe2-41abbe890898)

## Create Custom NGINX error display view

### Step 1:
#### Create a folder name error-pages(rename as you want) inside the folder create 404.html & 403.html
* sudo nano /var/www/html/error-pages/403.html
* sudo nano /var/www/html/error-pages/404.html
#### Inside the 404.html & 403.html file write html code and css for styling

### Step 2:
#### Open your Nginx configuration file
* sudo nano /etc/nginx/sites-available/default or sudo nano /etc/nginx/nginx.conf
#### Update the configuration file in server block

    error_page 403 /error-pages/403.html;
    error_page 404 /error-pages/404.html;

    location = /error-pages/403.html {
        root /var/www/html;
        internal;
    }

    location = /error-pages/404.html {
        root /var/www/html;
        internal;
    }
#### Explaination:
* <i>error_page 404 or 403<i> tells Nginx to display your custom 404.html and 403.html page from the <i>/var/www/html/error-pages<i> directory whenever a 404 and 403 error occurs.
* <i>location = /error-pages/404.html or /error-pages/404.html {...} ensures that the custom 404.html or 403.html file is served correctly when a 404 error and 403 error occurs and it is handled internally.
### Step 3:
#### Reload or Restart the nginx
* sudo systemctl restart nginx
* sudo systemctl reload nginx
#### Here is the demo of Error pages
### 403 Forbidden error
- [403 File](403.html)
![Screenshot from 2024-10-05 01-52-44](https://github.com/user-attachments/assets/79859f90-d529-4039-a289-091eb75c3f3a)

### 404 Not Found error
- [404 File](404.html)

![Screenshot from 2024-10-05 01-49-05](https://github.com/user-attachments/assets/b1c7ac16-aa1d-4dac-8e25-94e1620194ea)

************************************************
## Create Multiple Users
### Step 1:
#### Open Terminal
* create shell scripting file
* Folder name create_user.sh
  #!/bin/bash

      if [ -z "$1" ]; then
      echo "Please provide a username."
      exit 1
      fi

         USERNAME=$1
        USERDIR="/home/$USERNAME/www"

        sudo useradd -m $USERNAME

        sudo mkdir -p $USERDIR

          sudo chown -R $USERNAME:$USERNAME /home/$USERNAME

        echo "Welcome to $USERNAME's website" | sudo tee $USERDIR/index.html

        sudo chmod -R 755 /home/$USERNAME

        echo "User $USERNAME created with default website folder and index.html file."
### Step 2:
#### Open Configuration file and write in server block
     location ~^/~([a-zA-Z0-9_-]+)(.*) 
     {
        alias /home/$1/www$2;
        
        index index.html index.htm;
        
        autoindex on;
        
        fancyindex on;  
        
        fancyindex_css_href "/fancyindex.css";    
     }

### Step 3:
* ./create_user stephen

### Step 4:
* ls /home
### Step 5:
write google.ldh.in/~stephen on browser

![Screenshot from 2024-10-15 17-52-58](https://github.com/user-attachments/assets/327afa57-f813-482f-a085-edbd53515d78)

# PPT of NGINX Topics
https://nginx-ppt.netlify.app/
