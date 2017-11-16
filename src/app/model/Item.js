"use strict";
/**
 * Created by Eike on 17.07.2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Item = (function () {
    function Item(collection, shelfmark, itemId, subLibrary, material, itemStatus, processStatus, inventoryDate, deletionDate, price, etat, events) {
        this.collection = collection;
        this.shelfmark = shelfmark;
        this.itemId = itemId;
        this.subLibrary = subLibrary;
        this.material = material;
        this.itemStatus = itemStatus;
        this.processStatus = processStatus;
        this.inventoryDate = inventoryDate;
        this.deletionDate = deletionDate;
        this.price = price;
        this.etat = etat;
        this.events = events;
    }
    return Item;
}());
exports.Item = Item;
//# sourceMappingURL=Item.js.map