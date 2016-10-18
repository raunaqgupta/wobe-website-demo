# Wobe Website

Jekyll based website for marketing purposes.

## Development

Follow these steps:

1. `gem install`
2. `jekyll serve`

## Deployment

To deploy the website, you need to have the right variables in the
`.env` file.

1. `cp env.sample .env`
1. `rake deploy`

After deploy, the script will print the url of the live website.

## Vagrant

The simplest way to try this project out is by using [Vagrant](https://www.vagrantup.com/).
Simply cd into the project root directory and do `vagrant up`. Port 4000 of the
VM is mapped to host's port 4000, so you can see the website in your browser
by going to [localhost:4000](http://localhost:4000). Before that though, be sure to log into the
VM using `vagrant ssh` and start the app
using `cd /vagrant && jeklyll serve --host 0.0.0.0 --port 4000`

## About

![Wobe](https://www.dropbox.com/s/vlun2grny8ijtrx/wobe-transparent.png?raw=1)

Wobe Website is maintained and funded by [Wobe Pte Ltd](www.wobe.io)
