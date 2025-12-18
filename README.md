# Ticket

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.9.

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

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Project structure
<pre> ```
ticket/
src/
├── app/
│   ├── core/                          # Business logic, agnostic of Angular
│   │   ├── domain/                    # Entities and interfaces
│   │   │   ├── entities/              # class Claim { ... }
│   │   │   ├── repositories/          # interface IClaimRepository
│   │   │   └── exceptions/            # Custom errors
│   │   └── use-cases/                 # Application rules
│   │       ├── claims/                # process-claim.usecase.ts
│   │       └── auth/                  # login.usecase.ts
│
│   ├── infrastructure/                # Framework-dependent implementation
│   │   ├── api/                       # External HTTP or WebSocket APIs
│   │   │   ├── claim.api.ts
│   │   │   └── auth.api.ts
│   │   ├── persistence/              # Data sources, local DBs
│   │   ├── services/                 # e.g., logger.service.ts
│   │   └── ui/                       # Angular-specific infrastructure
│   │       ├── components/           # Generic reusable UI
│   │       ├── directives/
│   │       └── pipes/
│
│   ├── application/                  # Adapters (Controllers, DTOs, Presenters)
│   │   ├── controllers/              # Facade services or BFF endpoints
│   │   ├── presenters/               # Format use-case results for UI
│   │   └── dtos/                     # Input/output structures
│
│   ├── presentation/                 # Angular-specific views and features
│   │   ├── app/                      # App bootstrap
│   │   │   ├── app.component.ts
│   │   │   ├── app.routes.ts
│   │   │   ├── app.config.ts
│   │   │   └── app.providers.ts      # DI: map abstract → concrete
│   │   ├── features/                 # Lazy-loaded feature areas
│   │   │   ├── claims/
│   │   │   │   ├── pages/            # Smart route components
│   │   │   │   ├── components/       # Dumb components
│   │   │   │   ├── claims.routes.ts
│   │   │   │   └── claims.module.ts
│   │   │   └── auth/
│   │   ├── layouts/                  # App shells/layouts
│   │   │   ├── auth-layout/
│   │   │   └── main-layout/
│   │   └── shared/                   # Reusable shared UI logic
│   │       ├── ui/
│   │       └── utils/
│
│   └── store/                        # NgRx or other state management
│       ├── actions/
│       ├── effects/
│       ├── reducers/
│       └── selectors/
│
├── assets/                           # Static files
│   ├── i18n/
│   ├── images/
│   └── styles/
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── index.html
``` </pre>

## Global architecture
<pre>```
┌─────────────────┐                           ┌─────────────────┐
│   Frontend Web  │                           │   Mobile App    │
│   (Angular)     │                           │   (e.g.,Fluter) │
└─────────┬───────┘                           └─────────┬───────┘
          │                                             │
          └───────────────────────┼─────────────────────┘
                                  │
                    ┌─────────────┴───────────┐
                    │     API Gateway         │
                    │   (Load Balancer)       │
                    └─────────────┬───────────┘
                                  │
                    ┌─────────────┴───────────┐
                    │       Backend API       │
                    │       (SnapLogic)       │
                    └─────────────┬───────────┘
                                  │
                    ┌─────────────┴───────────┐
                    │     Database Layer      │
                    │      (SQL Server)       │
                    └─────────────────────────┘
```</pre>