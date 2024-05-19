import { signOut } from 'firebase/auth';
import { useState } from 'react'
import { auth } from '../firebase';

export default function useSignOut() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        setError(null);
        setLoading(true);

        try {
            let res = await signOut(auth);
            setError(null);
            setLoading(false);
            return res.user;
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);

    }

    return { error, loading, logout }
}
