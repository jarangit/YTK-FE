# YTK-FE

## Environment setup

Copy `.env.example` to `.env.local` and configure:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
VITE_CLARITY_PROJECT_ID=your-clarity-project-id
```

## Microsoft Clarity

Create a project at `https://clarity.microsoft.com/projects`, copy the project
ID, and set `VITE_CLARITY_PROJECT_ID` in `.env.local`.

When this variable is present, the frontend initializes the official
`@microsoft/clarity` package at app startup and begins sending session data
automatically.

## Google Sign-In

The Google OAuth Web Client must allow the frontend origin, for example
`http://localhost:5173`. The frontend sends the returned Google ID token to
`POST /auth/google` and expects the backend to create an HttpOnly session
cookie. Session restoration and logout use `GET /auth/session` and
`POST /auth/logout`.
