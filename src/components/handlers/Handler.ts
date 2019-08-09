import { Message } from 'discord.js';

interface Handler {
  handle(message: Message): void;
}

export function isHandler (arg: any): arg is Handler {
  return arg.handle;
}

export default Handler;
