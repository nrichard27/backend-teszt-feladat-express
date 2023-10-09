import { Router } from 'express';
import auth from './controllers/auth.controller';
import users from './controllers/user.controller';
import addresses from './controllers/address.controller';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/addresses', addresses);

export default router;
