## erpNext on Ubuntu 22 LTS

If any other webserver is running, disable tha, in my case Caddy is there. To see, if Caddy runs on boot:

```sh
hsrai@exp:~$ sudo systemctl --type=service | grep addy
  caddy.service                        loaded active running Caddy
hsrai@exp:~$ sudo systemctl disable caddy.service
Removed /etc/systemd/system/multi-user.target.wants/caddy.service.
hsrai@exp:~$ sudo systemctl stop caddy.service
hsrai@exp:~$ sudo systemctl --type=service | grep addy
# if you get nothing here, that mean `Caddy` has been stopped and disabled. If you need, you may start it manually.
```

Put following content in a file named erpN1.sh

```sh
password="AxC23@#aXc"

sudo adduser --gecos "" --disabled-password "$username"
echo "${username}:${password}" | sudo chpasswd
usermod -aG sudo "$username"

sudo apt-get update && sudo apt-get -y upgrade

sudo apt-get install git python3-dev python3.10-dev python3-setuptools \
        python3-pip python3-distutils python3.10-venv \
        software-properties-common mariadb-server mariadb-client \
        redis-server xvfb libfontconfig wkhtmltopdf \
        libmysqlclient-dev curl
```

and issue command

```sh
time sudo bash erpN1.sh
```

Put following content in a file named erpN2.sh

```sh
timedatectl set-timezone "Asia/Kolkata"

sudo mysql_secure_installation

# Enter current password for root: (Enter your SSH root user password)
# Switch to unix_socket authentication [Y/n]: n
# Change the root password? [Y/n]: Y
# Set new password for root user of mysql / mariadb
# Remove anonymous users? [Y/n] Y
# Disallow root login remotely? [Y/n]: Y
# Remove test database and access to it? [Y/n]: Y
# Reload privilege tables now? [Y/n]: Y

wget https://raw.githubusercontent.com/GreatDevelopers/gd_workshops/master/mysqlSecure.txt

cp /etc/mysql/my.cnf ./my.cnfBackup123
cat /etc/mysql/my.cnf mysqlSecure.txt > my.cnfNew
sudo cp  my.cnfNew /etc/mysql/my.cnf

sudo service mysql restart
```

and issue command

```sh
time sudo bash erpN2.sh
```

```sh
sudo su - hsr
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.profile
```

Put following content in a file named erpN3.sh

```sh
# 3

nvm install 16.15.0
sudo apt-get install npm
sudo npm install -g yarn

# node --version

sudo pip3 install frappe-bench

# bench --version

bench init --frappe-branch version-14 frappe-bench
cd frappe-bench/
chmod -R o+rx /home/hsr/
bench new-site exp.gndec.ac.in
bench get-app payments
bench get-app --branch version-14 erpnext
bench get-app hrms
bench --site exp.gndec.ac.in install-app erpnext
bench --site exp.gndec.ac.in install-app hrms
bench --site exp.gndec.ac.in enable-scheduler
bench --site exp.gndec.ac.in set-maintenance-mode off
sudo bench setup production hsr
bench config dns_multitenant on
bench setup add-domain exp.gndec.ac.in --site exp.gndec.ac.in
bench setup nginx
sudo supervisorctl restart all
# sudo bench setup production hsr
sudo ufw allow 22,25,143,80,443,3306,3022,8000/tcp
sudo ufw enable

sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot

sudo ln -s /snap/bin/certbot /usr/bin/certbot

sudo certbot --nginx
```

and issue command

```sh
time sudo bash erpN3.sh
```
