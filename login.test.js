const login = require('./login');
describe('login', () => {
  let emailInput, passwordInput;
  beforeEach(() => {
    // Mock input fields
    emailInput = { value: 'test@example.com' };
    passwordInput = { value: 'password123' };
    document.getElementById = jest.fn((id) => {
      if (id === 'email') return emailInput;
      if (id === 'password') return passwordInput;
    });
    // Mock localStorage
    global.localStorage = {
      setItem: jest.fn(),
    };
    // Mock window.location
    delete window.location;
    window.location = { href: '' };
    // Mock alert
    global.alert = jest.fn();
  });
  it('should store token and redirect on success', async () => {
    const fakeResponse = {
      ok: true,
      json: async () => ({ token: 'abc123' }),
    };
    global.fetch = jest.fn(() => Promise.resolve(fakeResponse));
    await login({ preventDefault: () => {} });
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'abc123');
    expect(window.location.href).toBe('index.html');
  });
  it('should alert message on failure', async () => {
    const fakeResponse = {
      ok: false,
      json: async () => ({ message: 'Invalid credentials' }),
    };
    global.fetch = jest.fn(() => Promise.resolve(fakeResponse));
    await login({ preventDefault: () => {} });
    expect(alert).toHaveBeenCalledWith('Invalid credentials');
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});