const signup = require('./signup');
describe('signup', () => {
  let emailInput, passwordInput;
  beforeEach(() => {
    // Mock inputs
    emailInput = { value: 'test@example.com' };
    passwordInput = { value: 'mypassword' };
    document.getElementById = jest.fn((id) => {
      if (id === 'email') return emailInput;
      if (id === 'password') return passwordInput;
    });
    // Mock alert
    global.alert = jest.fn();
    // Mock window.location
    delete window.location;
    window.location = { href: '' };
  });
  it('should alert message and redirect on successful signup', async () => {
    const fakeResponse = {
      ok: true,
      json: async () => ({ message: 'Signup successful!' }),
    };
    global.fetch = jest.fn(() => Promise.resolve(fakeResponse));
    await signup({ preventDefault: () => {} });
    expect(alert).toHaveBeenCalledWith('Signup successful!');
    expect(window.location.href).toBe('login.html');
  });
  it('should alert message and not redirect on failure', async () => {
    const fakeResponse = {
      ok: false,
      json: async () => ({ message: 'Signup failed' }),
    };
    global.fetch = jest.fn(() => Promise.resolve(fakeResponse));
    await signup({ preventDefault: () => {} });
    expect(alert).toHaveBeenCalledWith('Signup failed');
    expect(window.location.href).not.toBe('login.html');
  });
});


