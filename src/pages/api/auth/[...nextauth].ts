import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/pages/api/database/firebase'; // Import the specific items
import NextAuth from 'next-auth';
import Credentials, { CredentialInput, CredentialsConfig } from 'next-auth/providers/credentials';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials: Record<string, string> | undefined, req) => {
        if (!credentials) {
          throw new Error('No credentials provided');
        }
      
        const { email, password } = credentials;
      
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
      
          if (user) {
            return { id: user.uid, email: user.email };
          } else {
            throw new Error('Unable to sign in');
          }
        } catch (error) {
          console.error('Sign-in error:', error);
          throw new Error('Invalid credentials');
        }
      }
    })
  ],
  // ... other NextAuth options ...
};

export default NextAuth(authOptions);

/**
 * Function to create a Credentials provider for NextAuth.
 *
 * @param options - The options for the Credentials provider.
 * @returns - The created Credentials provider.
 */

function CredentialsProvider(options: Partial<Omit<CredentialsConfig<Record<string, CredentialInput>>, "options">> & Pick<CredentialsConfig<Record<string, CredentialInput>>, "credentials" | "authorize">) {
  return Credentials(options);
}
