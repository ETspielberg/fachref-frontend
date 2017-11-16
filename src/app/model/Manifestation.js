"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Eike on 17.07.2017.
 */
var Manifestation = (function () {
    function Manifestation(titleID, items, bibliographicInformation, shelfmark, shelfmarkBase, edition, collections, materials) {
        this.titleID = titleID;
        this.items = items;
        this.bibliographicInformation = bibliographicInformation;
        this.shelfmark = shelfmark;
        this.shelfmarkBase = shelfmarkBase;
        this.edition = edition;
        this.collections = collections;
        this.materials = materials;
    }
    return Manifestation;
}());
exports.Manifestation = Manifestation;
//# sourceMappingURL=Manifestation.js.map