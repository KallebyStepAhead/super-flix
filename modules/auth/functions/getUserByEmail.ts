import { gql, TypedDocumentNode } from '@apollo/client';
import client from '../../../shared/services/apollo';
import { User } from '../schemas/user';

type GetUserByEmailResult = {
  user: User | null
}

type GetUserByEmailData = {
  nextUser: GetUserByEmailResult['user']
}

type GetUserByEmailVars = {
  email: string
}

export const getUserByEmailQuery: TypedDocumentNode<GetUserByEmailData, GetUserByEmailVars> = gql`
  query GetUser($email: String!){
    nextUser(where: { email: $email}, stage: DRAFT) {
      id
      name
      password
    }
  }
`;

export async function getUserByEmail(email: string): Promise<GetUserByEmailResult> {
  const { data } = await client.query({
    variables: {
      email,
    },
    query: {
      ...getUserByEmailQuery,
    },
  });

  return {
    user: data.nextUser,
  };
}
