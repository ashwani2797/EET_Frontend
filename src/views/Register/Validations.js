
import { ERROR_MESSAGES } from './Enums';


//  Contains validation functions, which may validate an individual fiend, or a group of fields
//  The functions return true if validated positively, else an array of errors (in case of single field validations)
//  or an object with key as field, and array of errors as value


let isEmail = (email) => {
    var reValidEmail = new RegExp(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/);

    return reValidEmail.test(email);
};

let trim = (string) => {
    return string.trim()
};

let isLength = (String, validations) => {
    return true;
}


class Validation {

    /**
     * Validates zipcode is of valid length or NaN
     * @param zipCodeParam <Takes string as parameter>
     * @returns {{isValid: boolean, errMsg: Array}}
     * <Returns if the validation status is true: false and the error messages>
     */
    static validateStateonBlur(stateParam) {
        const state = stateParam;
        const validationObj = {
            isValid: false,
            errMsg: [],
        };
        if (state === '') {
            validationObj.errMsg.push(ERROR_MESSAGES.STATE_MANDATORY);
            return validationObj;
        }
        validationObj.isValid = true;
        validationObj.errMsg.length = 0;
        return validationObj;
    }
    /* Biometric Physician Validations */
    static validateSubject(subParam) {
        const subject = subParam;
        const validationObj = {
            isValid: false,
            errMsg: [],
        };
        if (!isLength(subject, { min: 5, max: 250 })) {
            validationObj.errMsg.push(ERROR_MESSAGES.SUBJECT_INVALID);
            return validationObj;
        }
        validationObj.isValid = true;
        validationObj.errMsg.length = 0;
        return validationObj;
    }
    static validateFeedback(feedbackParam) {
        const feedback = feedbackParam;
        const validationObj = {
            isValid: false,
            errMsg: [],
        };
        if (!isLength(feedback, { min: 5, max: 250 })) {
            validationObj.errMsg.push(ERROR_MESSAGES.FEEDBACK_INVALID);
            return validationObj;
        }
        validationObj.isValid = true;
        validationObj.errMsg.length = 0;
        return validationObj;
    }
    static validateNone(value) {
        const data = value;
        const validationObj = {
            isValid: false,
            errMsg: [],
        };
        if (!data.length > 0) {
            validationObj.errMsg.push(ERROR_MESSAGES.NONE);
            return validationObj;
        }
        validationObj.isValid = true;
        validationObj.errMsg.length = 0;

        return validationObj;
    }
    static validateDate(value) {
        const date = value;
        const validationObj = {
            isValid: false,
            errMsg: [],
        };
        if (!date.length > 0) {
            validationObj.errMsg.push(ERROR_MESSAGES.DATE_INVALID);
            return validationObj;
        }
        validationObj.isValid = true;
        validationObj.errMsg.length = 0;

        return validationObj;
    }
    static validateFirstName(nameParam) {
        const name = trim(nameParam);
        const validationObj = {
            isValid: false,
            errMsg: [],
        };
        const nameValid = /^[A-Za-z\s]+$/;
        if (!isLength(name, { min: 2 })) {
            validationObj.errMsg.push(ERROR_MESSAGES.FIRST_NAME_INVALID);
            return validationObj;
        }
        if (!name.match(nameValid)) {
            validationObj.errMsg.push(ERROR_MESSAGES.FIRST_NAME_INVALID);
            return validationObj;
        }
        if (name.length === 0) {
            validationObj.errMsg.push(ERROR_MESSAGES.NAME_MANDATORY);
            return validationObj;
        }

        validationObj.isValid = true;
        validationObj.errMsg.length = 0;

        return validationObj;
    }

    static validateLastName(nameParam) {
        const name = trim(nameParam);
        const validationObj = {
            isValid: false,
            errMsg: [],
        };
        const nameValid = /^[A-Za-z\s]+$/;
        if (!isLength(name, { min: 2 })) {
            validationObj.errMsg.push(ERROR_MESSAGES.LAST_NAME_INVALID);
            return validationObj;
        }
        if (!name.match(nameValid)) {
            validationObj.errMsg.push(ERROR_MESSAGES.LAST_NAME_INVALID);
            return validationObj;
        }
        if (name.length === 0) {
            validationObj.errMsg.push(ERROR_MESSAGES.NAME_MANDATORY);
            return validationObj;
        }

        validationObj.isValid = true;
        validationObj.errMsg.length = 0;

        return validationObj;
    }





    static validateString(string, fieldName, options) {
        const validationObj = {
            isValid: false,
            errMsg: [],
        };
        if (string.trim() === '' && options.mandatory) {
            validationObj.errMsg.push(ERROR_MESSAGES.STRING[fieldName].mandatory);
            return validationObj;
        }
        validationObj.isValid = true;
        validationObj.errMsg.length = 0;

        return validationObj;
    }


    static validateDob(dateObject, fieldName) {
        const validationObj = {
            isValid: false,
            errMsg: [],
        };
        // eslint-disable-next-line no-underscore-dangle
        if (!dateObject || !dateObject._isValid) {
            validationObj.errMsg.push(ERROR_MESSAGES.DOB[fieldName].invalid);
            return validationObj;
        }
        validationObj.isValid = true;
        validationObj.errMsg.length = 0;

        return validationObj;
    }



    /**
     * Validates if email is empty or invalid
     * @param emailParam <Takes string as parameter>
     * @returns {{isValid: boolean, errMsg: Array}}
     *<Returns if the validation status is true: false and the error messages>
     */
    static validateEmail(emailParam) {
        const email = trim(emailParam);
        const validationObj = {
            isValid: false,
            errMsg: [],
        };

        /* If email field is empty */
        if (!isLength(email, { min: 1 })) {
            validationObj.errMsg.push(ERROR_MESSAGES.EMAIL_MANDATORY);
            return validationObj;
        }

        /* If email provided is invalid */
        if (!isEmail(email)) {
            validationObj.errMsg.push(ERROR_MESSAGES.EMAIL_INVALID);
            return validationObj;
        }

        validationObj.isValid = true;
        validationObj.errMsg.length = 0;

        return validationObj;
    }

    /**
     * Validates if email and confirm email fields are the same
     * @param emailParam <Primary email provided>
     * @param confirmEmailParam <Email to be confirmed with>
     * @returns {{isValid: boolean, errMsg: Array}}
     */
    static validateAndConfirmEmail(emailParam, confirmEmailParam) {
        const email = trim(emailParam);
        const confirmEmail = trim(confirmEmailParam);
        const validationObj = Validation.validateEmail(email);

        if (validationObj.isValid) {
            if (email === confirmEmail) {
                return validationObj;
            }
            validationObj.isValid = false;
            validationObj.errMsg.push(ERROR_MESSAGES.EMAIL_MISMATCH);
        }
        return validationObj;
    }

    /**
     * Validates a phone number field
     * @param phoneParam
     * @returns {{isValid: boolean, errMsg: Array}}
     */
    static validatePhone(mobileParam) {
        const mobileNumber = trim(mobileParam);
        const validationObj = {
            isValid: false,
            errMsg: [],
        };
        const mobileValidation = /^[1-9]{1}[0-9]{9}$/;
        /* If phone field is empty */
        if (!isLength(mobileNumber, { min: 1 })) {
            validationObj.errMsg.push(ERROR_MESSAGES.PHONE_MANDATORY);
            return validationObj;
        }
        /* If phone no provided is invalid */
        if (!mobileNumber.match(mobileValidation)) {
            validationObj.errMsg.push(ERROR_MESSAGES.PHONE_INVALID);
            return validationObj;
        }
        validationObj.isValid = true;
        validationObj.errMsg.length = 0;

        return validationObj;
    }

    static validateUsn(usnParam) {
        const usnid = trim(usnParam)
        const validationObj = {
            isValid: false,
            errMsg: [],
        };
        if (!isLength(usnid, { min: 1 })) {
            validationObj.errMsg.push(ERROR_MESSAGES.USN_MANDATORY);
            return validationObj;
        }
        validationObj.isValid = true;
        validationObj.errMsg.length = 0;
        return validationObj;
    }



    /**
     * Validates password on preset conditions.
     * Conditions:
     * 1. Should contain an uppercase alphabet
     * 2. Should contain a number
     * 3. Should contain a special character
     * 4. Should be of length 8 characters
     * @param passwordParam
     * @returns {{isValid: boolean, errMsg: Array}}
     */
    static validatePassword(passwordParam) {
        const password = trim(passwordParam);
        const validationObj = {
            isValid: false,
            errMsg: [],
        };
        // const passValidation = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;

        const capitalLetter = /([A-Z])/g;
        const smallLetter = /([a-z])/g;
        const number = /([0-9])/g;
        const specialCharacter = /([~_+-.,!@#$%^&*();|<>"'/])/g;

        // Checks if the password field is empty
        if (!isLength(password, { min: 1 })) {
            validationObj.errMsg.push(ERROR_MESSAGES.PASSWORD_MANDATORY);
        }

        if (!isLength(password, { min: 8 })) {
            validationObj.errMsg.push(ERROR_MESSAGES.PASSWORD_MIN_LENGTH);
        }

        if (!password.match(capitalLetter)) {
            validationObj.errMsg.push(ERROR_MESSAGES.PASSWORD_UPPERCASE);
        }

        if (!password.match(smallLetter)) {
            validationObj.errMsg.push(ERROR_MESSAGES.PASSWORD_LOWERCASE);
        }

        if (!password.match(number)) {
            validationObj.errMsg.push(ERROR_MESSAGES.PASSWORD_NUMBER);
        }

        if (!password.match(specialCharacter)) {
            validationObj.errMsg.push(ERROR_MESSAGES.PASSWORD_SPECIAL_CHARACTERS);
        }

        if (validationObj.errMsg.length > 0) {
            return validationObj;
        }

        validationObj.isValid = true;
        validationObj.errMsg.length = 0;
        return validationObj;
    }


    // if (!password.match(passValidation)) {
    //   validationObj.errMsg.push(ERROR_MESSAGES.PASSWORD_SPECIAL_CHARACHTERS);
    //   validationObj.errMsg.push(ERROR_MESSAGES.PASSWORD_NUMBER);
    //   validationObj.errMsg.push(ERROR_MESSAGES.PASSWORD_LOWERCASE);
    //   validationObj.errMsg.push(ERROR_MESSAGES.PASSWORD_UPPERCASE);
    //   return validationObj;
    // }

    // validationObj.isValid = true;
    // validationObj.errMsg.length = 0;

    /**
     * Validate confirm password against passed password
     * @param passwordParam
     * @param confirmPasswordParam
     * @returns {{isValid: boolean, errMsg: Array}}
     */
    static validateConfirmPassword(passwordParam, confirmPasswordParam) {
        const password = trim(passwordParam);
        const confirmPassword = trim(confirmPasswordParam);
        const validationObj = { isValid: false, errMsg: [] };

        if (password === confirmPassword) {
            validationObj.isValid = true;
            validationObj.errMsg.length = 0;

            return validationObj;
        }

        validationObj.isValid = false;
        validationObj.errMsg.push(ERROR_MESSAGES.PASSWORD_MISMATCH);

        return validationObj;
    }




    /**
     * Validates the name field in a form
     * @param nameParam Takes input as Firstname/Lastname
     * @returns {{isValid: boolean, errMsg: Array}}
     */
    static validateName(nameParam) {
        const name = trim(nameParam);
        const validationObj = { isValid: false, errMsg: [] };
        if (!isLength(name, { min: 1 })) {
            validationObj.errMsg.push(ERROR_MESSAGES.NAME_MANDATORY);
            return validationObj;
        }

        validationObj.isValid = true;
        validationObj.errMsg.length = 0;

        return validationObj;
    }

    static validatePassword2(passwords) {
        const validationObj = { isValid: false, errMsg: [] };
        if (passwords.password1 !== passwords.password2) {
            validationObj.errMsg.push
                (ERROR_MESSAGES.PASSWORD_MISMATCH);
            return validationObj;
        }

        validationObj.isValid = true;
        validationObj.errMsg.length = 0;
        return validationObj;
    }

    static validate(value, fieldName, options) {
        switch (fieldName) {
            case '':
                return this.validateNone(value, fieldName, options);
            case 'FirstName':
                return this.validateFirstName(value, fieldName, options);
            case 'SecondName':
                return this.validateLastName(value, fieldName, options);
            case 'USN':
                return this.validateUsn(value, fieldName, options);
            case 'DOB':
                return this.validateDate(value);
            case 'Email':
                return this.validateEmail(value, fieldName, options);
            case 'Phone':
                return this.validatePhone(value, fieldName, options);
            case 'Password1':
                return this.validatePassword(value, fieldName);
            case 'Password2':
                return this.validatePassword2(value, fieldName);
            default:
                return { isValid: true, errMsg: [''] };
        }
    }
}

export default Validation;