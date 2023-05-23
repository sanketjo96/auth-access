# auth-access

## App Structure
- Server.js is the simple node server with below endpoints
  - login - Validate user and create user token which then returned back in cookie
  - data - It returns relevant user data as per user role. It checks access token before proceeding.

## Session based authentication process
- In this process, server sends session token returns to client in the form of cookie, which will be sent for further requests.
- Server stores the user in session memory/memcache/reids where sesionId points to it. (unlike JWT)
- When server sets cookie its important to set below params
  - secure - Helps to share cookie securely and indicates browser to hold on it
  - httpOnly - This is to prevent client from accessing sessionId.Its accessible only to http request and will be sent automatically only with http
  - sameSite - Denotes whether to share cookie across domain or over same domain


