This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

- This is a Frontend part of full-stack Job-Queue management app
- To check the Backend code please refer: https://github.com/Abhishek765/Job-Management-BE

## Getting Started

- Clone the repo
- create a `.env.development` file under `envs` folder and copy paste the contents from `.env.sample` file into it
- install dependencies via,`npm i` or `yarn`
- run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Main components of the application

- app/page.tsx -> includes the homepage
  - from here user can see all current jobs (with their status & result if resolved) in a paginated way
  - User can create new Jobs to see the process in action

Total time taken to create FE -> 4-5 hrs (Whole setup, Component designing, api integration, polling approach, pagination etc...)

## Some Screenshots of the application

<p align="center">
    <img src="https://raw.githubusercontent.com/Abhishek765/job-mangement-fe/refs/heads/master/public/demo/image.png" alt="image 0"/>
</p>
<p align="center">
    <img src="https://raw.githubusercontent.com/Abhishek765/job-mangement-fe/refs/heads/master/public/demo/image%20(1).png" alt="image 1"/>
</p>
<p align="center">
    <img src="https://raw.githubusercontent.com/Abhishek765/job-mangement-fe/refs/heads/master/public/demo/image%20(2).png" alt="image 2"/>
</p>
<p align="center">
    <img src="https://raw.githubusercontent.com/Abhishek765/job-mangement-fe/refs/heads/master/public/demo/image%20(3).png" alt="image 3"/>
</p>
<p align="center">
    <img src="https://raw.githubusercontent.com/Abhishek765/job-mangement-fe/refs/heads/master/public/demo/image%20(4).png" alt="image 4"/>
</p>
