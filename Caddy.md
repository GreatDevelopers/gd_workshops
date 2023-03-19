## Caddy Web server on Ubuntu

These are installation steps used to install [Caddy Web Server](https://caddyserver.com/). Guide followed is [https://caddyserver.com/docs/install](https://caddyserver.com/docs/install#debian-ubuntu-raspbian)

```sh
time sudo apt-get update && sudo apt-get -y upgrade

<snip>

Hit:3 http://archive.ubuntu.com/ubuntu jammy-backports InRelease
Hit:4 http://archive.ubuntu.com/ubuntu jammy-security InRelease
Reading package lists... Done

real	0m4.698s
user	0m0.017s
sys	0m0.010s

<snip>

The following packages were automatically installed and are no longer required:
  libflashrom1 libftdi1-2
Use 'sudo apt autoremove' to remove them.
The following packages have been kept back:
  libudev1 linux-generic linux-headers-generic linux-image-generic sosreport
  udev
0 upgraded, 0 newly installed, 0 to remove and 6 not upgraded.
real	0m0.634s
user	0m0.009s
sys	0m0.015s

sudo apt autoremove

```
