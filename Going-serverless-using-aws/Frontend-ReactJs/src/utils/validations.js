import { REGEX } from "../constants";

export const validateEmail = email => {
  return REGEX.EMAIL.test(email);
};

export const passwordValidation = password => {
  return REGEX.PASSWORD.test(password);
};

export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword && confirmPassword.length > 0;
};

export const validateContact = contact => {
  return REGEX.CONTACT.test(contact);
};

export const validateName = name => {
  return REGEX.NAME.test(name);
};

export const validateFax = fax => {
  return REGEX.FAX.test(fax);
};

export const validateUserName = name => {
  return REGEX.USERNAME.test(name);
};

export const validateBlankSpace = name => {
  return REGEX.NOT_BLANK_SPACE.test(name);
};

export const validateAddress = address => {
  let onlyNoValid = REGEX.ONLY_NO.test(address);
  let blankSpacceValid = REGEX.NOT_BLANK_SPACE.test(address);
  // let onlyCharValid = REGEX.ONLY_CHAR.test(address);
  const result = onlyNoValid && blankSpacceValid;
  return result;
};
export const validateCode = code => {
  return REGEX.USERNAME.test(code);
};
