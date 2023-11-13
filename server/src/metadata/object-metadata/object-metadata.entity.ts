import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ObjectMetadataInterface } from 'src/tenant/schema-builder/interfaces/object-metadata.interface';

import { FieldMetadataEntity } from 'src/metadata/field-metadata/field-metadata.entity';
import { RelationMetadataEntity } from 'src/metadata/relation-metadata/relation-metadata.entity';

@Entity('objectMetadata')
@Unique('IndexOnNameSingularAndWorkspaceIdUnique', [
  'nameSingular',
  'workspaceId',
])
@Unique('IndexOnNamePluralAndWorkspaceIdUnique', ['namePlural', 'workspaceId'])
export class ObjectMetadataEntity implements ObjectMetadataInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'uuid' })
  dataSourceId: string;

  @Column({ nullable: false })
  nameSingular: string;

  @Column({ nullable: false })
  namePlural: string;

  @Column({ nullable: false })
  labelSingular: string;

  @Column({ nullable: false })
  labelPlural: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: false })
  targetTableName: string;

  @Column({ default: false })
  isCustom: boolean;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: false })
  workspaceId: string;

  @OneToMany(() => FieldMetadataEntity, (field) => field.object, {
    cascade: true,
  })
  fields: FieldMetadataEntity[];

  @OneToMany(
    () => RelationMetadataEntity,
    (relation: RelationMetadataEntity) => relation.fromObjectMetadata,
  )
  fromRelations: RelationMetadataEntity[];

  @OneToMany(
    () => RelationMetadataEntity,
    (relation: RelationMetadataEntity) => relation.toObjectMetadata,
  )
  toRelations: RelationMetadataEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
