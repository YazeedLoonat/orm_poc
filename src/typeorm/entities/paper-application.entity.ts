import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Language } from '../types/language-enum';
import { Asset } from './asset.entity';
import { ApplicationMethod } from './application-method.entity';

@Entity({ name: 'paper_applications' })
export class PaperApplication extends AbstractEntity {
  @Column({ enum: Language })
  language: Language;

  @ManyToOne(() => Asset, { eager: true, cascade: true })
  file: Asset;

  @ManyToOne(() => ApplicationMethod, (am) => am.paperApplications)
  applicationMethod: ApplicationMethod;
}
