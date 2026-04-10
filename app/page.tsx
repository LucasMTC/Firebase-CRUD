'use client'
import { useEffect, useState } from 'react'
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase/firebase.config';

export default function Home() {
    const [nombre, setNombre] = useState('');
    const [matricula, setMatricula] = useState('');
    const [carrera, setCarrera] = useState('');
    const [items, setItems] = useState<any>([]);

    useEffect(() => {
        fetchItems()
    }, [])

    const handleAdd = async () => {
        await addDoc(collection(db, 'estudiantes'), { nombre, matricula, carrera })
        setNombre('');
        setMatricula('');
        setCarrera('');
        fetchItems();
    }

    const handleDelete = async (id:string) => {
        if (!id) return;
        await deleteDoc(doc(db, 'estudiantes', id));
        fetchItems();
    }

    const handleEdit = async (id:string) => {
        const newNombre = prompt("Enter new nombre");
        const newMatricula = prompt("Enter new matricula");
        const newCarrera = prompt("Enter new carrera");

        if (!newNombre || !newMatricula || !newCarrera) return;

        await updateDoc(doc(db, 'estudiantes', id), {
            nombre: newNombre,
            matricula: newMatricula,
            carrera: newCarrera
        })

        fetchItems();
    }

    const fetchItems = async () => {
        const snapshot = await getDocs(collection(db, 'estudiantes'))
        setItems(snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })))
    }

    return (
        <div className="font-sans flex flex-col items-center min-h-screen p-8 gap-4">
            <h1>NextJS Firebase</h1>

            <input
                type="text"
                className="border-2"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <input
                type="text"
                className="border-2"
                placeholder="Matricula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
            />

            <input
                type="text"
                className="border-2"
                placeholder="Carrera"
                value={carrera}
                onChange={(e) => setCarrera(e.target.value)}
            />

            <button className="border p-2" onClick={handleAdd}>Agregar</button>

            <ul>
                {items.map((item:any) => (
                    <li key={item.id}>
                        {item.nombre} - {item.matricula} - {item.carrera}

                        <button
                            className="p-2 border bg-yellow-500 text-white cursor-pointer"
                            onClick={() => { handleEdit(item.id) }}>
                            Edit
                        </button>

                        <button
                            className="p-2 border bg-red-500 text-white cursor-pointer"
                            onClick={() => { handleDelete(item.id) }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}