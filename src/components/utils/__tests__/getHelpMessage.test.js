import getHelpMessage from '../getHelpMessage';
import getMaxCommandLength from '../getMaxCommandLength';

import Command from '../../command';

describe('getHelpMessage', () => {
  const noArgCommand = new Command('test', 'short help', 'long help', '0.0.0');
  const oneArgCommand = new Command('test-one', 'short help one', 'long help one', '0.0.0', ['one']);
  const twoArgCommand = new Command('test-two', 'short help two', 'long help two', '0.0.0', ['one', 'two']);

  const argStart = Command.getArgIdentifier().start;
  const argEnd = Command.getArgIdentifier().end;
  const argIdentifierLength = argStart.length + argEnd.length;

  const prefix = Command.getPrefix();

  it('should display the proper message for no commands', () => {

  });

  it('should display the proper message for one command', () => {
    const helpString = getHelpMessage(noArgCommand, 0, 1, getMaxCommandLength([noArgCommand]));
    expect(helpString).toEqual(`${prefix}test - short help`);
  });

  it('should display the proper message for multiple commands', () => {
    const argArray = [
      noArgCommand,
      oneArgCommand,
      twoArgCommand,
    ];

    const noArgHelpString = getHelpMessage(noArgCommand, 0,
      argArray.length, getMaxCommandLength(argArray));
    const oneArgHelpString = getHelpMessage(oneArgCommand, 1,
      argArray.length, getMaxCommandLength(argArray));
    const twoArgHelpString = getHelpMessage(twoArgCommand, 2,
      argArray.length, getMaxCommandLength(argArray));

    expect(noArgHelpString).toEqual(`${prefix}test  ${''.padEnd(argIdentifierLength * 2)}           - short help\n`);
    expect(oneArgHelpString).toEqual(`${prefix}test-one ${argStart}one${argEnd} ${''.padEnd(argIdentifierLength * 1)}    - short help one\n`);
    expect(twoArgHelpString).toEqual(`${prefix}test-two ${argStart}one${argEnd} ${argStart}two${argEnd} - short help two`);
  });
});
