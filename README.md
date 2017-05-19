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

## License

MIT License

Copyright (c) 2017 Oleg Gromov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
