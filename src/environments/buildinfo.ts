import { format } from 'date-fns';

export const BuildInfo = {
    commit: 'development',
    lastChange: 'unknown',
    buildTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
};
