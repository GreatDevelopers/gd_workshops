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
