"use strict";
/**
 * Created by etspi on 25.06.2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Stockcontrol = (function () {
    function Stockcontrol(identifier, description, subjectID, yearsToAverage, minimumYears, staticBuffer, variableBuffer, yearsOfRequests, minimumDaysOfRequest, groupedAnalysis, materials, collections, deletionMailBcc, status, systemCode) {
        this.identifier = identifier;
        this.description = description;
        this.subjectID = subjectID;
        this.yearsToAverage = yearsToAverage;
        this.minimumYears = minimumYears;
        this.staticBuffer = staticBuffer;
        this.variableBuffer = variableBuffer;
        this.yearsOfRequests = yearsOfRequests;
        this.minimumDaysOfRequest = minimumDaysOfRequest;
        this.groupedAnalysis = groupedAnalysis;
        this.materials = materials;
        this.collections = collections;
        this.deletionMailBcc = deletionMailBcc;
        this.status = status;
        this.systemCode = systemCode;
    }
    return Stockcontrol;
}());
exports.Stockcontrol = Stockcontrol;
//# sourceMappingURL=Stockcontrol.js.map