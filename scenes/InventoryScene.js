

export default class InventoryScene extends Phaser.Scene {
  constructor() {
    super('InventoryScene');
  }

  create() {
    this.inventory = new Inventory();
    this.createUI();
  }

  createUI() {
    const inventoryPanel = this.add.panel(400, 300, 600, 400, 0x000000);
    const inventorySlots = [];

    const slotSize = 64;
    const margin = 10;

    for (let i = 0; i < this.inventory.getCapacity(); i++) {
      const row = Math.floor(i / 10);
      const col = i % 10;
      const slotX = inventoryPanel.x - inventoryPanel.width / 2 + margin + col * (slotSize + margin);
      const slotY = inventoryPanel.y - inventoryPanel.height / 2 + margin + row * (slotSize + margin);

      const slot = this.add.rectangle(slotX, slotY, slotSize, slotSize, 0xffffff);
      slot.setInteractive();
      slot.setData('slotIndex', i);
      slot.on('pointerdown', this.handleSlotClick, this);

      inventorySlots.push(slot);
    }

    this.updateInventoryUI(inventorySlots);
  }

  handleSlotClick(pointer, slot) {
    const slotIndex = slot.getData('slotIndex');
    const item = this.inventory.slots[slotIndex];

    if (item) {
      this.inventory.removeItem(item);
    } else {
      const newItem = { name: `Item ${slotIndex + 1}`, id: slotIndex + 1 };
      this.inventory.addItem(newItem);
    }

    this.updateInventoryUI();
  }

  updateInventoryUI(slots) {
    if (!slots) {
      slots = this.children.list.filter((child) => child instanceof Phaser.GameObjects.Rectangle);
    }

    slots.forEach((slot) => {
      const slotIndex = slot.getData('slotIndex');
      const item = this.inventory.slots[slotIndex];

      if (item) {
        slot.fillColor = 0xff0000;
      } else {
        slot.fillColor = 0xffffff;
      }
    });
  }
}
