# A teacher planner
A basic secured website login app. Uses json web tokens stored in cookies. Client side validation using bootstrap and patterns are from mongoose schema. Uses server side rendering with express-nunjucks.

After cloning, create a .env file with the following:
MONGO_URI= the connection string for your mongo db
GOOGLE_CLIENT_SECRET= from google console, an oauth api key
GOOGLE_REDIRECT_URI=the uri to go post result of google login to
