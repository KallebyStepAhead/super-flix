import { ApolloError } from '@apollo/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createUser, CreateUserResult, CreateUserVars } from '../../../modules/auth/functions/createUser';
import { NetworkGenericErrorResponse } from '../../../shared/services/apollo';

type SignUpRequest = {
  data: CreateUserVars | undefined
}

type ErrorResponse = {
  message: string
}

export type SignUpErrorResponse = ErrorResponse | ErrorResponse[]

export type SignUpResponse = CreateUserResult | SignUpErrorResponse

export default async (req: NextApiRequest, res: NextApiResponse<SignUpResponse>) => {
  const { data } = req.body as SignUpRequest;

  if (!data) {
    return res.status(400).json({ message: 'Invalid values' });
  }

  if (data.password.length < 3 || data.password.length > 50) {
    return res.status(400).json({ message: 'Password should be between 3 and 50 characters.' });
  }

  return createUser({
    name: data.name,
    email: data.email,
    password: data.password,
    avatarUrl: data.avatarUrl,
  })
    .then(({ user }) => res.status(200).json({ user }))
    .catch((error: ApolloError) => {
      const { result } = error.networkError as unknown as NetworkGenericErrorResponse;

      return res.status(400).json(result.errors);
    });
};
