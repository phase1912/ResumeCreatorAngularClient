import { Injectable } from '@angular/core';

@Injectable()
export class ExtendObjectsService {
  public extendObject<T extends object> (source: T, destination: T) {
    Object.keys(source).forEach(key => {
      destination[key as keyof T] = source[key as keyof T];
    });
  }

  public extendObjectAndUpdateField<TypeOfObj extends object, TypeOfField> (
    source: TypeOfObj, destination: TypeOfObj, fieldName: string, fieldValue: TypeOfField) {
    Object.keys(source).forEach(key => {
      destination[key as keyof TypeOfObj] = source[key as keyof TypeOfObj];
    });

    // @ts-ignore
    destination[fieldName] = fieldValue;
  }
}
