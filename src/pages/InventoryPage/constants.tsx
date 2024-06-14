export enum InventoryType {
  MEDICINE = 'inventoryType.MEDICINE',
  FOOD = 'inventoryType.FOOD',
  TOYS = 'inventoryType.TOYS',
  ACCESSORIES = 'inventoryType.ACCESSORIES',
  HEALTH_WELLNESS = 'inventoryType.HEALTH_WELLNESS',
  HOUSING = 'inventoryType.HOUSING',
  LITTER_WASTE_MANAGEMENT = 'inventoryType.LITTER_WASTE_MANAGEMENT',
  APPAREL = 'inventoryType.APPAREL',
  FEEDING_SUPPLIES = 'inventoryType.FEEDING_SUPPLIES',
  TRAVEL_OUTDOOR = 'inventoryType.TRAVEL_OUTDOOR',
  TRAINING_BEHAVIOR = 'inventoryType.TRAINING_BEHAVIOR',
}

export const INVENTORY_TYPES = Object.keys(InventoryType).map((key) => ({
  value: key.toUpperCase(),
  label: InventoryType[key as keyof typeof InventoryType],
}))

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export interface ICreateInventoryForm {
  id?: string
  name: string
  type: InventoryType | ''
  newImages?: string[]
  description: string
  quantity: number | null
  price: number | null
  images: FileType[]
}

export interface FileType {
  file: File
  isNew: boolean
  url: string
  isDeleted?: boolean
}
