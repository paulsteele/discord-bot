class Command {
  constructor(triggerText, args, executeCallback, helpMessage) {
    this.triggerText = triggerText;
    this.args = args;
    this.executeCallback = executeCallback;
    this.helpMessage = helpMessage;
  }

  getTrigger() {
    return this.triggerText;
  }

  execute(payload = {}, argArray = []) {
    this.executeCallback(payload, ...argArray);
  }

  getHelp() {
    return this.helpMessage;
  }

  getArgs() {
    return this.args;
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
    return candidate.getTrigger && candidate.execute && candidate.getHelp && candidate.getArgs;
  }
}

export default Command;
