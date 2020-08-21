# Refreshments

It's hot outside - make sure to stay hydrated!

🍹🍸🍷🍵☕️🍺🍼🧃🧉🥃🥛🥤🍻🍾

## What happens here

This repo aims to be a small collection of cases to refresh pages after some time.

### Using docker 🐋

To run locally using docker you can call:

```bash
docker run -p 3000:3000 --rm runjak/refreshments
```

Afterwards visit [localhost:3000](http://localhost:3000) to see a list of the various refreshments.

### Using node

* Clone repo
* `yarn install` or `npm install`
* `node index.js`

## Odd ends

An attempt to list some things that did not work, but were interesting anyway:

* Setting a `data:text/html` or a `javascript:` URL as redirect target or in `<meta />` did not work out. From the perspective of the user-agent this is a good thing. From the perspective of Schabernack it's slightly sad.
