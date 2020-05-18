# fullstack-tab-tracker

> A Nuxt, Express, MongoDB project based on the the Fullstack Tab Tracker from Free Code Camp Vue fullstack series.

## Deployed link

<https://comming_soon_maybe>

### The stack on the FrontEnd is based on

1. Nuxt
2. Vue
3. VueX
4. Bootstrap-Vue
5. Axios
6. Nuxt-Auth
7. PWA
8. SCSS
9. Jest
10. Eslint
11. Bootstrap Icon

### The stack on the BackEnd is based on

1. Node Express
2. MongoDB
3. Jwt
4. MVC
5. Bcrypt

### need a env file to start this app

```(js)

BASE_URL=http://localhost:3000

MONGO_DB_CONNECTION="link to mongo database"

JWT_SECRET='WRITE_A_RANDOM_TOKEN_YOU_WOULD_LIKE_USED_FOR_AUTH'

PORT=3000

```

![picture 01]()

Backend

- [ ] Backend Testing
- [ ] Inprove error handling responses
- [ ] Create histories routes, model and controllers
- [ ] Create tabs routes, model and controllers
- [ ] create and use backend admin middleware
- [ ] Set up mongodb mongoose one to many  relationship between songs and users
- [x] search functionality
- [x] protect routes with auth middleware
- [x] create and use backend auth middleware
- [x] Req.body validation with @hapi/joi
- [ ] Learn how to and improve auth security
- [ ] add roles to users
- [x] Create users routes, model and controllers
- [x] Set up express api, cors, proxy settings and basics

Frontend

- [ ] Frontend Testing
- [ ] add animation
- [ ] display correct application statuses (logged in, online, logged out, loading)
- [ ] add full PWA support
- [ ] generate routes
- [ ] set up proper seo
- [ ] add robots.txt
- [ ] add sitemap
- [ ] UX/UI logic refactor
- [ ] add Skeleton loaders
- [ ] Dynamic switch IOS and other platform config
- [ ] Fixed safari issue and related issues on IOS platform
- [ ] Fixed desktop safari playing issues
- [ ] Home page restructure for desktop view
- [ ] theme and color settings
- [ ] animated transition
- [ ] theme switch (dark and light)
- [ ] responsive design improvements
- [x] search functionality
- [ ] frontend login & registration form validation
- [x] use bootstrap icons opposed to fontawesome
- [x] display logged in, signed in and out statuses globally
- [x] improve error handling and display
- [ ] create and use frontend admin middleware
- [x] allow to review password
- [x] frontend user Registration
- [x] frontend user authentication (login, logout and fetchUser data)
- [x] proper navigation
- [x] state management init
- [ ] add readme documentation for all major directories
- [x] setup readme for documentation
- [x] Project initialization

## Deployment Setup

### Options

1. Deploy main branch with npm run build or npm run generate as stated below.

### nginx

- [Using nginx as a reverse proxy](https://nuxtjs.org/faq/nginx-proxy/)
- [Blog post on the deployment process to nginx](https://www.waysquare.com/creating-vue-js-application-using-nuxt-js-and-nginx/)
- [Deploy nuxt app (Vue.js) with Pm2 and Nginx](https://kenyaappexperts.com/blog/deploy-vue-js%E2%80%8A-with-pm2-and-nginx/)

<!-- Given the .env page is populated with relevant data -->

Note:

1. Server port points to

```bash
server: {
    port: 3000, # update according to server requirements
    host: '0.0.0.0'
  },
```

as updated in nuxt.config.js coment section out or update places it's needed on nginx deployment.
2. Your webserver is not aware of the routing inside your Vue application, so you'll need to have Nginx point all requests to the application to the index.html and after that Vue routing will take over. The documentation can be found [here](https://router.vuejs.org/guide/essentials/history-mode.html).

The required configuration snippet copied from there is the following:

```bash
location / {
  try_files $uri $uri/ /index.html;
}
```

Or if using nginx proxy, The documentation can be found [here](https://nuxtjs.org/faq/nginx-proxy/)

#### Nginx Proxy

For Nginx you can add a proxy using the follwing location block:

```yaml
server {
    location / {
        proxy_pass http://http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Process Manager

In production you need a process manager to keep the Node server alive forever:

```bash
# install pm2 process manager
npm install -g pm2

# startup script
pm2 startup

# start process
pm2 start npm --name "tab-tracker" -- run start

# save process list
pm2 save

# list all processes
pm2 l
```

After each deploy you'll need to restart the process:

```bash
pm2 restart tab-tracker
```

To update, install, generate and restart server with all new changes from github use the bellow command

```bash
npm run update
```

Make sure to read the [Nuxt docs](https://nuxtjs.org/).

More Information on deploying to Nginx

```bash
map $sent_http_content_type $expires {
    "text/html"                 epoch;
    "text/html; charset=utf-8"  epoch;
    default                     off;
}

server {
    listen          80;             # the port nginx is listening on
    server_name     your-domain;    # setup your domain here

    gzip            on;
    gzip_types      text/plain application/xml text/css application/javascript;
    gzip_min_length 1000;

    location / {
        expires $expires;

        proxy_redirect                      off;
        proxy_set_header Host               $host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                          http://127.0.0.1:3000; # set the adress of the Node.js instance here
    }
}
```

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
