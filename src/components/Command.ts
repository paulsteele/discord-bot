import MessageHandler from '../components/handlers/MessageHandler'

class Command {

  triggerText: string;
  args: string[];
  shortHelpText: string;
  longHelpText: string;
  version: string;
  store: any;
  handlers: MessageHandler[];
  commands: Command[];

  constructor(triggerText: string, shortHelpText:string , longHelpText: string, version:string, args = []) {
    this.triggerText = triggerText;
    this.args = args;
    this.shortHelpText = shortHelpText;
    this.longHelpText = longHelpText;
    this.version = version;
    this.store = null;
    this.handlers = [];
    this.commands = [];
  }

  getTrigger(): string {
    return this.triggerText;
  }

  execute() {
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

  getVersion() {
    return this.version;
  }

  setup(commands: Command[], handlers: MessageHandler[], store) {
    this.commands = commands;
    this.handlers = handlers;
    this.store = store;
    this.finalizeSetup();
  }

  finalizeSetup() {
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

  static compare(a: Command, b: Command) {
    if (a.getTrigger() < b.getTrigger()) {
      return -1;
    }
    if (a.getTrigger() > b.getTrigger()) {
      return 1;
    }
    return 0;
  }
}

export default Command;
