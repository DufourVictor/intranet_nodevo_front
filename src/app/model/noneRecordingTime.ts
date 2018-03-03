import { User } from './user';

export class NoneRecordingTime {
    id: number;
    reason: string;
    fromDate: Date;
    toDate = Date;
    user: User;

    constructor(id, reason, fromDate, toDate, user) {
        this.id = id;
        this.reason = reason;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.user = user;
    }
}
