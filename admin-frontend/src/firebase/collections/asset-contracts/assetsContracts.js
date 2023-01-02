import Collection from "../../core/collection";

export default class extends Collection {
  static collection = "assets_contracts";
  static fields = {
    contract: Collection.resolve("../contracts/contracts.js"),
  };

  constructor(assetId) {
    super();
    this.setDocumentReference(["assets_contract", assetId]);
  }
}
