# My Resume

My resume is a terminal-style portfolio with Svelte.js + TS.

## Contact and availability configuration

Copy [`.env.example`](./.env.example) to `.env.local` for local development,
or set these variables in the deployment environment **before building**:

| Variable | Default | Description |
| --- | --- | --- |
| `VITE_CONTACT_EMAIL` | `hello@example.com` | Email shown on the page, copied to the clipboard, and used by the terminal. |
| `VITE_CONTACT_PHONE` | `+1 202 555 0123` | International phone number including the country code. Displayed as entered (with surrounding whitespace removed); formatting is stripped for WhatsApp links. |
| `VITE_AVAILABLE_FOR_OPPORTUNITIES` | `true` | Exactly `true` or `false`. When false, shows a neutral, non-pulsing "Not available for new opportunities" badge without disabling contact links. |

Missing or blank email/phone settings use the generic placeholders above; replace
them with your own details before publishing. Availability defaults to `true` only
when omitted; a blank value or anything other than `true`/`false` causes an explicit
configuration error.

Vite embeds these values in the public browser bundle. Do not put secrets in them.
Restart the dev server after changing environment files. For deployment, rebuild
with `pnpm build` and redeploy the generated site after changing values; changing
environment variables on a server that only serves the built files has no effect.
Local environment files are ignored by Git; only the placeholder example is tracked.
These settings do not change the downloadable PDF documents.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).