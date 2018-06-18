const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var msg = generateMessage('admin', 'Hello there!');

    expect(msg.createdAt).toBeA('number');
    expect(msg).toInclude({
      from,
      text
    });
  });
});
