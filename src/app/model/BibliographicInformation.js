"use strict";
/**
 * Created by Eike on 17.07.2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BibliographicInformation = (function () {
    function BibliographicInformation(docNumber, isbn, doi, authors, title, subtitle, publisher, place, year, edition, series, volume, keywords, type) {
        this.docNumber = docNumber;
        this.isbn = isbn;
        this.doi = doi;
        this.authors = authors;
        this.title = title;
        this.subtitle = subtitle;
        this.publisher = publisher;
        this.place = place;
        this.year = year;
        this.edition = edition;
        this.series = series;
        this.volume = volume;
        this.keywords = keywords;
        this.type = type;
    }
    return BibliographicInformation;
}());
exports.BibliographicInformation = BibliographicInformation;
//# sourceMappingURL=BibliographicInformation.js.map