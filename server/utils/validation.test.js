const expect = require('expect');
const {isValidString} = require('./validation');

describe('isValidString()', () =>{
  it('should reject empty string', () => {
    var emptyStr = isValidString('   ');
    expect(emptyStr).toBe(false);
  });

  it('should reject invalid string', () => {
    var nonStr = isValidString(123);
    expect(nonStr).toBe(false);
  });

  it('should accept correct string', () => {
    var str = isValidString('  mohitag');
    expect(str).toBe(true);
  });

});
