// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'lzvmolxey8'
export const apiEndpoint = `https://${apiId}.execute-api.eu-west-3.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-pcyv8cb5.eu.auth0.com', // Auth0 domain
  clientId: 'XullzFS267wM6vb46xDUKeE4pO56Lbi3', // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
