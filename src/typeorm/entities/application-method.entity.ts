import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Listing } from './listing.entity';
import { ApplicationMethodType } from '../types/application-method-type-enum';
import { AbstractEntity } from './abstract.entity';
import { PaperApplication } from './paper-application.entity';

@Entity({ name: 'application_methods' })
export class ApplicationMethod extends AbstractEntity {
  @Column({ type: 'enum', enum: ApplicationMethodType })
  type: ApplicationMethodType;

  @Column({ type: 'text', nullable: true })
  label?: string | null;

  @Column({ type: 'text', nullable: true })
  externalReference?: string | null;

  @Column({ type: 'bool', nullable: true })
  acceptsPostmarkedApplications?: boolean | null;

  @Column({ type: 'text', nullable: true })
  phoneNumber?: string | null;

  @OneToMany(
    () => PaperApplication,
    (paperApplication) => paperApplication.applicationMethod,
    {
      cascade: true,
      eager: true,
    },
  )
  paperApplications?: PaperApplication[] | null;

  @ManyToOne(() => Listing, (listing) => listing.applicationMethods)
  listing: Listing;
}
