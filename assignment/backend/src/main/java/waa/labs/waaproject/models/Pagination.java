package waa.labs.waaproject.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Pagination {
    private int page = 0;
    private int size = 10;
    private String sortBy;
}
