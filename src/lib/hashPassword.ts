
import {createHmac} from 'crypto';

export default (password: string) => {
    return createHmac('sha512', String(process.env.SESSION_SECRET)).update(password).digest('hex');
};
