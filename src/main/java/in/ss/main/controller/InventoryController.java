package in.ss.main.controller;

import in.ss.main.entities.Sweet;
import in.ss.main.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sweets")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    // Purchase endpoint - available to all authenticated users
    @PostMapping("/{id}/purchase")
    public ResponseEntity<Sweet> purchaseSweet(
            @PathVariable Long id,
            @RequestParam(defaultValue = "1") int quantity
    ) {
        Sweet sweet = inventoryService.purchaseSweet(id, quantity);
        return ResponseEntity.ok(sweet);
    }

    // Restock endpoint - ADMIN only
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/restock")
    public ResponseEntity<Sweet> restockSweet(
            @PathVariable Long id,
            @RequestParam(defaultValue = "10") int quantity
    ) {
        Sweet sweet = inventoryService.restockSweet(id, quantity);
        return ResponseEntity.ok(sweet);
    }
}
