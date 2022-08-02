export interface productData {
    productName: string | undefined;
    productNameEng: string | undefined;
    productImage: string | undefined;
    productBarCode: string | undefined;
  }
  
export interface formProps extends Omit<productData, "productBarCode"> {
    setScanner: Function;
    productBarCode: string | null | undefined;
    productQuantity: number;
    productExpDate: Date;
    navigateToHome: Function;
    productEditing: boolean;
  }
  
export interface ProductDataToBeStored extends productData {
    productName: string;
    productNameEng: string;
    expDate: Date;
    addedDate: Date;
    quantity: number;
}

export interface StoredProductData extends Omit<ProductDataToBeStored, "expDate" | "addedDate"> {
    expDate: string; //once stored in asyncstorage the Date is serialized into a string
    addedDate: string;
}

export interface StoredProductsDictData {
    [key: string]: StoredProductData;
}