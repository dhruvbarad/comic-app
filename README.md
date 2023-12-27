## Description:

This project is a dynamic web application that uses React, Vite, and Node.js. The project is deployed on Firebase (url
at the end).

## Technologies Used:

**React**: Built the frontend using React.  
**Vite**: Utilized Vite as the build tool to ensure a fast and optimized development experience.  
**Node.js**: Implemented server-side functionality using Node.js. The "index.js" server-side function fetches data from a
third-party API namely Marvel's comic API and Swapi.dev's Star-Wars API, facilitating dynamic content updates in
real-time.

## How to Use:

Explore the dynamic web application at http://comic-app-50173.web.app.  
The index.js is deployed here: https://us-central1-comic-app-50173.cloudfunctions.net/app.  
To use this, try urls
like https://us-central1-comic-app-50173.cloudfunctions.net/app/marvel_characters
or https://us-central1-comic-app-50173.cloudfunctions.net/app/starwars_characters that will give a json response, which
is then used by React components.
