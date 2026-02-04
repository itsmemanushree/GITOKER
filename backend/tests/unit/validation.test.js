// Unit tests for validation logic (no database needed)

describe('Validation Unit Tests', () => {

  test('should validate email format', () => {
    const validEmail = 'test@example.com';
    const invalidEmail = 'notanemail';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    expect(emailRegex.test(validEmail)).toBe(true);
    expect(emailRegex.test(invalidEmail)).toBe(false);
  });

  test('should validate product price is positive', () => {
    const validPrice = 1000;
    const invalidPrice = -500;
    
    expect(validPrice > 0).toBe(true);
    expect(invalidPrice > 0).toBe(false);
  });

  test('should validate quantity is within range', () => {
    const validQuantity = 5;
    const tooLow = 0;
    const tooHigh = 101;
    
    const isValidQuantity = (qty) => qty >= 1 && qty <= 100;
    
    expect(isValidQuantity(validQuantity)).toBe(true);
    expect(isValidQuantity(tooLow)).toBe(false);
    expect(isValidQuantity(tooHigh)).toBe(false);
  });

  test('should validate required fields are present', () => {
    const validContact = { name: 'John', email: 'john@test.com', message: 'Hi' };
    const invalidContact = { name: 'John', email: '' };
    
    const hasRequiredFields = (obj) => !!(obj.name && obj.email && obj.message);
    
    expect(hasRequiredFields(validContact)).toBe(true);
    expect(hasRequiredFields(invalidContact)).toBe(false);
  });

  test('should validate product name length', () => {
    const validName = 'Face Cream';
    const tooShort = 'AB';
    const tooLong = 'A'.repeat(201);
    
    const isValidName = (name) => name.length >= 3 && name.length <= 200;
    
    expect(isValidName(validName)).toBe(true);
    expect(isValidName(tooShort)).toBe(false);
    expect(isValidName(tooLong)).toBe(false);
  });
});
