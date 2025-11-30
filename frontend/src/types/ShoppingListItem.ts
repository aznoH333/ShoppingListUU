export interface ShoppingListItem {
    id: string,
    name: string,
    quantity: number,
    state: "visible" | "checked",
}