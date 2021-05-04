import { useState } from 'react';

const useForm = <T extends Object>(formulario: T) => {

    const [form, setForm] = useState(formulario)
    const handleChange = (value: string, campo: keyof T) => {
        setForm({
            ...form,
            [campo]: value
        })
    }

    return {
        handleChange,
        ...form,
    }
}

export default useForm;