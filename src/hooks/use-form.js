import { useState } from 'react';

export default function useForm(submitCallback, changeCallback = () => { }, initialState = {}) {
    const [values, setValues] = useState(initialState);

    function handleSubmit(e) {
        if (e) {
            e.preventDefault();
        }

        submitCallback(
            Object.keys(values)
                .reduce((acc, key) => ({ ...acc, [key]: values[key].trim() }), {})
        );
    }

    function handleChange(e) {
        e.persist();

        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));

        changeCallback(e);
    }

    function isValid() {
        const keys = Object.keys(values);
        if (keys.length === 0) {
            return false;
        }

        return keys.reduce((acc, key) => acc && values[key].trim() !== '', true);
    }

    return [handleSubmit, handleChange, isValid, values];
}