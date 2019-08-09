import Command from '../Command';
import Backoff from './Backoff';
import Backup from './Backup';
import Coinflip from './Coinflip';
import Help from './Help';
import New from './New';
import Play from './Play';
import Repeat from './Repeat';
import Snapshot from './Snapshot';
import Stop from './Stop';
import Timed from './Timed';

import Bot from '../Bot';

function getCommands(bot: Bot): Command[] {
  return [
    new Help(bot),
    new Repeat(bot),
    new Timed(bot),
    new Backup(bot),
    new Backoff(bot),
    new Coinflip(bot),
    new New(bot),
    new Play(bot),
    new Stop(bot),
    new Snapshot(bot)
  ];
}

export default getCommands;
