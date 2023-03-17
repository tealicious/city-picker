# city-picker

[Demo](https://tealicious.github.io/city-picker-dist/)

## Requirements

Build a reusable dropdown vue component

Your challenge is to build a reusable dropdown vue component using this [REST country API](https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city)

Requirements:

1. Your API call should be handled asynchronously (bonus\*: you can add a loading icon or message while fetching the data)
2. You should be able to fetch all the countries first then after clicking on the country, displays the cities associated to it.
3. Once you get the cities, you should be able to select multiple of them and display the number of selected cities.
4. You can add a deselect all button or select all button (bonus\*)
5. Style your component as you wish
6. Show us a working demo of the component
7. Add unit test (bonus\*)

`* bonuses are not required`

Restrictions:

Vue is the only framework accepted for this project. You have complete control over which packages you use to do things like make HTTP requests.
You cannot use bootstrap or the like. SASS/SCSS is encouraged for CSS but not required only if you decide to style your component.

Submitting your solutions:

Create a github repo with a link to the live site in the README file, so we can view the site and clone your project to see the workflow.

## Project setup

- bring node up to date (>= v. 14)
- get an api token from https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city
- create a `.env` file with the approptiate values at project root:

```
VUE_APP_USER_EMAIL=[email address paired to token]
VUE_APP_USER_TOKEN=[generated token]
```

- install dependencies

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
