import { DataSource } from 'typeorm';

import { SeedObjectMetadataIds } from 'src/database/typeorm-seeds/metadata/object-metadata';
import { SeedWorkspaceId } from 'src/database/seeds/metadata';

const fieldMetadataTableName = 'fieldMetadata';

export enum SeedCompanyFieldMetadataIds {
  Name = '20202020-6d30-4111-9f40-b4301906fd3c',

  DomainName = '20202020-5e4e-4007-a630-8a2617914889',
  Address = '20202020-ad10-4117-a039-3f04b7a5f939',
  Employees = '20202020-7fbd-41ad-b64d-25a15ff62f04',
  LinkedinUrl = '20202020-a61d-4b78-b998-3fd88b4f73a1',
  XUrl = '20202020-46e3-479a-b8f4-77137c74daa6',
  AnnualRecurringRevenue = '20202020-4a5a-466f-92d9-c3870d9502a9',
  IdealCustomerProfile = '20202020-9e9f-4235-98b2-c76f3e2d281e',

  People = '20202020-68b4-4c8e-af19-738eba2a42a5',
  AccountOwner = '20202020-0739-495d-8e70-c0807f6b2268',
  ActivityTargets = '20202020-4a2e-4b41-8562-279963e8947e',
  Opportunities = '20202020-e3fc-46ff-b552-3e757843f06e',
  Favorites = '20202020-e7c8-4771-8cc4-ce0e8c36a3c0',
  Attachments = '20202020-61af-4ffd-b79b-baed6db8ad11',
}

export const seedCompanyFieldMetadata = async (
  workspaceDataSource: DataSource,
  schemaName: string,
) => {
  await workspaceDataSource
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.${fieldMetadataTableName}`, [
      'id',
      'objectMetadataId',
      'isCustom',
      'workspaceId',
      'isActive',
      'type',
      'name',
      'label',
      'targetColumnMap',
      'description',
      'icon',
      'isNullable',
    ])
    .orIgnore()
    .values([
      // Main Identifier
      {
        id: SeedCompanyFieldMetadataIds.Name,
        objectMetadataId: SeedObjectMetadataIds.Company,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'TEXT',
        name: 'name',
        label: 'Name',
        targetColumnMap: {
          value: 'name',
        },
        description: 'The company name',
        icon: 'IconBuildingSkyscraper',
        isNullable: false,
      },

      // Scalar Fields
      {
        id: SeedCompanyFieldMetadataIds.DomainName,
        objectMetadataId: SeedObjectMetadataIds.Company,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'TEXT',
        name: 'domainName',
        label: 'Domain Name',
        targetColumnMap: {
          value: 'domainName',
        },
        description:
          'The company website URL. We use this url to fetch the company icon',
        icon: 'IconLink',
        isNullable: true,
      },
      {
        id: SeedCompanyFieldMetadataIds.Address,
        objectMetadataId: SeedObjectMetadataIds.Company,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'TEXT',
        name: 'address',
        label: 'Address',
        targetColumnMap: {
          value: 'address',
        },
        description: 'The company address',
        icon: 'IconMap',
        isNullable: true,
      },
      {
        id: SeedCompanyFieldMetadataIds.Employees,
        objectMetadataId: SeedObjectMetadataIds.Company,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'NUMBER',
        name: 'employees',
        label: 'Employees',
        targetColumnMap: {
          value: 'employees',
        },
        description: 'Number of employees in the company',
        icon: 'IconUsers',
        isNullable: true,
      },
      {
        id: SeedCompanyFieldMetadataIds.LinkedinUrl,
        objectMetadataId: SeedObjectMetadataIds.Company,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'TEXT',
        name: 'linkedinUrl',
        label: 'Linkedin',
        targetColumnMap: {
          value: 'linkedinUrl',
        },
        description: 'The company Linkedin account',
        icon: 'IconBrandLinkedin',
        isNullable: true,
      },
      {
        id: SeedCompanyFieldMetadataIds.XUrl,
        objectMetadataId: SeedObjectMetadataIds.Company,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'TEXT',
        name: 'xUrl',
        label: 'X',
        targetColumnMap: {
          value: 'xUrl',
        },
        description: 'The company Twitter/X account',
        icon: 'IconBrandX',
        isNullable: true,
      },
      {
        id: SeedCompanyFieldMetadataIds.AnnualRecurringRevenue,
        objectMetadataId: SeedObjectMetadataIds.Company,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'NUMBER',
        name: 'annualRecurringRevenue',
        label: 'ARR',
        targetColumnMap: {
          value: 'annualRecurringRevenue',
        },
        description:
          'Annual Recurring Revenue: The actual or estimated annual revenue of the company',
        icon: 'IconMoneybag',
        isNullable: true,
      },
      {
        id: SeedCompanyFieldMetadataIds.IdealCustomerProfile,
        objectMetadataId: SeedObjectMetadataIds.Company,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'BOOLEAN',
        name: 'idealCustomerProfile',
        label: 'ICP',
        targetColumnMap: {
          value: 'idealCustomerProfile',
        },
        description:
          'Ideal Customer Profile:  Indicates whether the company is the most suitable and valuable customer for you',
        icon: 'IconTarget',
        isNullable: true,
      },

      // Relationships
      {
        id: SeedCompanyFieldMetadataIds.People,
        objectMetadataId: SeedObjectMetadataIds.Company,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'RELATION',
        name: 'people',
        label: 'People',
        targetColumnMap: {},
        description: 'People linked to the company.',
        icon: 'IconUsers',
        isNullable: true,
      },
      {
        id: SeedCompanyFieldMetadataIds.AccountOwner,
        objectMetadataId: SeedObjectMetadataIds.Company,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'RELATION',
        name: 'accountOwner',
        label: 'Account Owner',
        targetColumnMap: {
          value: 'accountOwnerId',
        },
        description:
          'Your team member responsible for managing the company account',
        icon: 'IconUserCircle',
        isNullable: true,
      },
      {
        id: SeedCompanyFieldMetadataIds.ActivityTargets,
        objectMetadataId: SeedObjectMetadataIds.Company,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'RELATION',
        name: 'activityTargets',
        label: 'Activities',
        targetColumnMap: {},
        description: 'Activities tied to the company',
        icon: 'IconCheckbox',
        isNullable: true,
      },
      {
        id: SeedCompanyFieldMetadataIds.Opportunities,
        objectMetadataId: SeedObjectMetadataIds.Company,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'RELATION',
        name: 'opportunities',
        label: 'Opportunities',
        targetColumnMap: {},
        description: 'Opportunities linked to the company.',
        icon: 'IconTargetArrow',
        isNullable: true,
      },
      {
        id: SeedCompanyFieldMetadataIds.Favorites,
        objectMetadataId: SeedObjectMetadataIds.Company,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'RELATION',
        name: 'favorites',
        label: 'Favorites',
        targetColumnMap: {},
        description: 'Favorites linked to the company',
        icon: 'IconHeart',
        isNullable: true,
      },
      {
        id: SeedCompanyFieldMetadataIds.Attachments,
        objectMetadataId: SeedObjectMetadataIds.Company,
        isCustom: false,
        workspaceId: SeedWorkspaceId,
        isActive: true,
        type: 'RELATION',
        name: 'attachments',
        label: 'Attachments',
        targetColumnMap: {},
        description: 'Attachments linked to the company.',
        icon: 'IconFileImport',
        isNullable: true,
      },
    ])
    .execute();
};
