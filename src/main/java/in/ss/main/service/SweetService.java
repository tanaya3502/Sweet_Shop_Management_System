package in.ss.main.service;


import java.util.List;

import in.ss.main.dtos.SweetRequest;
import in.ss.main.dtos.SweetResponse;

public interface SweetService {
    SweetResponse addSweet(SweetRequest request);
    List<SweetResponse> getAllSweets();
    List<SweetResponse> searchSweets(String name, String category, Double minPrice, Double maxPrice);
    SweetResponse updateSweet(Long id, SweetRequest request);
    void deleteSweet(Long id);
}
