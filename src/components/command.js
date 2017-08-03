class Command {
  constructor(triggerText, executeCallback, helpMessage) {
    this.triggerText = triggerText;
    this.executeCallback = executeCallback;
    this.helpMessage = helpMessage;
  }

  getTrigger() {
    return this.triggerText;
  }

  execute(payload = {}) {
    this.executeCallback(payload);
  }

  getHelp() {
    return this.helpMessage;
  }

  static getPrefix() {
    return '!';
  }
}

export default Command;
