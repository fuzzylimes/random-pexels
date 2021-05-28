## Random Pexels
I wanted to to have a way to get random images for potential projects. I saw that a site I commonly use for stock images ([pexels](https://pexels.com)) had an API for image retrieval. I decided to make a simple way to randomly retrieve images (hence `random-pexels`).

There are a few problems with this API:
1. The pexels API doesn't natively support a "random" function
    * Pexels has a "Curated" list, which is potentially random images, but we have to further randomize this
    * Select a random page to pull images from (appears that this list is capped at 8000 images)
2. The pexels API is very slow
    * I assume that this slowness is due to page traversal

### Usage
When deployed, will create a serverless function to handle the requests to the pexels API. There is no front end to the app. You will need to sign up for a free Pexels account in order to generate your own key.

Requests will go to `/api/random` to retrieve a single image. You can request up to 80 images be returned in the response by including a query string `?count=15`.

### Thoughts
The response time makes this almost unusable for any of the projects I was wanting to use it for. Hopefully someone else will find this useful for their project.