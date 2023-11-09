import { Module } from '@nestjs/common';

import { DataCleanInactiveCommand } from 'src/database/commands/clean-inactive-workspaces.command';
import { ConfirmationQuestion } from 'src/database/commands/questions/confirmation.question';
import { WorkspaceService } from 'src/core/workspace/services/workspace.service';
import { PipelineModule } from 'src/core/pipeline/pipeline.module';
import { CompanyModule } from 'src/core/company/company.module';
import { PersonModule } from 'src/core/person/person.module';
import { TenantInitialisationModule } from 'src/metadata/tenant-initialisation/tenant-initialisation.module';
import { PrismaModule } from 'src/database/prisma.module';
import { MigrateOldSchemaCommand } from 'src/database/commands/migrate-old-schema.command';
import { DataSourceMetadataModule } from 'src/metadata/data-source-metadata/data-source-metadata.module';

@Module({
  imports: [
    PipelineModule,
    CompanyModule,
    PersonModule,
    TenantInitialisationModule,
    PrismaModule,
    DataSourceMetadataModule,
  ],
  providers: [
    DataCleanInactiveCommand,
    MigrateOldSchemaCommand,
    ConfirmationQuestion,
    WorkspaceService,
  ],
})
export class DatabaseCommandModule {}
