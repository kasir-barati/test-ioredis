# Fixme

## Priority: Up

Subject: Different env file for different environment

Description: We do not use a `ConfigService` correctly. We just use the `process.env.*` everywhere which put us on a disability to take advantage of techniques like read multiple env file due to the environment, Stackoverflow is lousy of this trick, [for more read this](https://stackoverflow.com/a/63800769/8784518)

Solution:

-   [In `app.module.ts`](https://github.com/kasir-barati/you-say/blob/main/src/app/app.module.ts)
-   [In `other.module.ts`](https://github.com/kasir-barati/you-say/blob/main/src/packages/logger/logger.module.ts)
-   A short description: In this way we just need to define env files in the `app.module.ts` and rest off `ConfigService.forFeature`s will use the specified file in `app.module.ts`.

Why we should do this:

-   Testing and development env needs its own env file.
-   This way we have validation before App startup. It saves time because we can throw error iff something was wrong, for example in test env we were trying to connect to the primary production database. It will definitely is not something we want.
-   More modularity, Each module handles its own env validation and loading.
-   Type safety increases greatly
