import React,{useState,useEffect} from 'react';
import {db} from '/firestore';

BillManagement = () =>{
    const [bills,setBills] = useState([]);
    const [newBillName,setNewBillName] = useState('');
    const [newBillAmount,setnewBillAmount] = useState('');

    useEffect(()=>{
        const unsubscribe = db.collection('bills').onSnapshot(snapshot =>{
            const billsData = snapshot.docs.map(doc =>({id:doc.id,...doc.data()}));
            setBills(billsData);
        })

        return ()=> unsubscribe();
    },[]);

    const handleAddBill = async ()=>{
        try{
            await db.collection('bills').add({
                name:
            })
        }
    }
}
