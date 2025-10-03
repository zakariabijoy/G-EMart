# Client

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Setting up Local SSL Certificate with mkcert

To set up a local SSL certificate for development using mkcert:

1. Install mkcert:
   - On Windows: `choco install mkcert` or `scoop install mkcert`
   - On macOS: `brew install mkcert`
   - On Linux: Follow instructions at https://github.com/FiloSottile/mkcert

2. Install the local Certificate Authority (CA):
   ```bash
   mkcert -install
   ```

3. Generate certificates for localhost in client/ssl directory:
   ```bash
   mkcert localhost
   ```
   This will create `localhost.pem` and `localhost-key.pem` in the client/ssl directory.

4. Configure angular.json for SSL (optional, but recommended for convenience):
   - Open `angular.json`.
   - Under `"projects"` -> `"client"` -> `"architect"` -> `"serve"` -> `"options"`, add:
     ```json
     "ssl": true,
     "sslCert": "ssl/localhost.pem",
     "sslKey": "ssl/localhost-key.pem"
     ```
   - Save the file.

5. Start the development server:
   ```bash
   ng serve
   ```

   Then, navigate to `https://localhost:4200/`.

   If you didn't configure angular.json, use:
   ```bash
   ng serve --ssl --ssl-cert ssl/localhost.pem --ssl-key ssl/localhost-key.pem
   ```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
