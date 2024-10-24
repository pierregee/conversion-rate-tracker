# Conversion Rate Tracker

This project is a conversion rate tracker application.

It includes two parts: a web application and a serverless function. Here's how to test each:

Web Application: Visit https://conversion-rate-tracker-app.netlify.app/ in your web browser to interact with the user interface.
Serverless Function: The serverless function retrieves currency conversion rates. You can test it directly by visiting this URL: https://puffer-vault-rate-api.netlify.app/.netlify/functions/index?network=holesky. This will call the function and return the current rate data.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

1. Clone the repository

2. Install dependencies `pnpm run install:all` || `npm run install:all`

3. Run `npm dev` or `pnpm dev`

4. This will start the development server. Navigate to `http://localhost:3000/`

## Deployment

This project is automatically deployed to Netlify.

- Continuous Deployment: Every push to the main branch triggers a new production build and deployment.
- Preview Deployments: A preview deployment is created for each pull request to the main branch, allowing you to test changes before merging.

## CI/CD

This repository uses GitHub Actions to run the e2e tests and linting on each push.

## E2E Testing

Run `pnpm test:ui` on `apps/web`

## Built With

- Next.js - The React Framework
- React Query - For fetching, caching, and updating asynchronous data
- Tailwind CSS - A utility-first CSS framework
- Radix UI - For accessible and unstyled UI components
- Netlify - For hosting and continuous deployment
- Turbo - For monorepo management

## License

This project is licensed 1 under the MIT License - see the LICENSE.md file for details
