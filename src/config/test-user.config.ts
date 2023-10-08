import { Role } from '../interfaces/role.enum';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

export async function create_test_user() {
    User.create({
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: await bcrypt.hash('secretpassword', 10),
        role: Role.ADMIN,
    }).catch(() => {});
}
