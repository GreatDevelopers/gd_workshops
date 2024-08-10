## Installtion of Frappe
### Easiest method via Docker using Frappe-Manager

OS: Debian 12 fresh install

Reference: https://github.com/rtCamp/Frappe-Manager

Pre-requisite: python 3.11+ and docker

### Check python version:

```sh
ced@deb12:~$ python3 -V
Python 3.11.2
```

Python version >  3.11, so Ok

### Install sudo

```sh
su -
Enter password

You become root, $ prompt will change to #

apt update -y
apt install sudo -y
visudo
```
Locate following

```sh
# User privilege specification
root    ALL=(ALL:ALL) ALL
```

and make it by adding a line, in case your username is hsrai (replace hsrai with your username)

```sh
# User privilege specification
root    ALL=(ALL:ALL) ALL
hsrai   ALL=(ALL:ALL) ALL
```

### Install Docker:

Ref: https://docs.docker.com/engine/install/debian/

```sh
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

You will get not installed, so not removed

Put following in doc.sh file:

# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:

```sh
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

// tets

sudo docker run hello-world

sudo apt install python3-pip -y
pip install frappe-manager --break-system-packages
fm --install-completion

nano /home/ced/.bashrc

Add following at the end of file

export PATH=$PATH:/home/ced/.local/bin


Save and exit.

Exit
Open terminal again

docker --version
Docker version 27.1.1, build 6312585



time fm create hsr.com
// hsr.com is website’s address.



ced@deb12:~$ time fm create hsr.com
🔄 Pending Migrations...
📦 v0.9.0
📦 v0.10.0
📦 v0.11.0
📦 v0.12.0
📦 v0.13.0
📦 v0.13.1
📦 v0.14.0
📦 v0.15.0

⏳ This process may take a while.
📘 For a manual migration guide, visit
https://github.com/rtCamp/Frappe-Manager/wiki/Migrations#manual-migration-proced
ure

Options :

[yes] Start Migration: Proceed with the migration process.
[no]  Abort and Revert: Do not migrate and revert to the previous fm version.

Do you want to proceed with the migration ? [yes/no]: yes
────────────────────────────────── 📦 v0.9.0 ───────────────────────────────────
✅ Moved benches from /home/ced/frappe to /home/ced/frappe/sites
────────────────────────────────── 📦 v0.10.0 ──────────────────────────────────
✅ Generated services compose file.
✅ Created services at /home/ced/frappe/services.
────────────────────────────────── 📦 v0.11.0 ──────────────────────────────────
────────────────────────────────── 📦 v0.12.0 ──────────────────────────────────
✅ Image pulled ghcr.io/rtcamp/frappe-manager-frappe:v0.12.0
────────────────────────────────── 📦 v0.13.0 ──────────────────────────────────
────────────────────────────────── 📦 v0.13.1 ──────────────────────────────────
✅ Added fm header config to nginx-proxy.
────────────────────────────────── 📦 v0.14.0 ──────────────────────────────────
✅ Migrated fm_config.toml
────────────────────────────────── 📦 v0.15.0 ──────────────────────────────────
✅ Image pulled jwilder/nginx-proxy:1.6
✅ Migrated services compose
✅ Restarted services
❌ Docker image 'ghcr.io/rtcamp/frappe-manager-frappe:v0.15.0' is not available
locally
❌ Docker image 'ghcr.io/rtcamp/frappe-manager-nginx:v0.15.0' is not available
locally
❌ Docker image 'redis:6.2-alpine' is not available locally
❌ Docker image 'ghcr.io/rtcamp/frappe-manager-mailhog:v0.8.3' is not available
locally
❌ Docker image 'adminer:4' is not available locally
❌ Error Occured  hsr.com : Required docker images not available. Pull all
required images using command 'fm self update images'.
🔍 More info about error is logged in /home/ced/frappe/logs/fm.log

real    7m34.764s
user    0m6.315s
sys    0m1.555s
ced@deb12:~$ time fm self update images

////

ced@deb12:~$ time fm self update images==^C
ced@deb12:~$ time fm self update images
✅ Pulled ghcr.io/rtcamp/frappe-manager-frappe:v0.15.0.
✅ Pulled ghcr.io/rtcamp/frappe-manager-nginx:v0.15.0.
✅ Pulled redis:6.2-alpine.
✅ Pulled mariadb:10.6.
✅ Pulled jwilder/nginx-proxy:1.6.
✅ Pulled ghcr.io/rtcamp/frappe-manager-mailhog:v0.8.3.
✅ Pulled adminer:4.

real	4m41.825s
user	0m5.437s
sys 	0m0.628s
ced@deb12:~$ time fm create hsr.com
✅ Created all required directories.
✅ Started bench services.
✅ Configured common_site_config.json
✅ Configured frappe server
✅ Configured supervisor configs
✅ Configured frappe app's branch -> version-15
✅ global-db:3306 is available after 0 seconds
✅ hsrcom-redis-cache:6379 is available after 0 seconds
✅ hsrcom-redis-queue:6379 is available after 0 seconds
✅ hsrcom-redis-socketio:6379 is available after 0 seconds
✅ Removed prebaked app erpnext
✅ Removed prebaked app hrms
✅ Created bench site hsr.com
✅ Installed app frappe in site.
✅ Installed dev packages in env.
✅ Configured and Started dev services.
✅ Reloaded nginx.
✅ Configured Mailhog as default mail server.
✅ Enabled Admin-tools.
✅ Restarted frappe server
✅ Workers compose not present. Generating...
✅ Saved bench config.
✅ Bench site is active and responding.
┌───────────────────┬──────────────────────────────────────────────┐
│ Bench Url     	│ http://hsr.com                           	│
├───────────────────┼──────────────────────────────────────────────┤
│ Bench Root    	│ /home/ced/frappe/sites/hsr.com           	│
├───────────────────┼──────────────────────────────────────────────┤
│ Frappe Username   │ administrator                            	│
├───────────────────┼──────────────────────────────────────────────┤
│ Frappe Password   │ admin                                    	│
├───────────────────┼──────────────────────────────────────────────┤
│ Root DB User  	│ root                                     	│
├───────────────────┼──────────────────────────────────────────────┤
│ Root DB Password  │ 7@cOI!S@e?@+_rt!f---+XD+4w3-6_Zs         	│
├───────────────────┼──────────────────────────────────────────────┤
│ Root DB Host  	│ global-db                                	│
├───────────────────┼──────────────────────────────────────────────┤
│ DB Name       	│ hsr-com                                  	│
├───────────────────┼──────────────────────────────────────────────┤
│ DB User       	│ hsr-com                                  	│
├───────────────────┼──────────────────────────────────────────────┤
│ DB Password   	│ uEKz9DOxSvGdjfk6                         	│
├───────────────────┼──────────────────────────────────────────────┤
│ Environment   	│ dev                                      	│
├───────────────────┼──────────────────────────────────────────────┤
│ HTTPS         	│ Not Enabled                              	│
├───────────────────┼──────────────────────────────────────────────┤
│ Admin Tools   	│ Tool    	┃ URL                        	│
│               	│ ━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│               	│ Mailhog 	│ http://hsr.com/mailhog     	│
│               	│ ────────────┼─────────────────────────────── │
│               	│ Adminer 	│ http://hsr.com/adminer     	│
├───────────────────┼──────────────────────────────────────────────┤
│ Bench Apps    	│ App              	┃ Version           	│
│               	│ ━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━ │
│               	│ frappe           	│ 15.37.0           	│
├───────────────────┼──────────────────────────────────────────────┤
│ Bench Services	│  frappe        	✓	nginx         	✓  │
│               	│  redis-cache   	✓	redis-queue   	✓  │
│               	│  redis-socketio	✓	schedule      	✓  │
│               	│  socketio      	✓                     	│
├───────────────────┼──────────────────────────────────────────────┤
│ Bench Workers 	│  long-worker   	✓	short-worker  	✓  │
├───────────────────┼──────────────────────────────────────────────┤
│ Bench Admin Tools │  adminer       	✓	mailhog       	✓  │
└───────────────────┴──────────────────────────────────────────────┘
✅ Please note that You will have to add a host entry to your system's hosts file to access the bench locally.

real    7m52.632s
user    0m27.123s
sys    0m22.283s
ced@deb12:~$


$ cat /etc/hosts
127.0.0.1    localhost
127.0.0.1    hsr.com

// As last line, as above

```
