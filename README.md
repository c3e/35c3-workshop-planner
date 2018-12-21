# 35c3-workshop-planner
This is an expo.io app for mobile devices to plan your workshops at the 35c3 event in Leipzig


## Software to build this project

First you need node.js
* https://nodejs.org/en/download/

I recommend nvm to organise your Node version:
* https://github.com/creationix/nvm

Recommended package manager: yarn
* https://yarnpkg.com/en/docs/install

This software is written in TypeScript. Install it global with:

``yarn global add typescript``

If you want to lint your code also install tslint: 

``yarn global add tslint``

To install the expo.io Clint run:

``yarn add global expo-cli@2.6.6``
(current Version 2.6.8 is buggy, so i use 2.6.6)

Now you are ready to install the dependencies:

``yarn install``

To start the app run:

``yarn start``


### NOTES FOR DEVELOPMENT

- 2017 workshop list: ``https://events.ccc.de/congress/2017/wiki/index.php/Static:Self-organized_Sessions#List_of_Self-organized_Sessions``

- Table Component you maybe want to use: ``https://www.npmjs.com/package/react-native-table-component``

- Howto use the expo.io calendar: ``https://docs.expo.io/versions/latest/sdk/calendar``

- Get information about the sessions:
 ``https://events.ccc.de/congress/2017/wiki/api.php?action=query&prop=revisions&pageids=2081|2195&rvprop=ids|timestamp|user|userid|size|tags|parsetree``
 
- to better parse information use: fast-xml-parser

styleguide: https://pbs.twimg.com/media/DrVifILW4AEZW8R.jpg

- icon archive: https://oblador.github.io/react-native-vector-icons/ oder https://expo.github.io/vector-icons/


## current TODO list 

#### Must have:
- show Favorites list
- show details of favorite event
- add to calendar from fav list
- refresh/reload button in settings screen  
- ship it!


#### nice to have
- fix button with concurrent events in discover mode
- show when event not find anymore
- Add change language into settings-tab
- cleanup workshop detail page
- cleanup settings tab
- Add link to session creation page
