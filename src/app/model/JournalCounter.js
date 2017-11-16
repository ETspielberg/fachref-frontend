"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JournalCounter = (function () {
    function JournalCounter(id, onlineIssn, printIssn, category, doi, proprietary, abbreviation, fullName, publisher, platform, type, year, month, htmlRequests, htmlRequestsMobile, pdfRequests, pdfRequestsMobile, psRequests, psRequestsMobile, totalRequests) {
        this.id = id;
        this.onlineIssn = onlineIssn;
        this.printIssn = printIssn;
        this.category = category;
        this.doi = doi;
        this.proprietary = proprietary;
        this.abbreviation = abbreviation;
        this.fullName = fullName;
        this.publisher = publisher;
        this.platform = platform;
        this.type = type;
        this.year = year;
        this.month = month;
        this.htmlRequests = htmlRequests;
        this.htmlRequestsMobile = htmlRequestsMobile;
        this.pdfRequests = pdfRequests;
        this.pdfRequestsMobile = pdfRequestsMobile;
        this.psRequests = psRequests;
        this.psRequestsMobile = psRequestsMobile;
        this.totalRequests = totalRequests;
    }
    return JournalCounter;
}());
exports.JournalCounter = JournalCounter;
//# sourceMappingURL=JournalCounter.js.map