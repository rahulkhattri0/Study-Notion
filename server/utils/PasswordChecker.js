exports.passwordChecker = (password) => {
    // The password must be at least 8 characters long.
    if (password.length < 8) {
      return false;
    }
  
    // The password must contain at least one uppercase letter.
    if (!/[A-Z]/.test(password)) {
      return false;
    }
  
    // The password must contain at least one lowercase letter.
    if (!/[a-z]/.test(password)) {
      return false;
    }
  
    // The password must contain at least one numeric digit.
    if (!/[0-9]/.test(password)) {
      return false;
    }
  
    // The password must not contain any spaces.
    if (/ /.test(password)) {
      return false;
    }
    return true;
}