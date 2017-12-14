import seperateCommandFromMessage from '../seperateCommandFromMessage';
import Command from '../../command';

describe('seperateCommandFromMessage', () => {
  const prefix = Command.getPrefix();
  const normalCommand = `${prefix}help me please`;
  const spacedCommand = `${prefix}help         wow`;
  const noContentCommand = `${prefix}help`;
  const oneLetterCommand = `${prefix}y n`;

  it('should return correct values for a message with some content', () => {
    const phrase = normalCommand;
    const command = seperateCommandFromMessage(phrase);
    expect(command.command).toEqual('help');
    expect(command.contentText).toEqual('me please');
  });

  it('should return correct values for a message with no content', () => {
    const phrase = noContentCommand;
    const command = seperateCommandFromMessage(phrase);
    expect(command.command).toEqual('help');
    expect(command.contentText).toEqual(null);
  });

  it('should return correct values for a one letter command and one letter content', () => {
    const phrase = oneLetterCommand;
    const command = seperateCommandFromMessage(phrase);
    expect(command.command).toEqual('y');
    expect(command.contentText).toEqual('n');
  });

  it('should return correct values for a message with content with spaces in front', () => {
    const phrase = `     ${normalCommand}`;
    const command = seperateCommandFromMessage(phrase);
    expect(command.command).toEqual('help');
    expect(command.contentText).toEqual('me please');
  });

  it('should return correct values for a message with content with spaces at the end', () => {
    const phrase = `${normalCommand}      `;
    const command = seperateCommandFromMessage(phrase);
    expect(command.command).toEqual('help');
    expect(command.contentText).toEqual('me please');
  });

  it('should return correct values for a message with no content with spaces at the end', () => {
    const phrase = `${noContentCommand}       `;
    const command = seperateCommandFromMessage(phrase);
    expect(command.command).toEqual('help');
    expect(command.contentText).toEqual(null);
  });

  it('should return correct values for a message with spaces inbetween', () => {
    const phrase = spacedCommand;
    const command = seperateCommandFromMessage(phrase);
    expect(command.command).toEqual('help');
    expect(command.contentText).toEqual('wow');
  });

  it('should return safe values on error', () => {
    const phrase = null;
    const command = seperateCommandFromMessage(phrase);
    expect(command.command).toEqual(null);
    expect(command.contentText).toEqual(null);
  });

  it('should return safe values on emptyvalue', () => {
    const phrase = '';
    const command = seperateCommandFromMessage(phrase);
    expect(command.command).toEqual(null);
    expect(command.contentText).toEqual(null);
  });

  it('should return safe values on just the command Prefix', () => {
    const phrase = prefix;
    const command = seperateCommandFromMessage(phrase);
    expect(command.command).toEqual('');
    expect(command.contentText).toEqual(null);
  });
});
