import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebase';

export default function useSignup() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signup = async (email, password) => {
        setError(null);
        setLoading(true);

        try {
            let res = await createUserWithEmailAndPassword(auth, email, password);
            setError(null);
            setLoading(false);
            return res.user;
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);

    }

    return { error, loading, signup }
}
