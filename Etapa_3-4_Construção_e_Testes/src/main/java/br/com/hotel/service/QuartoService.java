package br.com.hotel.service;

import br.com.hotel.domain.*;
import java.util.*;

public class QuartoService {
    private final List<Quarto> quartos = new ArrayList<>();
    private Long idSequence = 1L;

    public Quarto cadastrar(String numero, int andar, int capacidade, double precoDiaria, List<Cama> camas, StatusQuarto status) {
        Quarto quarto = new Quarto(idSequence++, numero, andar, capacidade, precoDiaria, status);
        quarto.setCamas(camas);
        quartos.add(quarto);
        return quarto;
    }

    public Quarto editar(Long id, String numero, int andar, int capacidade, double precoDiaria, List<Cama> camas, StatusQuarto status) {
        Quarto quarto = buscarPorId(id);
        if (quarto != null) {
            quarto.setNumero(numero);
            quarto.setAndar(andar);
            quarto.setCapacidade(capacidade);
            quarto.setPrecoDiaria(precoDiaria);
            quarto.setCamas(camas);
            quarto.setStatus(status);
        }
        return quarto;
    }

    public List<Quarto> listar() {
        return new ArrayList<>(quartos);
    }

    public Quarto buscarPorId(Long id) {
        return quartos.stream().filter(q -> q.getId().equals(id)).findFirst().orElse(null);
    }
}
