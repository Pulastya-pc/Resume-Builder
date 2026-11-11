# Resume Builder

A Next.js resume editor with three templates, field validation, browser saving, and PDF export. Email/password accounts and private account resume storage are provided by Better Auth and Prisma with MySQL.

## Local setup

1. Install Node.js 20.19+ and MySQL Server. In MySQL Workbench, confirm that the `resume_builder` schema exists.
2. Create a `.env` file in this folder and add `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL`.
3. Update `DATABASE_URL` with the MySQL username and password for your local server. If the password contains reserved URL characters (`@`, `:`, `/`, `#`, `%`), URL-encode those characters.
4. Generate a private auth secret. In PowerShell, run:

   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

   Paste the result into `BETTER_AUTH_SECRET` in `.env`. Keep this value private and do not commit `.env`.
5. Leave `BETTER_AUTH_URL=http://localhost:3000` for local development.
6. In this folder, run:

   ```powershell
   npm ci
   npx prisma generate
   npx prisma migrate dev --name init
   npm run dev
   ```

7. Open <http://localhost:3000>, create an account, fill out a resume, and click **Save Resume**. Anonymous resumes continue to save in the browser. Signed-in resumes also save to that account's MySQL row.

Existing `resume-data` browser data stays on the device and can be saved into the first account you sign into. After a resume is linked to an account, separate accounts use separate browser caches as well as separate database rows.

## College submission scope

The unfinished Python/AI backend is not part of this submission. It remains excluded by `.gitignore`.
