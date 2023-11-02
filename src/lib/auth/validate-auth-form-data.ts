export function validateAuthFormData(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  const isUsernameValid = typeof username === 'string' && username.length > 0;
  const isPasswordValid = typeof password === 'string' && password.length >= 6;

  if (!isUsernameValid) {
    return { data: null, error: 'Invalid username' };
  }

  if (!isPasswordValid) {
    return { data: null, error: 'Invalid password' };
  }

  return { data: { username, password }, error: null };
}
