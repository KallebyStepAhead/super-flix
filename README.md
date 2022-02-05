## Getting Started

### Aplication Config
#### 1. Creating API Server:
>Create an account in [GraphCMS](https://graphcms.com/) and start a free blank project. Then add these two schemas: 
>* [Video](https://i.imgur.com/puYIgMN.png "(target|_blank)")
>* [NextUser](https://i.imgur.com/tUfUtM1.png "(target|_blank)")

#### 2. Getting API Authorization:
>Create a permanent auth token, with these [Permissions](https://i.imgur.com/Wtja1Hj.png)
> 
>Need help? See [GraphCMS Pemanent Auth Token](https://graphcms.com/docs/api-reference/basics/permissions#permanent-auth-tokens-with-specific-models)

#### 3. Adding environment variables:
>Write a `.env.local` file with the following values:
>```
>API_URI="Your_GraphCMS_Endpoint"
>API_TOKEN="Your_GraphCMS_Permanent_Token"
>NEXTAUTH_SECRET="Your_App_Secret"
>NEXTAUTH_URL="http://localhost:3000 or your custom app endpoint"
>```
>Need help?
>* [GraphCMS Endpoint](https://graphcms.com/docs/api-reference/basics/authorization#api-endpoint)
>* [NextAuth Secret](https://next-auth.js.org/configuration/options#nextauth_secret)
>* [NextAuth Url](https://next-auth.js.org/configuration/options#nextauth_url)

### Running
Execute one of the commands bellow in order to run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
