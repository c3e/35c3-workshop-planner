# 35c3-workshop-planner
This is an expo.io app for mobile devices to plan your workshops at the 35c3 event in Leipzig


## DOWNLOAD
[Version 1.0.0](app-releases/35c3-workshop-planner-23ca4b2f7f1d49eb932bc333e0d163a3-signed.v1.0.0.apk)

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

- 2018 workshop list: ``https://events.ccc.de/congress/2018/wiki/index.php/Static:Self-organized_Sessions#List_of_Self-organized_Sessions``

- styleguide: https://pbs.twimg.com/media/DrVifILW4AEZW8R.jpg

- icon archive 1: https://oblador.github.io/react-native-vector-icons/
- icon archive 2: https://expo.github.io/vector-icons/


## current TODO list 

- Add link to session creation page
- fix button with concurrent events in discover mode
- show when event not find anymore
- fix or remove change language into settings-tab
- cleanup workshop detail page

