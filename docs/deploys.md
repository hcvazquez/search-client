# Deploys

We use `pm2` to deploy `npms-www`, install it by running `$ npm install -g pm2`. You may find the pm2 configuration file in `ecosystem.json5`.
The website itself is served through [nginx](http://nginx.org/) which is great to serve static content.


## Setting up

Before doing the first deploy, you need to setup the server.

### PM2

- Create the `www` user on server
- Add `www` user to the list of sudoers
- Install pm2 in the server
- Setup the deploy environment by running `$ pm2 deploy ecosystem.json5 production setup` in your local machine
- Create `~/npms-www/parameters.json` in the server with the custom configuration (API URL pointing to https://api.npms.io/v2, Google Analytics id, etc)
- Do your first deploy by running `$ pm2 deploy ecosystem.json5 production` in your local machine

### Nginx

- Install nginx in the server by running `$ sudo aptitude install nginx`
- Apply the https://github.com/h5bp/server-configs-nginx server config suggestions wisely
  - Apply best practices in `nginx.conf`
  - Replace the `mime.types` with the h5bp one
  - Copy h5bp into `/etc/nginx`
- Setup a new site (or just use the `default`) in `/etc/nginx/sites-available` with the config exemplified below
- Enable this site and finally restart nginx by running `$ sudo service nginx restart`

```
server {
  listen *:80;
  server_name npms.io;
  root /home/www/npms-www/web;

  include h5bp/basic.conf;

  # url rewrite
  location / {
     try_files $uri $uri/ @missing;
  }

  location @missing {
    rewrite ^ /index.html last;
  }
}
```


## Deploying

Deployment is easy, just run `$ pm2 deploy ecosystem.json5 production` in your local machine
