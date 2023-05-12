export default class Inventory {
    constructor() {
      this.slots = new Array(50).fill(null);
      this.capacity = 50;
    }
  
    addItem(item) {
      const slotIndex = this.findAvailableSlot();
      if (slotIndex !== -1) {
        this.slots[slotIndex] = item;
        console.log(`Added ${item.name} to the inventory.`);
      } else {
        console.log("Inventory is full.");
      }
    }
  
    removeItem(item) {
      const slotIndex = this.findItemSlot(item);
      if (slotIndex !== -1) {
        this.slots[slotIndex] = null;
        console.log(`Removed ${item.name} from the inventory.`);
      } else {
        console.log(`${item.name} is not found in the inventory.`);
      }
    }
  
    findAvailableSlot() {
      for (let i = 0; i < this.capacity; i++) {
        if (this.slots[i] === null) {
          return i;
        }
      }
      return -1;
    }
  
    findItemSlot(item) {
      return this.slots.findIndex((slotItem) => slotItem !== null && slotItem.id === item.id);
    }
  
    getInventory() {
      return this.slots.filter((item) => item !== null);
    }
  
    getCapacity() {
      return this.capacity;
    }
  }
  