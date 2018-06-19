const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'admin';
    var text = 'Hello there!';
    var msg = generateMessage('admin', 'Hello there!');

    expect(typeof msg.createdAt).toBe('number');
    expect(msg).toMatchObject({
      from,
      text
    });
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Mohit';
    var latitude = 2;
    var longitude = 3;
    var url = `https://www.google.com/maps?q=2,3`;
    var msg = generateLocationMessage(from,latitude,longitude);

    expect(typeof msg.createdAt).toBe('number');
    expect(msg).toMatchObject({from, url});
  });
});
