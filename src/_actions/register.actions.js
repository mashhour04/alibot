import { registerConstants } from '../_constants/register.constants';

export const registerActions = {
    change,
    error
};

function change(field, value) {
    const constant = `${field.toUpperCase()}_FIELD_CHANGE`;
    return { type: registerConstants[constant], [field]: value };
}

function error(field, value) {
    const constant = `${field.toUpperCase()}_FIELD_ERROR`;
    const key = `${field}Errors`
    return { type: registerConstants[constant], [key]: value };
}

