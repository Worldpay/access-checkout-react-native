/**
 * Utils Class that helps set the colour of Borders and text to match the validation
 * @param isValid whether the field has any validation errors
 * @param isEditable whether the field can be edited
 */
export const getValidationColour = (
  isValid: undefined | boolean,
  isEditable: boolean,
) => {
  // input is disabled
  if (!isEditable) {
    return 'grey';
  }

  switch (isValid) {
    // input has failed validation
    case false: {
      return 'red';
    }
    // input has passed validation
    case true: {
      return 'green';
    }
    // input initial state
    case undefined: {
      return 'grey';
    }
  }
};
