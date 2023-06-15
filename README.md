# djlokal
Uniting the local party scene, simplifying planning, fostering collaboration and enhancing experiences.

> Domain: `djlokal.de`

## Description
*djlokal* is an emerging business that seeks to consolidate the local party scene. 
Our company operates as a regional party platform, providing a centralized hub for event planners, local venues and DJs. 
We aim to simplify the party planning process by offering a single platform that showcases upcoming events, available locations, and DJs based on their preferred genres. 
Moreover, we facilitate communication between event planners and venues and we encourage feedback to enhance the overall party experience. 
Our future plans involve expanding the platform to cover multiple regions and further centralize the party scene.

## Business activities
- **Centralize the local party scene**:
Our organization is an upcoming regional party platform. 
Local locations and DJ’s should get the opportunity to introduce themselves into the party scene to get some traffic. 
While nowadays each club has it’s own website and has to do researching for DJ’s and overlapping events we want to make this centralized on one certain platform. 
This platform should show any upcoming events, show locations where events could be planned and show DJ’s with their preferred genre so event planner can search for their prioritized options.

- **Enable communication of locations and people who want to do an event**:
Locations should show if they can be accessible for a potential event so the event planner can contact them if they are interested.

- **Improve the party scene with feedback options**
We want to improve the scene while providing a feedback service to comment every event, location, DJ or different constellations of the three parts. 
The feedback should show the event planner what they can do better. 
Locations should see if they can improve their setting or remove bad things.

- **Future work**
In the future we think about expanding this platform or create one for each region to centralize the party scene even more in one place or in each region.

## Information management tasks
*As an app user, I would like to...*
| #   | Original                                               | Improved                                                                |
| --- | ------------------------------------------------------ | ----------------------------------------------------------------------- |
| 1   | Create Event: id, location, dj, genres, date, time     | Create an event with fields id, name, location, dj, genres, date, time |
| 2   | Update Event                                           | Update an event fields name, location, dj, genres, date, time          |
| 3   | Delete Event                                           | Delete an event                                                         |
| 4   | Enter feedback to event after it happened              | Enter feedback to an event if and only if it already happened           |
| 5   | Create Location: id, address, contact                  | Create a location with fields id, name, address, contact                |
| 6   | Update Location                                        | Update a location fields name, address, contact                         |
| 7   | Delete Location                                        | Delete a location                                                       |
| 8   | Enter feedback to Location                             |                                                                         |
| 9   | Enter data about DJ's - id, name, genre                |                                                                         |
| 10  | Delete DJ data                                         |                                                                         |
| 11  | Enter feedback to DJ                                   |                                                                         |
| 12  | Maybe some kind of time slot overview                  |                                                                         |
| 13  | Give an overview about best events, locations and dj's |                                                                         |


##  Requirements Elaboration 
| Client's Requrements| Elaborated requirements| 
| --------------------| :--------------------: | 
| Dashboard |  The data should be informed information about local events, such as exact location, as well as about Djs and ablaufsplann.  |
| **Goal**| The goal is to search and find available event, with matching djs, location and type of music.|
|Search destination / select suitable criteria / output available location / delete |User can get information, select desired criteria and get available/suitable event.
| Show Goal | For example, a list where several events are shown with information that corresponds to the taste and choice of the customer. |
|**Kriterien** | Objects is genre / event / location and DJs |
| Selection| Selection of the preferred genres, the event of the place and the DJs from which the information can be obtained.|
| Feedback| The app allows the user to give feedback on all three criteria Dj, venue and event after the event. It will exist as a text comment and also as a rating. |
| Show / Update / Delete Measurements | The result will be displayed in a table format. It is possible to select/update and delete genre.|

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
- @[gmedina-de](https://github.com/gmedina-de): 
  - Assignment 7B:
    - Submit some developer issues regarding README.md
    - Add Markdown formatting to README.md
    - Add team members to README.md
    - Fix spelling errors in README.md
    - Improve 50% of information management tasks in README.md
    - Set up UML diagrams
    - Create domain information model UML diagram
  - --

