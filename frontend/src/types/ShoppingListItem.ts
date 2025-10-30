export interface ShoppingListItem {
    id: number,
    name: string,
    quantity: number,
    state: "visible" | "checked",
}