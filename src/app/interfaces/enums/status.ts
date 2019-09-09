export class Status {

  static OK = 'OK';
  static NOK = 'NOK';
  static PENDING = 'PENDING';
  static NA = 'NA';

  static getAllStatus(): string[] {
    return Object.keys(Status).map(value => Status[value]);
  }

}
