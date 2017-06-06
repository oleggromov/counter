# Current version (0.1)

## Check it
- FB auth cases

## ToDo

- brush up API response class usage, especially in the auth part
- refactor the whole auth module

## DB
- connection pool
- indexes, are they needed?

## Production version
- minification / uglification
- different ports / hosts
- replace moment.js and brush up date types throughout the app
- static files caching
- logging server-side errors

## Deploy / publication

- find out how/where to deploy
- make a production App on Facebook
- how to log what happens
- database backup
- **presentation**
  - write a nice readme
  - make a counter-demo.oleggromov.com website
  - write a project description for portfolio
  - write the second part of "how I made it"
  - brush up the first and publish both of them on the website
    - publish on social networks

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

## Figure out

- figure out how to switch to Immutable.js for immutable states
- timezones, do they work as expected?
