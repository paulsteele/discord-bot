class Command {
  constructor(triggerText, shortHelpText, longHelpText, args = []) {
    this.triggerText = triggerText;
    this.args = args;
    this.shortHelpText = shortHelpText;
    this.longHelpText = longHelpText;
    this.store = null;
    this.handlers = null;
    this.commands = null;
  }

  getTrigger() {
    return this.triggerText;
  }

  execute() { // eslint-disable-line class-methods-use-this
    // meant to be overwritten if needed
  }

  getShortHelp() {
    return this.shortHelpText;
  }

  getLongHelp() {
    return this.longHelpText;
  }

  getArgs() {
    return this.args;
  }

  setup(commands, handlers, store) {
    this.commands = commands;
    this.handlers = handlers;
    this.store = store;
    this.finalizeSetup();
  }

  finalizeSetup() { // eslint-disable-line class-methods-use-this
    // meant to be overwritten if needed
  }

  static getPrefix() {
    return '!';
  }

  static getArgIdentifier() {
    return {
      start: '{',
      end: '}',
    };
  }

  static isValid(candidate) {
    if (candidate === undefined) {
      return false;
    }
    return candidate.getTrigger &&
    candidate.execute &&
    candidate.getShortHelp &&
    candidate.getLongHelp &&
    candidate.getArgs &&
    candidate.setup &&
    candidate.finalizeSetup;
  }
}

export default Command;
