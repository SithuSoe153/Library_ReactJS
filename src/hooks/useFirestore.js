import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase';

export default function useFirestore() {

    let getCollection = (colName, _query) => {

        let queryRef = useRef(_query).current;
        let [error, setError] = useState('');
        let [data, setData] = useState([]);
        let [loading, setLoading] = useState(false);

        useEffect(function () {
            setLoading(true);
            let ref = collection(db, colName);

            let queries = [];

            if (queryRef) {
                queries.push(where(...queryRef));
            }
            queries.push(orderBy('date', 'desc'));
            let q = query(ref, ...queries);

            onSnapshot(q, docs => {
                if (docs.exists) {
                    setError("No documents found");
                    setLoading(false);
                }
                else {

                    let collentionData = [];

                    docs.forEach(doc => {
                        let document = { id: doc.id, ...doc.data() };
                        collentionData.push(document);
                    })
                    setData(collentionData);
                    setLoading(false);
                    setError('');
                }
            })

        }, [])

        return { error, data, loading }
    }

    let getDocument = (colName, id) => {

        let [error, setError] = useState('');
        let [data, setData] = useState(null);
        let [loading, setLoading] = useState(false);


        useEffect(() => {
            setLoading(true);
            let ref = doc(db, colName, id);
            onSnapshot(ref, doc => {
                if (doc.exists()) {
                    let document = { id: doc.id, ...doc.data() };
                    setData(document);
                    setLoading(false);
                    setError('');

                } else {
                    setError('No document found')
                    setLoading(false);
                }
            })
        }, [id])

        return { error, loading, data }
    }

    let addCollection = async (colName, dataToSubmit) => {
        const ref = collection(db, colName);
        return addDoc(ref, dataToSubmit).then(() => {
        });
    }

    let deleteDocument = async (colName, id) => {

        let ref = doc(db, colName, id);
        return deleteDoc(ref);
    }

    let updateDocument = async (colName, id, dataToSubmit) => {
        const ref = doc(db, colName, id);
        return updateDoc(ref, dataToSubmit).then(() => {
        });
    }

    return { getCollection, addCollection, deleteDocument, updateDocument, getDocument }
}
