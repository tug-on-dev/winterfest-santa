# winterfest-santa
A Secret Santa application based on NextJS, ShadCN and Local storage

## Features
- **Participant Management**: Add, edit, and remove participant names
- **Gift List Management**: Add, edit, and remove "magic electronics from the future" gift ideas
- **Assignment Generation**: Randomly assign each participant a Secret Santa recipient with a gift suggestion
- **Persistence**: All data is stored in Local Storage

## Getting Started

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To build for static deployment (GitHub Pages):

```bash
npm run build
```

The static files will be in the `out` directory.

## Deployment

This app is configured for static export and can be deployed to GitHub Pages or any static hosting service.
