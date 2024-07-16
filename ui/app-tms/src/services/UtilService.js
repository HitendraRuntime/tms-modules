export const validateForm = (formInput) => {
    const newErrors = {};
    Object.keys(formInput).forEach((key) => {
        if (!formInput[key]) {
            newErrors[key] = `${key} is required`;
        }
    });

    // Email validation
    if (formInput.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formInput.email)) {
        newErrors.email = 'invalid email address';
    }
    return newErrors;
};