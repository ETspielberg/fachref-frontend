"use strict";
/**
 * Created by etspi on 25.06.2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Eventanalysis = (function () {
    function Eventanalysis(titleId, mab, description, date, collection, systemCode, materials, stockcontrolId, shelfmark, shelfmarkBase, meanRelativeLoan, meanStock, maxRelativeLoan, slope, lastStock, maxLoansAbs, proposedDeletion, comment, status, maxNumberRequest, maxItemsNeeded, daysRequested, numberRequests, proposedPurchase) {
        this.titleId = titleId;
        this.mab = mab;
        this.description = description;
        this.date = date;
        this.collection = collection;
        this.systemCode = systemCode;
        this.materials = materials;
        this.stockcontrolId = stockcontrolId;
        this.shelfmark = shelfmark;
        this.shelfmarkBase = shelfmarkBase;
        this.meanRelativeLoan = meanRelativeLoan;
        this.meanStock = meanStock;
        this.maxRelativeLoan = maxRelativeLoan;
        this.slope = slope;
        this.lastStock = lastStock;
        this.maxLoansAbs = maxLoansAbs;
        this.proposedDeletion = proposedDeletion;
        this.comment = comment;
        this.status = status;
        this.maxNumberRequest = maxNumberRequest;
        this.maxItemsNeeded = maxItemsNeeded;
        this.daysRequested = daysRequested;
        this.numberRequests = numberRequests;
        this.proposedPurchase = proposedPurchase;
    }
    return Eventanalysis;
}());
exports.Eventanalysis = Eventanalysis;
//# sourceMappingURL=Eventanalysis.js.map