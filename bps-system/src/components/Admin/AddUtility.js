import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Card, Button } from 'react-bootstrap';


const ViewAllUtilities = () => {
    const [utilities, setUtilities] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUtilities = async () => {
            try {
                const utilitiesSnapshot = await getDocs(collection(db, 'utilities'));
                const utilitiesList = utilitiesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUtilities(utilitiesList);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUtilities();
    }, []);

    const deleteUtility = async (utilityId) => {
        try {
            await deleteDoc(doc(db, 'utilities', utilityId));
            setUtilities(utilities.filter(utility => utility.id !== utilityId));
            setError('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2 className="text-center my-4">All Utilities</h2>
            {error && <p className="text-danger">{error}</p>}
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {utilities.map(utility => (
                    <div key={utility.id} className="col">
                        <Card>
                            <Card.Img style={{ height: '200px' }} variant="top" src={utility.imageUrl} alt={utility.name} />
                            <Card.Body>
                                <Card.Title>{utility.name}</Card.Title>
                                <Button variant="danger" onClick={() => deleteUtility(utility.id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewAllUtilities;
