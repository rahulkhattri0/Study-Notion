exports.passwordChecker = (password) => {
  const uppercaseRegex = /[A-Z]/;
  const digitRegex = /[0-9]/;
  const specialCharacterRegex = /[!@#$%^&*()_+-]/;

  const hasUppercase = password.match(uppercaseRegex);
  const hasDigit = password.match(digitRegex);
  const hasSpecialCharacter = password.match(specialCharacterRegex);

  const isLongEnough = password.length >= 8;

  return hasUppercase && hasDigit && hasSpecialCharacter && isLongEnough;
}