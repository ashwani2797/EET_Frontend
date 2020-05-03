const ERROR_MESSAGES = {
    POSTAL_ADDRESS_REQUIRED: 'You must provide a valid Postal address',
    EMAIL_REQUIRED: 'You must provide a valid Email Address',
    PHONE_REQUIRED: 'You must provide a valid phone Number',
    SUBJECT_INVALID: 'Invalid Subject',
    FEEDBACK_INVALID: 'Invalid Feedback',
    EMAIL_MANDATORY: 'You must enter an Email Address.',
    EMAIL_INVALID: 'The email ID you entered is invalid. Please try again.',
    EMAIL_MISMATCH: 'The email IDs you entered don\'t match. Please try again.',
    FIELD_MANDATORY: 'This is a mandatory field.',
    PASSWORD_WEAK: 'Please provide a stronger password. Passwords must be 8 characters or longer and ' +
    'contain at least one number, one lowercase letter, one uppercase letter, ' +
    'and one special character (such as $, %, or &).',
    PASSWORD_INCORRECT: 'The password you entered is incorrect. Please try again.',
    PASSWORD_MANDATORY: 'Password must be 8 characters or longer.',
    PASSWORD_SPECIAL_CHARACTERS: 'Password must contain at least one special character (such as $, %, or &).',
    PASSWORD_NUMBER: 'Password must contain at least one number.',
    PASSWORD_LOWERCASE: 'Password must contain at least one lowercase letter.',
    PASSWORD_UPPERCASE: 'Password must contain at least one uppercase letter.',
    PHONE_INVALID: 'The phone number you entered is invalid. Please enter your 10-digit phone number without spaces or hyphens.',
    PHONE_MANDATORY: 'You must enter a phone number.',
    PHONE_MISMATCH: 'The phone numbers you entered don\'t match. Please try again.',
    ZIPCODE_IS_NOT_NUMBER: 'ZIP code must be 5 digits.',
    ZIPCODE_MANDATORY: 'ZIP code cannot be blank.',
    ZIPCODE_INVALID: 'ZIP code is invalid. Please try again.',
    INVALID_CREDENTIALS: 'The username or password you entered is invalid. Please try again.',
    ADDRESS_MANDATORY: 'You must enter an address.',
    ADDRESS_INVALID: 'Address must be 7 characters or longer.',
    CITY_MANDATORY: 'You must enter a city.',
    CITY_INVALID: 'City must be 3 characters or longer.',
    STATE_MANDATORY: 'You must enter a state.',
    NETWORK_FAIL: 'We could not store your preferences. Please try again later.',
    FEATURE_NOT_CONFIGURED: 'This feature is not configured for you currently.',
    COMING_SOON: 'This feature is coming soon.',
    NONE: '',
    DATE_INVALID: 'Date is invalid',
    FIRST_NAME_INVALID: 'First Name is invalid',
    LAST_NAME_INVALID: 'Last Name is invalid',
    CLIENT_NAME_INVALID: 'Client Name is invalid',
    INITIALS_INVALID: 'Please enter your correct initals',
    PASSWORD_MIN_LENGTH: 'Minimum length of password should be 8 characters',
    PASSWORD_MISMATCH: 'Passwords do not match',
    ADDRESS_FIELDS_INVALID: 'Address is not valid',
    CONTENT_NOT_FOUND: 'We could not find the details you are looking for. Please try again after sometime.',
    NAME_MANDATORY: 'Name must not be empty',
    USN_MANDATORY: 'USN must not be empty',
    NAME_NUMERIC: 'Name cannot contain numbers',
    INITIALS_MANDATORY: 'Initials are mandatory',
    STRING: {
      firstName: {
        mandatory: 'First Name is a mandatory field.',
      },
      lastName: {
        mandatory: 'Last Name is a mandatory field.',
      },
    },
    SSN: {
      ssn: {
        mandatory: 'SSN is a mandatory field.',
        numeric: 'Please enter only numeric values in SSN.',
        length: 'Please enter only last four digits of SSN.',
      },
    },
    DOB: {
      dob: {
        mandatory: 'Date of Birth is a mandatory field.',
        invalid: 'Date of Birth Needs to be between 1900 and Current Date',
      },
    },
    SUBSCRIBER: {
      subscriber: {
        mandatory: 'Subscriber is a mandatory field.',
      },
    },
    PREFERENCE: {
      preference: {
        mandatory: 'Preference is a mandatory field.',
      },
    },
    TNC: {
      tnc: {
        mandatory: 'Accepting Terms is mandatory.',
      },
    },
    SUBSCRIPTIONS: {
      subscriptions: {
        mandatory: 'Time is a mandatory field.',
      },
    },
    MEMBER_ID_INVALID: 'The Employee ID you have entered is not present in our database. Please try again.',
    PAYER_ID_MANDATORY: 'Payer Id is mandatory',
    PAYER_ID_NUMERIC: 'Payer Id should be numeric',
    MEMBER_ID_MANDATORY: 'Employee ID# is mandatory',
    MEMBER_ID_ALPHA_NUMERIC: 'Member Id cannot have special characters',
    GROUP_NUMBER_MANDATORY: 'Group Number is mandatory',
    GROUP_NUMBER_NUMERIC: 'Group Number should numeric',
    SAVE_DATA_FAIL: 'Failed to save your data.',
  };

  export { ERROR_MESSAGES };