import { Express } from 'express';
import Api from '../Api';

class Test implements Api {
  register(app: Express): void {
    app.get('/', (req, res) => res.send('test'));
  }
}

export default Test;
