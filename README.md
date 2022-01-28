# VitaminT Pattern Library

## Development
1. Checkout and pull the `develop` branch
2. Create a new branch based on the ticket you are working on
3. Run `npm run watch` to generate a local version of Fractal to build in
4. Commit changed files and create a PR, ommitting any built files in /public or /dist directories

For documentation on patterning elements in Fractal, reference https://fractal.build/guide/.

## Testing
### Integration Testing
Run `npm run test` and select the spec files you need to test.

[TO DO] Create a GitHub Action to auto-run test files on pull requests.

### Manual Testing
Final manual acceptance testing requires release of the code to https://stag.vitamintalent.com. To release changes to staging, take these steps:

1. Submit pull request review
2. Merge accepted review to `develop` branch
3. Checkout `develop` branch and pull
4. Run `npm run build`
5. Copy built CSS (if applicable) file to /css/main.css
6. Copy built JS (if applicable) to /js/pattern-library.js
7. Move ticket to the "In Testing" column

[TO DO] Create a GitHub Action to auto deploy CSS and/or JS files to staging environment to eliminate steps 3-6.

## Deployment
Create a pull request from `develop` to `main`. GitHub Actions will automatically build and deploy the latest version of the pattern library to the `gh_pages` branch. In dotCMS, push publish staging CSS and/or JS to production.

[TO DO] Instructions for pushing to artifactory and deploying to VT repo
