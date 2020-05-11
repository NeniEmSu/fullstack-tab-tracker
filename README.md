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

### The stack BackEnd is based on

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

```

![picture 01]()

Backend

- [ ] Create histories routes, model and controllers
- [ ] Create tabs routes, model and controllers
- [x] Create users routes, model and controllers
- [x] Set up express api, cors, proxy settings and basics

Frontend

- [ ] add full PWA support
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
- [ ] responsive design implement
- [ ] search functionality
- [x] frontend user Registration
- [x] frontend user authentication (login, logout and fetchUser data)
- [x] proper navigation
- [x] state management init
- [x] Project initialization

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
