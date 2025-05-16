import { WorkProjectsModel } from './work-projects.model';

export class WorkExperienceModel {
  public id?: string;

  public companyName?: string;

  public country?: string;

  public city?: string;

  public position?: string;

  public projects?: WorkProjectsModel[];

  public startDate?: Date;

  public endDate?: Date;
}
