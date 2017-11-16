"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Journal = (function () {
    function Journal(actualName, id, issns, description, zdbID, ezbID, link, subject, publisher) {
        this.actualName = actualName;
        this.id = id;
        this.issns = issns;
        this.description = description;
        this.zdbID = zdbID;
        this.ezbID = ezbID;
        this.link = link;
        this.subject = subject;
        this.publisher = publisher;
    }
    return Journal;
}());
exports.Journal = Journal;
//# sourceMappingURL=Journal.js.map