<p align="center">
  <a href="https://webapp23-group5.web.app/#"><img src="public/favicon.svg?raw=true" width="120" title="hover text"></a>
  <br>
  Visit the <b>Firebase 🔥 demo</b> by tapping on the logo.
</p>

# djlokal

Uniting the local party scene, simplifying planning, fostering collaboration and enhancing experiences.

> Domain: `djlokal.de`

## Description

_djlokal_ is an emerging business that seeks to consolidate the local party scene.
Our company operates as a regional party platform, providing a centralized hub for event planners, local venues and DJs.
We aim to simplify the party planning process by offering a single platform that showcases upcoming events, available venues, and DJs based on their preferred genres.
Moreover, we facilitate communication between event planners and venues and we encourage feedback to enhance the overall party experience.
Our future plans involve expanding the platform to cover multiple regions and further centralize the party scene.

## Business activities

- **Centralize the local party scene**:
  Our organization is an upcoming regional party platform.
  Local venues and DJ’s should get the opportunity to introduce themselves into the party scene to get some traffic.
  While nowadays each club has it’s own website and has to do researching for DJ’s and overlapping events we want to make this centralized on one certain platform.
  This platform should show any upcoming events, show venues where events could be planned and show DJ’s with their preferred genre so event planner can search for their prioritized options.

- **Enable communication of venues and people who want to do an event**:
  Venues should show if they can be accessible for a potential event so the event planner can contact them if they are interested.

- **Improve the party scene with feedback options**:
  We want to improve the scene while providing a feedback service to comment every event, venue, DJ or different constellations of the three parts.
  The feedback should show the event planner what they can do better.
  Venues should see if they can improve their setting or remove bad things.

- **Future work**:
  In the future we think about expanding this platform or create one for each region to centralize the party scene even more in one place or in each region.

## Information management tasks

_As an app user, I would like to..._
| # | Original | Improved |
| --- | ------------------------------------------------------ | ----------------------------------------------------------------------- |
| 1 | Create Event: id, venue, dj, genres, date, time | Create an event with fields id, name, venue, dj, genres, date, time |
| 2 | Update Event | Update an event fields name, venue, dj, genres, date, time |
| 3 | Delete Event | Delete an event |
| 4 | Enter feedback to event after it happened | Enter feedback to an event with fields id, stars, comment if and only if it already happened |
| 5 | Create Venue: id, address, contact | Create a venue with fields id, name, address, contact |
| 6 | Update Venue | Update a venue fields name, address, contact |
| 7 | Delete Venue | Delete a venue |
| 8 | Enter feedback to Venue | Enter feedback to a venue with fields id, stars, comment |
| 9 | Enter data about DJ's - id, name, genre | Create a DJ with fields id, name, genre |
| 10 | | Update a DJ fields name, genre |
| 11 | Delete DJ data | Delete a DJ |
| 12 | Enter feedback to DJ | Enter feedback to a DJ with fields id, stars, comment |
| 13 | Maybe some kind of time slot overview | Show a time slot overview for a specific venue |
| 14 | Give an overview about best events, venues and dj's | Show an overview about best events, venues and DJ's |
| 15 | | Show an overview about event participants |
| 16 | | Add myself as event participant |
| 17 | | Remove myself as event participant |

## UML diagrams

### Domain information model

![Domain information model](uml/dim.png?raw=true)

### Information design model

![Information design model](uml/idm.jpg?raw=true)

## Team members

### Client

- @[PramitKumar27](https://github.com/PramitKumar27)
- @[ruehsflo](https://github.com/ruehsflo)

### Developer

- @[uniChkhitunidze](https://github.com/uniChkhitunidze)
  - Assignment 7B:
    - Submit some developer issues regarding README.md
    - Improve second 50% of information management tasks in README.md
    - Set up UML diagrams using diagrams.net
    - Create information design model UML diagram
  ***
  - Assignment 7C-1:
    - Implement Genre enum
    - Replace icons in navigation
  ***
  - Assignment 7C-2:
    - Handle authentication status
    - Enable or disable UI elements depending of authentication status 
  ***
  - Assignment 7C-3:
    - Add external JSON file for test data
    - Add firestore rules
  ***
  - Assignment 7C-4:
    - Implementation of Venue Model
    - Implementation of Venue CRUD operations
    - Implementation of Venue validation
    - Implementation of Event Model
    - Implementation of Event CRUD operations
    - Implementation of Event validation
    - Implementation of Event calendar
    - Implementation of pagination for venues, events and feedbacks
    - Implementation of test data for venues, events and feedbacks
    - Implementation of firestore rules for venues, events and feedbacks
- @[gmedina-de](https://github.com/gmedina-de)
  - Assignment 7B:
    - Submit some developer issues regarding README.md
    - Add Markdown formatting to README.md
    - Add team members to README.md
    - Fix spelling errors in README.md
    - Improve first 50% of information management tasks in README.md
    - Set up UML diagrams using PlantUML
    - Create domain information model UML diagram
  ***
  - Assignment 7C-1:
    - Set up NPM project with required libraries
    - Set up firebase and firestore environment
    - Set up GitHub actions for automatic deployment
    - Implement demo tutorial app using Vue.js
    - Implement responsive UI using Bootstrap and Feather icons
    - Implement navigation bar
    - Implement DJ model class and its CRUD operations
    - Implement generate test data and clear data functionalities
  ***
  - Assignment 7C-2:
    - Set up firebase authentication
    - Add sign in / out UI elements
    - Implement sign in / out functionality
    - Implement 404 page
    - Implement own verifyEmail / forgotPassword functionality
  ***
  - Assignment 7C-3:
    - Implement property checks on view / model code
    - Implement asynchronous ID/uniqueness constraint	
    - Implement DB-UI synchronization 
  ***
  - Assignment 7C-4:
    - Implementation of Feedback Model
    - Implementation of Feedback CRUD operations
    - Implementation of Feedback validation
    - Implementation of best of lists

## Project setup
### Install dependencies
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

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Deploy to Firebase
After committing and pushing to GitHub, 
a build and deploy action will be triggered for the `dist` folder, 
so no manual `npm run build && firebase deploy` at the local machine is being required.

In order to reconfigure this automatic process when switching the repo, follow this guide: https://firebase.google.com/docs/hosting/github-integration.