import { Express } from 'express';

interface Api {
  register(app: Express): void;
}

export default Api;
