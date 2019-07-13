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

const commands: Command[] = [
  Help,
  Repeat,
  Timed,
  Backup,
  Backoff,
  Coinflip,
  New,
  Play,
  Stop,
  Snapshot
];

export default commands;
