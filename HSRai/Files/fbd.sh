#!/bin/bash

# Path to be added
PATH_TO_ADD="$HOME/.local/bin"

# Line to add to .bashrc
LINE_TO_ADD="export PATH=\$PATH:$PATH_TO_ADD"

# Check if the line is already in .bashrc
if ! grep -Fxq "$LINE_TO_ADD" "$HOME/.bashrc"; then
    # Append the line to .bashrc
    echo "$LINE_TO_ADD" >> "$HOME/.bashrc"
    echo "Path added to .bashrc"
else
    echo "Path already exists in .bashrc"
fi

# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl w3m python3-pip -y
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
sudo usermod -aG docker $USER
pip install frappe-manager --break-system-packages
