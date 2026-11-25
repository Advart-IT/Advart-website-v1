# Advart-website-v1
# Advart-website-v1

The contact form posts through `/api/contact` to
`https://tasks.advartit.in/api/v1/contact-enquiries` instead of SMTP.
Set `CONTACT_API_TOKEN` in `.env.local` for development and in your hosting
environment for production, then restart/redeploy. This is a server-only secret;
do not prefix it with `NEXT_PUBLIC_`.

The backend at `tasks.advartit.in` must also have `CONTACT_FORM_TOKEN` set to
the same value as this website's `CONTACT_API_TOKEN`. If the backend variable
is missing, the API disables the endpoint and returns HTTP 503.
