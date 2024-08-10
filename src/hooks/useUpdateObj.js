
export const useUpdateObj = (setObject) => {

    const updateObj = (path, value) => {
        setObject( prevObj => {
            const keys = path.split(".")
            const newFormData = {...prevObj}
            let current = newFormData
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (i === keys.length -1) {
                    current[key]= value
                } else 
                if (!current[key]) {
                    current[key] = {}
                }
                current = current[key]
            }
            return newFormData
        })
    }

    return [updateObj]
}