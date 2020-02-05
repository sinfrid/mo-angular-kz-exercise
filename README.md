Hello Marcos,

With angular, you have to do an application accessing the air quality thanks to OpenAQ Platform API (in local) (https://github.com/openaq/openaq-api) and to display it on a map using Leaflet (https://leafletjs.com/).

The application must be a fullscreen map and filters on countries and measurements’ values.

You have to display markers on the map thanks to the data returned by « /measurements ». When a marker is clicked you have to display the details returned by the API.

No need to sync the data, the default data when you initialized OpenAQ API are enough even if there are no results in France.
For the design I let you do what you want.

If you have difficulties mounting the docker container, you can call directly the API (https://docs.openaq.org/) but you may have CORS problems.

You have until the 6th of February to do it. When you’re done, you can push the frontend (no need to push the backend because there are no modifications on it) on GitHub and send me the link.

I will check the code quality (linter, project structuration etc), how you managed to develop the features and of course if the project run with OpenAQ Platform API.

Don’t hesitate to write me if you need help or precisions.

Good luck!