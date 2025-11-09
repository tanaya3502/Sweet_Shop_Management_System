package in.ss.main.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SweetResponse {
    private Long id;
    private String name;
    private String category;
    private Double price;
    private Integer quantity;
}
