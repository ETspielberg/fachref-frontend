export class Ignored {

    constructor(
        public titleId : string,
        public identifier: string,
        public shelfmark: string,
        public type: string,
        public comment: string,
        public mab: string,
        public date: Date,
        public expire: Date
    ) {
    }

    public toString(): string {
      return '{"titleId": "' + this.titleId + '", "identifier": "' + this.identifier +
        '", "shelfmark": "' + this.shelfmark + '", "type": "' + this.type + '", "comment": "' + this.comment +
        '", "mab": "' + this.mab + '", "date": "' + this.getDateFormatted(this.date) +
        '", "expire": "'+ this.getDateFormatted(this.expire) + '"}';
    }

    private getDateFormatted(date: Date): string {
      let day = date.getDay().toString();
      if (day.length === 1) {
        day = '0' + day;
      }
      let month = date.getMonth().toString();
      if (month.length === 1) {
        month = '0' + month;
      }

      let hour = date.getHours().toString();
      if (hour.length === 1) {
        hour = '0' + hour;
      }

      let year = date.getFullYear();

      let minutes = date.getMinutes().toString();
      if (minutes.length === 1) {
        minutes = '0' + minutes;
      }

      let seconds = date.getSeconds().toString();
      if (seconds.length === 1) {
        seconds = '0' + seconds;
      }
      return day + '.' + month + '.' + year + ' ' + hour + ':' + minutes + ':' + seconds;
    }
}
