# Conversion Rate Tracker

This project is a conversion rate tracker application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

1. Clone the repository

2. Install dependencies `npm i` or `pnpm i`

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
