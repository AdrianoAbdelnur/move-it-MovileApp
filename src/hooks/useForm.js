import { useState } from 'react'

export const useForm = () => {
    const [formState, setFormState] = useState();

    const getInput = (field, value) => {
        setFormState({ ...formState, [field]: value});
}

  return {
    formState,
    getInput
    }
}