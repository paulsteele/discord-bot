import Command from '../Command';
import Help from './Help';
import Repeat from './Repeat';
import Timed from './Timed';
import Backup from './Backup';
import Backoff from './Backoff';
import Coinflip from './Coinflip';
import New from './New';
import Play from './Play';
import Stop from './Stop';
import Snapshot from './Snapshot';

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
