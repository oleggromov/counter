# Current version (0.1)

## ToDo

- handle absent db connection error (not redirect to a main screen)
- check FB auth cases
- brush up API response class usage, especially in the auth part
- refactor the whole auth module
- replace MemoryStore session storage with something production ready

## Deploy / publication

- production config
  - different ports / hosts
- find out how/where to deploy
- make a production App on Facebook
- logging server-side errors
- database backup
- **presentation**
  - write a nice readme
  - make a counter-demo.oleggromov.com website
  - write a project description for portfolio
  - write the second part of "how I made it"
  - brush up the first and publish both of them on the website
    - publish on social networks
- static files caching
  - web server settings?
  - bundle versioning

# Next version (1.0?)

- spending reports and categorization
- different currencies
- i18n
- https

## ToDo

- items and lists editing
- **appearance**
  - beautiful client-side errors instead of alerts
  - animation between states
  - figure out how to expand the long text element
  - find out how to make error message transitions for blurring/opacity and whatsoever more gradual
- off-line working web app, wouldn't it be great?
- Denchik: make interface elements bigger
- [find out a good solution](https://github.com/ReactTraining/react-router/issues/4407#issuecomment-304395759) to prevent navigation before data sync is finished.
- tests:
  - API tests
    - write tests
    - figure out how to pass by the authorization for testing
    - and how to *actually test* it
  - client-side tests
- directory structure
- brush up css/markup for different browsers
- start counting the age of items in the background without page reload
- add `postcss-autoreset`
- find out why the user ids are increased as crazy
- animations
  - figure out why clicking into list element forces animation to hop to the beginning
- [safari iOS delete button swipe animation bug](https://github.com/daneden/animate.css/issues/519#issuecomment-304545710)
- set the server-side production env variable only once instead of checking `process.env.NODE_ENV` variable

## Figure out

- figure out how to switch to Immutable.js for immutable states
- DB indexes, are they needed?
- how to correctly use `dependencies` and `devDependencies` in `package.json` (https://github.com/npm/npm/issues/6803#issuecomment-75621914)