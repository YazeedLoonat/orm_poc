import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Language } from '../types/language-enum';
// import { MultiselectQuestion } from "./multiselect-question.entity"

@Entity({ name: 'jurisdictions' })
export class Jurisdiction extends AbstractEntity {
  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ nullable: true, type: 'text' })
  notificationsSignUpURL?: string | null;

  @Column({ type: 'enum', enum: Language, array: true, default: [Language.en] })
  languages: Language[];

  @Column({ nullable: true, type: 'text' })
  partnerTerms?: string | null;

  @Column({ type: 'text', default: '' })
  publicUrl: string;

  @Column({ nullable: true, type: 'text' })
  emailFromAddress: string;

  @Column({ type: 'text' })
  rentalAssistanceDefault: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  enablePartnerSettings?: boolean | null;

  @Column({ type: 'boolean', nullable: false, default: false })
  enableAccessibilityFeatures: boolean | null;

  @Column({ type: 'boolean', nullable: false, default: false })
  enableUtilitiesIncluded: boolean | null;
}
