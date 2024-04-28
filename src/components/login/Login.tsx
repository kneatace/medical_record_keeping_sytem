import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    const result = await signIn('Credentials', { redirect: true }); // Modify this line
    //console.log('Sign-in result:', result);
    if (result && !result.error) {
      router.push('/dashboard');
    } else if (result && result.error) {
      console.error('Sign-in error:', result.error); // Add this line
      alert("signIn Error");
    }
    setLoading(false);
  };
  if (session) {
    return (
      <>
        <Button variant={'contained'} color={'error'} onClick={() => signOut()}>Sign out</Button>
      </>
    )
  }
  return (
    <>
      {error && <p>{error}</p>}
      <Button variant={'contained'} color={'success'} onClick={handleSignIn} disabled={loading} aria-label="Sign in">
        {loading ? <CircularProgress size={24} /> : 'Sign in'}
      </Button>
    </>
  );
}

export default Login;