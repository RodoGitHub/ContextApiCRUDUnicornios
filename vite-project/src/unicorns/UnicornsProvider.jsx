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
    const [unicornId, setUnicornId] = useState([]);
    const [unicornEdit, setUnicornEdit] = useState({
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

    const handleUpdate = async (unicornId, unicorn) => {
        setLoading(true);
        try {
            const response = await updateObject(unicornId, unicorn);
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
            error, 
            loading,
            modeEdit, 
            
            unicorns, 
            unicornEdit,
            unicornId,
            
            handleCreate, 
            handleDelete, 
            handleUpdate, 
            
            setUnicornEdit,
            setUnicornId,
            setModeEdit,
            
        }}
        >
        {children}
        </UnicornContext.Provider>
    );
};

export default UnicornsProvider;

