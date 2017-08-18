class Command {
  constructor(triggerText, helpText, args = []) {
    this.triggerText = triggerText;
    this.args = args;
    this.helpText = helpText;
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

  getHelp() {
    return this.helpText;
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
    return candidate.getTrigger &&
    candidate.execute &&
    candidate.getHelp &&
    candidate.getArgs &&
    candidate.setup &&
    candidate.finalizeSetup;
  }
}

export default Command;
