import NextAuth from 'next-auth';
import { compare } from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByEmail } from '../../../modules/auth/functions/getUserByEmail';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signIn',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: {
          type: 'email',
        },
        password: {
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Wrong credentials or User not exists. Try again.');
        }

        const { user } = await getUserByEmail(credentials.email);

        if (!user) {
          throw new Error('Wrong credentials or User not exists. Try again.');
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Wrong credentials or User not exists. Try again.');
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl,
        };
      },
    }),
  ],
});
