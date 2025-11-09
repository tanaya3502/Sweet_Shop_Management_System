package in.ss.main.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import in.ss.main.dtos.SweetRequest;
import in.ss.main.dtos.SweetResponse;
import in.ss.main.service.SweetService;

import java.util.List;

@RestController
@RequestMapping("/api/sweets")
@RequiredArgsConstructor
public class SweetController {

    private final SweetService sweetService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public SweetResponse addSweet(@RequestBody SweetRequest request) {
        return sweetService.addSweet(request);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public List<SweetResponse> getAllSweets() {
        return sweetService.getAllSweets();
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public List<SweetResponse> searchSweets(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
    ) {
        return sweetService.searchSweets(name, category, minPrice, maxPrice);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public SweetResponse updateSweet(@PathVariable Long id, @RequestBody SweetRequest request) {
        return sweetService.updateSweet(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteSweet(@PathVariable Long id) {
        sweetService.deleteSweet(id);
    }
}
