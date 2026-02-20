package br.com.hotel.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Quarto {
    private Long id;
    private String numero;
    private int andar;
    private int capacidade;
    private double precoDiaria;
    private List<Cama> camas = new ArrayList<>();
    private StatusQuarto status;

    public Quarto() {}

    public Quarto(Long id, String numero, int andar, int capacidade, double precoDiaria, StatusQuarto status) {
        this.id = id;
        this.numero = numero;
        this.andar = andar;
        this.capacidade = capacidade;
        this.precoDiaria = precoDiaria;
        this.status = status;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }
    public int getAndar() { return andar; }
    public void setAndar(int andar) { this.andar = andar; }
    public int getCapacidade() { return capacidade; }
    public void setCapacidade(int capacidade) { this.capacidade = capacidade; }
    public double getPrecoDiaria() { return precoDiaria; }
    public void setPrecoDiaria(double precoDiaria) { this.precoDiaria = precoDiaria; }
    public List<Cama> getCamas() { return camas; }
    public void setCamas(List<Cama> camas) { this.camas = camas; }
    public StatusQuarto getStatus() { return status; }
    public void setStatus(StatusQuarto status) { this.status = status; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Quarto quarto = (Quarto) o;
        return Objects.equals(id, quarto.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
