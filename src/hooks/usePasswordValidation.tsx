import {useMemo} from 'react';

type ValidationCriteria = {
    length?: { min: number; max?: number };
    specialChar?: boolean;
    upperLowerCase?: boolean;
    number?: boolean;
};

const defaultCriteria: ValidationCriteria = {
    length: {min: 8, max: 70},
    specialChar: true,
    upperLowerCase: true,
    number: true,
};

export const usePasswordValidator = (password: string, criteria: ValidationCriteria = defaultCriteria) => {

    //Unimos los criterios por defecto con los criterios que se pasen como argumento
    //Si no se pasan criterios, se usan los criterios por defecto
    //Se le pone su propio hook para que no se vuelva a ejecutar cada vez que se renderice el componente
    const mergedCriteria = useMemo(() => ({ ...defaultCriteria, ...criteria }), [criteria]);

    return useMemo(() => {

        return {
            length: mergedCriteria.length
                ? password.length >= mergedCriteria.length.min && (mergedCriteria.length.max ? password.length <= mergedCriteria.length.max : true)
                : true,
            specialChar: mergedCriteria.specialChar
                ? /[!@#$%^&*(),.?":{}|<>]/.test(password) : true,
            upperLowerCase: mergedCriteria.upperLowerCase
                ? /(?=.*[a-z])(?=.*[A-Z])/.test(password) : true,
            number: mergedCriteria.number
                ? /[0-9]/.test(password) : true,
        };
    }, [password, mergedCriteria]);
};
