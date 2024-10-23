package waa.labs.waaproject.models;

import lombok.Data;

import java.util.Collection;

@Data
public class PageHolder<T> {
    private int totalPage;
    private Collection<T> data;

    public PageHolder(Collection<T> collection, int total) {
        this.totalPage = total;
        this.data = collection;
    }
}
