# Counter

Counter is a small web-application for tracking expenses in different lists. It's made mostly for educational purpose but I'm about to really use it.

**It's incomplete yet!**

When I finish it, the application will be deployed to a specific domain where you could test it.

## Used technologies

- React / React Router
- Node.js / express
- MySQL

Everything is bundled using Webpack 2.

The styles are isolated from each other using CSS Modules.

The initial idea was to implement a RESTful API but I violated it's purity by introducing mandatory session authentication to perform API calls. It's bad (especially because it's hard to test the API now) but I have no idea how to make it better without switching to a TLS connection with token signed API requests. Which is hard to implement for me now.