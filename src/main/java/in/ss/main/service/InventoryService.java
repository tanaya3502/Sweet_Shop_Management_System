package in.ss.main.service;

import in.ss.main.entities.Sweet;

public interface InventoryService {
    Sweet purchaseSweet(Long sweetId, int quantity);
    Sweet restockSweet(Long sweetId, int quantity);
}
