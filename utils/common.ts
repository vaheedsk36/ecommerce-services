export const setAttributes = (attribute:string, updatedParams:any) => {
    switch (attribute) {
      case "description":
        return `description = '${updatedParams[attribute]}'`;
      case "price":
        return `price = ${updatedParams[attribute]}`;
      case "assetUrl":
        return `asset_url = '${updatedParams[attribute]}'`;
      case "categoryId":
        return `category_id = ${updatedParams[attribute]}`;
      case "quantity":
        return `quantity = ${updatedParams[attribute]}`;
      case "sellerDetails":
        return `seller_details = '${JSON.stringify(updatedParams[attribute])}'`;
      case "category":
        return `category = '${updatedParams[attribute]}'`;
      case "specifications":
        return `specifications = '${JSON.stringify(updatedParams[attribute])}'`;
    }
  };