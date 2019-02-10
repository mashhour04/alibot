
import React from 'react';

export const FormErrors = ({ formErrors, target }) =>

    <div className='formErrors'>
        {  
            Object.keys(formErrors[target]).map((fieldName, i) => {
                console.log('target', target);
            if (formErrors[fieldName].length > 0) {
                return (
                    <p key={i}>{fieldName} {formErrors[fieldName]}</p>
                )
            } else {
                return '';
            }
        })}
    </div>