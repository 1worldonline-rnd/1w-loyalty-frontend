# 1World Online Loyalty platform

This is a 1World Online Loyalty platform project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Env

1. Prod: <https://loyalty.1worldonline.com/>
2. Stage: <https://loyalty-stage-ecs.1worldonline.biz/>
3. QA: <https://loyalty-qa-ecs.1worldonline.biz/>

## Documentation

<https://tokenworld.atlassian.net/l/c/y0cZcrGp>

## System Requirements

Node.js LTS
Yarn@stable
MacOS, Windows (including WSL), and Linux are supported

## Getting Started

1. Install Node.js

```bash
nvm install 18.16.0
nvm use 18.16.0
```

2. Install yarn if not present in the system:

```bash
corepack enable
corepack prepare yarn@stable --activate
```

3. Install dependencies

!!! before yarn install  run   openvpn with version 2.6.1   to get package   @1world/1w-third-party-authenticator@npm:0.0.11

```bash
yarn install
```

4. Run to start Next.js in development mode.

```bash
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/pages/index.tsx`. The page auto-updates as you edit the file.

## Technology stack

- **UI**: [`react`](https://reactjs.org/docs/getting-started.html), [`rsuite`](https://rsuitejs.com/guide/introduction/), `classnames`, [`styled-components`](https://styled-components.com/docs),
- **Data model**: [`effector`](https://effector.dev/docs/introduction/installation),
- **Lang**: `typescript`,
- **Data fetching**: [`axios`](https://axios-http.com/),
- **Routing**: [`next`](https://nextjs.org/docs),
- **Lint**: `eslint`,
- **Architecture**: [`feature-sliced`](https://feature-sliced.design/docs/intro),
- **Localization**: [`next-i18next`](https://github.com/isaachinman/next-i18next#readme).

## Project structure

```bash

├── points-balance-widget/      # https://tokenworld.atlassian.net/wiki/spaces/1WORLDONLI/pages/1512833043/Points+balance+widget
├── widget-constructor/         #
└── src/                        # Application source code
    ├── app/                    # Application initialization logic
    |   ├── styles/             #     Application styles
    |   |   ├── globals.scss    #         Global styles for application
    |   |   ├── rsuite.less     #         Rsuite components and vars customization
    |   |   └── vars.scss       #         Declaring and overriding variables
    |   ├── layout.tsx          #     Component for embedding components on all pages
    |   └── models.ts           #     Connecting business logic
    ├── processes/              # (Opt.) Application processes running on pages
    ├── pages/                  # Application pages (account-page, ...)
    |   ├── {some-page}/        #     Slice: (example page Privacy)
    |   └──  api/               #     Next.js API route support: https://nextjs.org/docs/api-routes/introduction
    ├── features/               # Parts of the application functionality (auth-by-oauth, ...)
    |   └── {feature-group}/    # A group of features that has a common subject area
    |                           # Example: Feature group "apple" has features: "apple-list" and "apple-creation-form"
    ├── entities/               # Business entities (viewer, order, ...)
    |   ├── {some-entity}/      #     Slice: (example entity User)
    |   |   ├── model/          #         Segment: Business logic
    |   |   └── ui/             #         Segment: UI logic
    ├── shared/                 # Common reusable code (UI kit, libs, API, ...)
    |   ├── api/                #     API request logic and types for them
    |   ├── constants/          #     Shared constants
    |   ├── hooks/              #     Shared hooks
    |   ├── lib/                #     Supporting self-written libraries
    |   |    └── axios.ts       #     Configuring axios instance
    |   ├── ui/                 #     Self-written UI kit of the application
    |   |   └── icons/          #     Svg-icons
    |   └── utility-types/      #     Custom utility types to facilitate common type transformations
    └── widgets/                # Standalone and complex page widgets that compose the underlying layers
                                # For mode details: https://feature-sliced.design/docs/reference/layers/widgets
```

## Learn More

To learn more about technology stack, take a look at the following resources:

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Quick excursion into feature-sliced](https://www.youtube.com/watch?v=SnzPAr_FJ7w) - Presentation: Feature Sliced - Architecture of Frontend Projects / Ilya Azin.


## Dev Notes
For testing  widget on localHost, we need to change 
    path in /widget-constructor/index.js  ->   const NEXT_PUBLIC_LOYALTY_PLATFORM_URL = 'http://localhost:3000';
    path in /widget-constructor/webpack.config.js tested widgetID to -> loyaltyWidgetId

Run build widget constructor
Start dev(script) and open http://localhost:3000/widget-constructor.html (which locates in public path)
