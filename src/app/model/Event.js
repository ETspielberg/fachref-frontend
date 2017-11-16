"use strict";
/**
 * Created by Eike on 12.07.2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Event = (function () {
    function Event(itemId, time, date, year, type, borrowerStatus, sorter, delta, collection, shelfmark, endEvent, duration) {
        this.itemId = itemId;
        this.time = time;
        this.date = date;
        this.year = year;
        this.type = type;
        this.borrowerStatus = borrowerStatus;
        this.sorter = sorter;
        this.delta = delta;
        this.collection = collection;
        this.shelfmark = shelfmark;
        this.endEvent = endEvent;
        this.duration = duration;
    }
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=Event.js.map