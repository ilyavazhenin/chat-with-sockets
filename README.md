# 💬 A slack-alike chat 
[![Actions Status](https://github.com/ilyavazhenin/frontend-project-12/workflows/hexlet-check/badge.svg)](https://github.com/ilyavazhenin/frontend-project-12/actions) [![eslint test](https://github.com/ilyavazhenin/frontend-project-12/actions/workflows/eslint.yml/badge.svg)](https://github.com/ilyavazhenin/frontend-project-12/actions/workflows/eslint.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/05c782abb4c2f596a894/maintainability)](https://codeclimate.com/github/ilyavazhenin/frontend-project-12/maintainability)

A minimalistic chat based on websockets. Core features are: messaging and channels (with couple of default ones and creating, renaming and deleting new ones).

## 🖥️ How to install

```bash
  1. git clone ...
  2. make install
```
    
## 👾 How to run and play around

While in project root directory:

```bash
  make start
```

This will start both frontend and backend. Go to **localhost:3000** to check the chat ;)

See other options and commands in **Makefile**.

**To enter the chat**, you can sign up as a new user or sign in as an *admin* with the same password.


## 🛠️ Tech Stack

**Client:** React, Redux Toolkit, React-Bootstrap, socket.io

**Server:** Fastify, socket.io

**Additional libraries:**
- *i18next* for easy re-use and editing all UI texts 
- *axios* for fetching first-load chat data
- *formik* for making react forms
- *yup* for forms validation schemas
- *react router* for routing in the SPA
- *toastify* for nice toasty notifications
- *leo-profanity* for filtering bad words in EN and RU
- *axios* for fetching first-load chat data
- *eslint with air-bnb rules* for checking the code
- *rollbar* to watch for client errors in production


## 🕸️ Play around with deployed instance of the Chat:
*Here's gonna be a link for Render . com once I figure it out :D*