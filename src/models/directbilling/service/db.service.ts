import { DbProvider } from '../db.provider.js';
import type { DBServiceStatus } from '../service/db.service.status.js';

export interface DbService {
    id: string;
    name: string;
    suffix: string;
    status: DBServiceStatus;

    api?: DbServiceNotify;

    providers: DbServiceProviders;
    commissions: DbServiceProvidersCommission;
    maxValues: DbServiceProvidersLimit;

    created_at: Date;
}

export interface DbServiceNotify {
    success: string;
    complete: string;
    failure: string;
}

interface DbServiceProviders {
    [DbProvider.PLAY]: boolean;
    [DbProvider.PLUS]: boolean;
    [DbProvider.ORANGE]: boolean;
    [DbProvider.T_MOBILE]: boolean;
}

interface DbServiceProvidersCommission {
    [DbProvider.PLAY]: DbProviderCommission;
    [DbProvider.PLUS]: DbProviderCommission;
    [DbProvider.ORANGE]: DbProviderCommission;
    [DbProvider.T_MOBILE]: DbProviderCommission;
}

interface DbServiceProvidersLimit {
    [DbProvider.PLAY]: string;
    [DbProvider.PLUS]: string;
    [DbProvider.ORANGE]: string;
    [DbProvider.T_MOBILE]: string;
}

interface DbProviderCommission {
    commission_0: string;
    commission_9: string;
    commission_25: string;
}
