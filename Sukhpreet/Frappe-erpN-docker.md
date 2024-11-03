# Frappe, ERPNext, and Docker Setup on Linux

## Step 1: Update System Packages
```bash
sudo apt update && sudo apt upgrade -y
```
## Step 2: Install Required Dependencies
```bash
sudo apt install -y python3-dev python3-setuptools python3-pip virtualenv software-properties-common curl
```
## Step 3: Install Docker
1. Set up the Docker repository:
```bash
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
2. Install Docker and Docker Compose:
```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io
sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep -Po '"tag_name": "\K.*?(?=")')/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```
3. Verify Docker and Docker Compose installation:
```bash
docker --version
docker-compose --version
```
## Step 4: Install Frappe Bench
1. Install Nodejs and yarn
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g yarn
```
2. Install Redis(required for Frappe):
```bash
sudo apt install -y redis-server
```
3. Install wkhtmltopdf (required for PDF generation in ERPNext):
```bash
sudo apt install -y wkhtmltopdf
```
4. Install Frappe Bench CLI:
```bash
sudo pip3 install frappe-bench
```
## Step 5: Set Up Frappe and ERPNext Using Docker
1. Create a Project Directory:
```bash
mkdir frappe_docker
cd frappe_docker
```
2. Clone Frappe Docker Repositry:
```bash
git clone https://github.com/frappe/frappe_docker.git .
```
3. Copy Example Environment Files:
```bash
cp env-local .env
cp example/docker-compose.yml docker-compose.yml
```
4. Initialize the Frappe Site:
```bash
docker-compose run --rm site-creator
```
5. Start Frappe and ERPNext:
```bash
docker-compose up -d
```
## Step 6: Access ERPNext
After the setup completes, you can access ERPNext by visiting:
```bash
http://localhost:8080
```
