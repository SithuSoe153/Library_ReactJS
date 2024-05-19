import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react'
import { auth } from '../firebase';

export default function useSignIn() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signIn = async (email, password) => {
        setError(null);
        setLoading(true);

        try {
            let res = await signInWithEmailAndPassword(auth, email, password);
            setError(null);
            setLoading(false);
            return res.user;
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }

    }

    return { error, loading, signIn }
}
