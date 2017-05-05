## Server

- mysql connection errors handling
- return created elements (lists, items) with their ids after creation
  - yes, it will be useful!
- what to return if the item was not deleted because it didn't exist?
- what to do when unexisting list is requested?

## Features

- i18n
- lists editing (perhaps we don't need?)
- currencies
- spending categorizing

## App logic

- start counting the age of items in the background
- figure out whether we need cloneDeep for objects and if yes, switch to Immutable.js
- server sync logic:
  - use returned inserted item instead of re-fetching the entire collection again
  - after deletion delete it on the client without waiting for server to ask
    - how to handle deletion error?
  - handle errors
  - animation between states

### Check for bugs / testing

- client-server interaction: test everything with really long server answer delays
- client: ready to delete logic

## Styling

- add `postcss-autoreset`
- inline the font import
- figure out how to expand the long text element

- clean up everything

## Deploy

- replace moment.js and brush up date types throughout the app