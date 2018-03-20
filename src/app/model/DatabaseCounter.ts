export class DatabaseCounter  {

    constructor(
        public id: string,
        public title: string,
        public platform: string,
        public publisher: string,
        public month: number,
        public year: number,
        public regularSearches: number,
        public federatedSearches: number,
        public resultClicks: number,
        public recordViews: number
    ) { }
}
