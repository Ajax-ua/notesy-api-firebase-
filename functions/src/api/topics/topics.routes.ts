import { Router as router } from 'express';

import { getTopics } from './topics.controller';

export const topicsRoutes = router();

topicsRoutes.get('/', getTopics);
