import { TenantMigrationTableAction } from 'src/metadata/tenant-migration/tenant-migration.entity';

export const addPersonTable: TenantMigrationTableAction[] = [
  {
    name: 'person',
    action: 'create',
  },
  {
    name: 'person',
    action: 'alter',
    columns: [],
  },
];
