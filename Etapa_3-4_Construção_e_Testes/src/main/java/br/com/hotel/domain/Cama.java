package br.com.hotel.domain;

public class Cama {
    private Long id;
    private TipoCama tipo;

    public Cama() {}
    public Cama(Long id, TipoCama tipo) {
        this.id = id;
        this.tipo = tipo;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public TipoCama getTipo() { return tipo; }
    public void setTipo(TipoCama tipo) { this.tipo = tipo; }
}
