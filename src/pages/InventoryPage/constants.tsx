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

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const INVENTORY_TYPES = Object.values(InventoryType).map((type) => ({
  value: type.toUpperCase(),
  label: type,
}))

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
