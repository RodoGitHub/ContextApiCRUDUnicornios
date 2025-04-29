import { useEffect, useState } from "react";
import { UnicornContext } from "../context/GlobalContext";
import {
    createObject,
    updateObject,
    deleteObject,
    getObjects,
} from "../services/api";

const UnicornsProvider = ({ children }) => {
    const [unicorns, setUnicorns] = useState([]);
    const [unicornEdit, setUnicornEdit] = useState({
        _id: null,
        name: '',
        age: null,
        colour: '',
        power: '',
      });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modeEdit, setModeEdit] = useState(false); 
       
    const fetchUnicorns = async () => {
        setLoading(true);
        try {
          const data = await getObjects();
          setUnicorns(data); 
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
        fetchUnicorns();
    }, []);

    const handleCreate = async (unicorn) => {
        setLoading(true);
        try {
            const response = await createObject(unicorn);
            await fetchUnicorns();
            if (!response.ok) {
                throw new Error("Error al crear el unicornio");
            }
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const unicornId = (id) => {
        const unicorn = unicorns.find(u => parseInt(u.id) === parseInt(id));
        if (unicorn) {
          setUnicornEdit(unicorn);
          setModeEdit(true);
        }
    };

    const handleUpdate = async (unicornId, unicorn) => {
        const { _id, ...outId } = unicorn;
        setLoading(true);
        try {
            const response = await updateObject(unicornId, outId);
            setModeEdit(false)
            await fetchUnicorns();
            if (!response.ok) {
                throw new Error("Error al actualizar el unicornio");
            }
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    
    const handleDelete = async (unicornId) => {
        setLoading(true);
        try {
            const response = await deleteObject(unicornId);
            await fetchUnicorns();
            if (!response.ok) {
                throw new Error("Error al eliminar el unicornio");
            }
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <UnicornContext.Provider 
        value={{ 
            unicorns, 
            unicornEdit,
            loading,
            modeEdit, 
            error, 
            handleCreate, 
            handleDelete, 
            handleUpdate, 
            setUnicornEdit,
            setModeEdit,
            unicornId
            
        }}
        >
        {children}
        </UnicornContext.Provider>
    );
};

export default UnicornsProvider;

