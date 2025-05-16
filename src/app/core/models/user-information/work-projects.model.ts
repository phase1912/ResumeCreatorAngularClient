import { GeneralSkillModel } from './general-skill.model';
import { TechnicalSkillModel } from './technical-skill.model';

export class WorkProjectsModel {
  public id?: string;

  public projectName?: string;

  public industry?: string;

  public description?: string;

  public position?: string;

  public teamSize?: string;

  public startDate?: Date;

  public endDate?: Date;

  public responsibilities?: GeneralSkillModel[];

  public toolsAndTechnologies?: TechnicalSkillModel[];
}
