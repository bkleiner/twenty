import { TenantMigrationTableAction } from 'src/metadata/tenant-migration/tenant-migration.entity';

export const addActivityTargetTable: TenantMigrationTableAction[] = [
  {
    name: 'activityTarget',
    action: 'create',
  },
  {
    name: 'activityTarget',
    action: 'alter',
    columns: [],
  },
];
