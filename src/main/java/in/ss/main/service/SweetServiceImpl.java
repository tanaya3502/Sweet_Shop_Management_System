package in.ss.main.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import in.ss.main.dtos.SweetRequest;
import in.ss.main.dtos.SweetResponse;
import in.ss.main.entities.Sweet;
import in.ss.main.repository.SweetRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SweetServiceImpl implements SweetService {

    private final SweetRepository sweetRepository;

    @Override
    public SweetResponse addSweet(SweetRequest request) {
        Sweet sweet = Sweet.builder()
                .name(request.getName())
                .category(request.getCategory())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .build();
        Sweet saved = sweetRepository.save(sweet);
        return toDto(saved);
    }

    @Override
    public List<SweetResponse> getAllSweets() {
        return sweetRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<SweetResponse> searchSweets(String name, String category, Double minPrice, Double maxPrice) {
        if (name != null) {
            return sweetRepository.findByNameContainingIgnoreCase(name).stream().map(this::toDto).collect(Collectors.toList());
        } else if (category != null) {
            return sweetRepository.findByCategoryIgnoreCase(category).stream().map(this::toDto).collect(Collectors.toList());
        } else if (minPrice != null && maxPrice != null) {
            return sweetRepository.findByPriceBetween(minPrice, maxPrice).stream().map(this::toDto).collect(Collectors.toList());
        }
        return getAllSweets();
    }

    @Override
    public SweetResponse updateSweet(Long id, SweetRequest request) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found"));
        sweet.setName(request.getName());
        sweet.setCategory(request.getCategory());
        sweet.setPrice(request.getPrice());
        sweet.setQuantity(request.getQuantity());
        return toDto(sweetRepository.save(sweet));
    }

    @Override
    public void deleteSweet(Long id) {
        sweetRepository.deleteById(id);
    }

    private SweetResponse toDto(Sweet sweet) {
        return SweetResponse.builder()
                .id(sweet.getId())
                .name(sweet.getName())
                .category(sweet.getCategory())
                .price(sweet.getPrice())
                .quantity(sweet.getQuantity())
                .build();
    }
}
