import {  DMChannel, GroupDMChannel, TextChannel, User } from 'discord.js';
import Bot from './Bot';

export interface Payload {
  author: User;
  channel: TextChannel | GroupDMChannel | DMChannel;
  contentText: string;
}

class Command {

  triggerText: string;
  args: string[];
  shortHelpText: string;
  longHelpText: string;
  version: string;
  bot: Bot;

  constructor(bot: Bot) {
    this.triggerText = "";
    this.args = [];
    this.shortHelpText = "";
    this.longHelpText = "";
    this.version = "";
    this.bot = bot;
  }

  getTrigger(): string {
    return this.triggerText;
  }

  execute(payload: Payload, ...args: any[]) {
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
