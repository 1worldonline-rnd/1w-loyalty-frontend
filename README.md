# 1World Online Loyalty platform

This is a 1World Online Loyalty platform project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## System Requirements

Node.js LTS
Yarn@stable
MacOS, Windows (including WSL), and Linux are supported

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
