#!/bin/sh

# setup vagrant for use with website

apt-get update
locale-gen en_IN en_US

apt-get install -y git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev

sudo -H -u vagrant bash -c 'git clone https://github.com/rbenv/rbenv.git ~/.rbenv'

echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> /vagrant/.bashrc
echo 'eval "$(rbenv init -)"' >> /vagrant/.bashrc

sudo -H -u vagrant bash -c 'git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build'

echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> /vagrant/.bashrc

sudo -H -u vagrant bash -c 'rbenv install 2.3.1'
sudo -H -u vagrant bash -c 'rbenv global 2.3.1'
sudo -H -u vagrant bash -c 'gem install bundler'
sudo -H -u vagrant bash -c 'cd /vagrant && bundle'
