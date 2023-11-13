import { Command, CommandRunner, Option } from 'nest-commander';

import { PrismaService } from 'src/database/prisma.service';
import { TenantManagerService } from 'src/tenant-manager/tenant-manager.service';

interface MigrateOldSchemaOptions {
  workspaceId?: string;
}

@Command({
  name: 'database:migrate-old-schema',
  description: 'Migrate old database data into new database',
})
export class MigrateOldSchemaCommand extends CommandRunner {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tenantManagerService: TenantManagerService,
  ) {
    super();
  }

  @Option({
    flags: '-w, --workspaceId [workspace id]',
    description: 'Specific workspaceId to apply cleaning',
  })
  parseWorkspace(val: string): string {
    return val;
  }

  filterDataByWorkspace(data, workspaceId) {
    return data.reduce((filtered, elem) => {
      if (elem.workspaceId === workspaceId) {
        delete elem.workspaceId;
        filtered.push(elem);
      }
      return filtered;
    }, []);
  }

  async copyData(table, data, workspaceId, columns) {
    const filteredByWorkspace = this.filterDataByWorkspace(data, workspaceId);
    await this.tenantManagerService.injectWorkspaceData(
      table,
      workspaceId,
      filteredByWorkspace,
      columns,
    );
  }

  formatActivities(activities) {
    return activities.map((activity) => {
      return {
        id: activity.id,
        body: activity.body,
        title: activity.title,
        type: activity.type,
        reminderAt: activity.reminderAt,
        dueAt: activity.dueAt,
        completedAt: activity.completedAt,
        authorId: activity.authorId,
        assigneeId: activity.assigneeId,
        workspaceMemberAssigneeId: activity.workspaceMemberAssigneeId,
        workspaceMemberAuthorId: activity.workspaceMemberAssigneeId,
        createdAt: activity.createdAt,
        updatedAt: activity.updatedAt,
        deletedAt: activity.deletedAt,
        workspaceId: activity.workspaceId,
      };
    });
  }

  formatActivityTargets(activityTargets) {
    return activityTargets.map((activityTarget) => {
      return {
        id: activityTarget.id,
        activityId: activityTarget.activityId,
        personId: activityTarget.personId,
        companyId: activityTarget.companyId,
        createdAt: activityTarget.createdAt,
        updatedAt: activityTarget.updatedAt,
        deletedAt: activityTarget.deletedAt,
        workspaceId: activityTarget.workspaceId,
      };
    });
  }

  formatApiKeys(apiKeys) {
    return apiKeys.map((apiKey) => {
      return {
        id: apiKey.id,
        name: apiKey.name,
        expiresAt: apiKey.expiresAt,
        revokedAt: apiKey.revokedAt,
        createdAt: apiKey.createdAt,
        updatedAt: apiKey.updatedAt,
        deletedAt: apiKey.deletedAt,
        workspaceId: apiKey.workspaceId,
      };
    });
  }

  formatAttachments(attachments) {
    return attachments.map((attachment) => {
      return {
        id: attachment.id,
        fullPath: attachment.fullPath,
        type: attachment.type,
        name: attachment.name,
        authorId: attachment.authorId,
        activityId: attachment.activityId,
        workspaceMemberAuthorId: attachment.workspaceMemberAuthorId,
        companyId: attachment.companyId,
        personId: attachment.personId,
        createdAt: attachment.createdAt,
        updatedAt: attachment.updatedAt,
        deletedAt: attachment.deletedAt,
        workspaceId: attachment.workspaceId,
      };
    });
  }

  formatComments(comments) {
    return comments.map((comment) => {
      return {
        id: comment.id,
        body: comment.body,
        authorId: comment.authorId,
        commentThreadId: comment.commentThreadId,
        activityId: comment.activityId,
        workspaceMemberAuthorId: comment.workspaceMemberAuthorId,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        deletedAt: comment.deletedAt,
        workspaceId: comment.workspaceId,
      };
    });
  }

  formatCompanies(companies) {
    return companies.map((company) => {
      return {
        id: company.id,
        name: company.name,
        domainName: company.domainName,
        address: company.address,
        employees: company.employees,
        accountOwnerId: company.accountOwnerId,
        linkedinUrl: company.linkedinUrl,
        annualRecurringRevenue: company.annualRecurringRevenue,
        idealCustomerProfile: company.idealCustomerProfile,
        xUrl: company.xUrl,
        workspaceMemberAccountOwnerId: company.workspaceMemberAccountOwnerId,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
        deletedAt: company.deletedAt,
        workspaceId: company.workspaceId,
      };
    });
  }

  formatFavorites(favorites) {
    return favorites.map((favorite) => {
      return {
        id: favorite.id,
        personId: favorite.personId,
        companyId: favorite.companyId,
        workspaceMemberId: favorite.workspaceMemberId,
        workspaceId: favorite.workspaceId,
      };
    });
  }

  formatPeople(people) {
    return people.map((person) => {
      return {
        id: person.id,
        email: person.email,
        phone: person.phone,
        city: person.city,
        companyId: person.companyId,
        firstName: person.firstName,
        lastName: person.lastName,
        jobTitle: person.jobTitle,
        linkedinUrl: person.linkedinUrl,
        avatarUrl: person.avatarUrl,
        xUrl: person.xUrl,
        createdAt: person.createdAt,
        updatedAt: person.updatedAt,
        deletedAt: person.deletedAt,
        workspaceId: person.workspaceId,
      };
    });
  }

  formatViews(views) {
    return views.map((view) => {
      return {
        id: view.id,
        name: view.name,
        objectMetadataId: view.objectId,
        type: view.type,
        workspaceId: view.workspaceId,
      };
    });
  }

  formatViewFields(viewFields) {
    return viewFields.map((viewField) => {
      return {
        fieldMetadataId: viewField.key,
        viewId: viewField.viewId,
        position: viewField.index,
        isVisible: viewField.isVisible,
        size: viewField.size,
        workspaceId: viewField.workspaceId,
      };
    });
  }

  formatViewFilters(viewFilters) {
    return viewFilters.map((viewFilter) => {
      return {
        fieldMetadataId: viewFilter.key,
        viewId: viewFilter.viewId,
        operand: viewFilter.operand,
        value: viewFilter.value,
        displayValue: viewFilter.displayValue,
        workspaceId: viewFilter.workspaceId,
      };
    });
  }

  formatViewSorts(viewSorts) {
    return viewSorts.map((viewSort) => {
      return {
        fieldMetadataId: viewSort.key,
        viewId: viewSort.viewId,
        direction: viewSort.description,
        workspaceId: viewSort.workspaceId,
      };
    });
  }

  async getWorkspaces(options) {
    const where = options.workspaceId
      ? { id: { equals: options.workspaceId } }
      : {};
    return await this.prismaService.client.workspace.findMany({
      where,
      orderBy: [{ createdAt: 'asc' }],
    });
  }

  async run(
    _passedParam: string[],
    options: MigrateOldSchemaOptions,
  ): Promise<void> {
    try {
      const workspaces = await this.getWorkspaces(options);
      const activities: Array<any> = this.formatActivities(
        await this.prismaService.client
          .$queryRaw`SELECT * FROM public."activity"`,
      );
      const activityYTargets: Array<any> = this.formatActivityTargets(
        await this.prismaService.client
          .$queryRaw`SELECT * FROM public."activity_targets"`,
      );
      const apiKeys: Array<any> = this.formatApiKeys(
        await this.prismaService.client
          .$queryRaw`SELECT * FROM public."api_keys"`,
      );
      const attachments: Array<any> = this.formatAttachments(
        await this.prismaService.client
          .$queryRaw`SELECT * FROM public."attachments"`,
      );
      const comments: Array<any> = this.formatComments(
        await this.prismaService.client
          .$queryRaw`SELECT * FROM public."comments"`,
      );
      const companies: Array<any> = this.formatCompanies(
        await this.prismaService.client
          .$queryRaw`SELECT * FROM public."companies"`,
      );
      const favorites: Array<any> = this.formatFavorites(
        await this.prismaService.client
          .$queryRaw`SELECT * FROM public."favorites"`,
      );
      const people: Array<any> = this.formatPeople(
        await this.prismaService.client
          .$queryRaw`SELECT * FROM public."people"`,
      );
      const views: Array<any> = this.formatViews(
        await this.prismaService.client.$queryRaw`SELECT * FROM public."views"`,
      );
      const viewFields: Array<any> = this.formatViewFields(
        await this.prismaService.client
          .$queryRaw`SELECT * FROM public."viewFields"`,
      );
      const viewFilters: Array<any> = this.formatViewFilters(
        await this.prismaService.client
          .$queryRaw`SELECT * FROM public."viewFilters"`,
      );
      const viewSorts: Array<any> = this.formatViewSorts(
        await this.prismaService.client
          .$queryRaw`SELECT * FROM public."viewSorts"`,
      );
      for (const workspace of workspaces) {
        await this.copyData('company', companies, workspace.id, [
          'name',
          'domainName',
          'address',
          'employees',
        ]);
        await this.copyData('view', views, workspace.id, [
          'id',
          'name',
          'objectMetadataId',
          'type',
        ]);
        await this.copyData('viewField', viewFields, workspace.id, [
          'fieldMetadataId',
          'viewId',
          'position',
          'isVisible',
          'size',
        ]);
        await this.copyData('viewFilter', viewFilters, workspace.id, [
          'fieldMetadataId',
          'viewId',
          'operand',
          'value',
          'displayValue',
        ]);
        await this.copyData('viewSort', viewSorts, workspace.id, [
          'fieldMetadataId',
          'viewId',
          'direction',
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
