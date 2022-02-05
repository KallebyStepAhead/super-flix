import { gql, TypedDocumentNode } from '@apollo/client';
import { hash } from 'bcrypt';
import client from '../../../shared/services/apollo';
import { User } from '../schemas/user';

export type CreateUserResult = {
  user: Omit<User, 'password'> | null | undefined
}

export type CreateUserVars = {
  name: string
  email: string
  password: string
  avatarUrl?: string
}

export const createUserMutation: TypedDocumentNode<CreateUserResult, CreateUserVars> = gql`
mutation CreateUser($name: String!, $email: String!, $password: String!, $avatarUrl: String) {
  user: createNextUser(data: { name: $name, email: $email, password: $password, avatarUrl: $avatarUrl }) {
    id,
    name,
    email,
  }
}
`;

export async function createUser(values: CreateUserVars): Promise<CreateUserResult> {
  const passwordHash = await hash(values.password, 10);

  const { data } = await client.mutate({
    errorPolicy: 'all',
    variables: {
      name: values.name,
      email: values.email,
      password: passwordHash,
      avatarUrl: values.avatarUrl,
    },
    mutation: {
      ...createUserMutation,
    },
  });

  return {
    user: data?.user,
  };
}
