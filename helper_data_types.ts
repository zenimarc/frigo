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

export interface ComplexSearchResp {
  results?: ComplexSearchResultsEntity[] | null;
  offset: number;
  number: number;
  totalResults: number;
}
export interface ComplexSearchResultsEntity {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  creditsText?: string | null;
  license?: string | null;
  sourceName?: string | null;
  pricePerServing: number;
  extendedIngredients: ExtendedIngredientsEntity[];
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  summary: string;
  cuisines?: string[];
  dishTypes?: string[];
  diets?: string[] | null;
  occasions?: (string | null)[] | null;
  analyzedInstructions?: (AnalyzedInstructionsEntity | null)[] | null;
  spoonacularSourceUrl: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  likes: number;
  missedIngredients: MissedIngredientsEntityOrUsedIngredientsEntity[];
  usedIngredients: MissedIngredientsEntityOrUsedIngredientsEntity[];
  unusedIngredients?:
    | UnusedIngredientsEntityOrMissedIngredientsEntityOrUsedIngredientsEntity[]
    | null;
  author?: string | null;
}
export interface ExtendedIngredientsEntity {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta?: (string | null)[] | null;
  measures: Measures;
}
export interface Measures {
  us: UsOrMetric;
  metric: UsOrMetric;
}
export interface UsOrMetric {
  amount: number;
  unitShort: string;
  unitLong: string;
}
export interface AnalyzedInstructionsEntity {
  name: string;
  steps?: StepsEntity[] | null;
}
export interface StepsEntity {
  number: number;
  step: string;
  ingredients?: (EquipmentEntityOrIngredientsEntity | null)[] | null;
  equipment?: (EquipmentEntity | null)[] | null;
  length?: LengthOrTemperature | null;
}
export interface EquipmentEntityOrIngredientsEntity {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}
export interface EquipmentEntity {
  id: number;
  name: string;
  localizedName: string;
  image: string;
  temperature?: LengthOrTemperature1 | null;
}
export interface LengthOrTemperature1 {
  number: number;
  unit: string;
}
export interface LengthOrTemperature {
  number: number;
  unit: string;
}
export interface MissedIngredientsEntityOrUsedIngredientsEntity {
  id: number;
  amount: number;
  unit: string;
  unitLong: string;
  unitShort: string;
  aisle: string;
  name: string;
  original: string;
  originalName: string;
  meta?: (string | null)[] | null;
  extendedName?: string | null;
  image: string;
}
export interface UnusedIngredientsEntityOrMissedIngredientsEntityOrUsedIngredientsEntity {
  id: number;
  amount: number;
  unit: string;
  unitLong: string;
  unitShort: string;
  aisle: string;
  name: string;
  original: string;
  originalName: string;
  meta?: null[] | null;
  image: string;
}
