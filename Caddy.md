## Caddy Web server on Ubuntu

These are installation steps used to install [Caddy Web Server](https://caddyserver.com/).
Guide followed is [https://caddyserver.com/docs/install](https://caddyserver.com/docs/install#debian-ubuntu-raspbian)

Created a file caddy.sh, with following content:

```sh
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | \
    sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | \
    sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt-get update && sudo apt-get -y upgrade
sudo apt install caddy
sudo apt autoremove
```

Then run this file as:

```sh
bash caddy.sh
```

## Simplest configuration

If your domain is hsrai.com (mapped to server under your control with IP address,
say, 150.50.50.50), then following file named `Caddyfile` in folder `/etc/caddy`
will server web-pages from folder `/var/www/html`, when you type `https://hsrai.com`
in web-browser.

```sh
hsrai.com {
        # Set this path to your site's directory.
        root * /var/www/html
        # Enable the static file server.
        file_server

templates
encode gzip

try_files {path}.html {path}
}
```

## Multi-Tenancy

Single instance of Caddy can serve mayweb-sites. We configure hsrai.com above. If we
wish to host another web-site, say, rai.net, which also mapped to server with IP
address, 150.50.50.50, from folder `website/src` (like web-site source maintained in
repository named `website`, like
[https://github.com/caddyserver/website](https://github.com/caddyserver/website) to be
cloned in the user `hsr`'s home folder, i.e. `/home/hsr`) under user named `hsr`, then
ppend following to the content of already created file `/etc/caddy/Caddyfile`

# Second web-site for rai.net

```sh
rai.net {
        # Set this path to your site's directory.
        root * /home/hsr/website/src
        # Enable the static file server.
        file_server

templates
encode gzip

try_files {path}.html {path}

redir   /docs/json      /docs/json/
redir   /docs/modules   /docs/modules/
rewrite /docs/json/*    /docs/json/index.html
rewrite /docs/modules/* /docs/modules/index.html
rewrite /docs/*         /docs/index.html
}
```

Login as user hsr, and in user's home, i.e. in `cd ~` or `cd /home/hsr/`

```sh
git clone https://github.com/caddyserver/website.git
chmod 711 /home/hsr
chmod -R 755 website
```

Reload `Caddy`'s configuration by (you need to login with user having `sudo`
privileges):

```sh
sudo systemctl reload caddy
```

Caddy web-server will serve web-pages from folder `/home/hsr/website/src`, when
you type `https://rai.net` in web-browser.
