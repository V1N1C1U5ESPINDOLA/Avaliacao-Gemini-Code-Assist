package br.com.hotel.controller;

import br.com.hotel.domain.*;
import br.com.hotel.service.QuartoService;
import java.util.*;

public class QuartoController {
    private final QuartoService quartoService = new QuartoService();

    // Cadastro de quarto
    public Quarto cadastrarQuarto(String numero, int andar, int capacidade, double precoDiaria, List<Cama> camas, StatusQuarto status) {
        return quartoService.cadastrar(numero, andar, capacidade, precoDiaria, camas, status);
    }

    // Edição de quarto
    public Quarto editarQuarto(Long id, String numero, int andar, int capacidade, double precoDiaria, List<Cama> camas, StatusQuarto status) {
        return quartoService.editar(id, numero, andar, capacidade, precoDiaria, camas, status);
    }

    // Listagem de quartos
    public List<Map<String, Object>> listarQuartos() {
        List<Map<String, Object>> resultado = new ArrayList<>();
        for (Quarto q : quartoService.listar()) {
            Map<String, Object> info = new HashMap<>();
            info.put("numero", q.getNumero());
            info.put("tipo", q.getCapacidade() > 2 ? "Familiar" : "Simples");
            info.put("precoPorHora", q.getPrecoDiaria() / 24.0);
            info.put("disponibilidade", q.getStatus());
            List<String> camas = new ArrayList<>();
            for (Cama cama : q.getCamas()) {
                camas.add(cama.getTipo().name());
            }
            info.put("camas", camas);
            resultado.add(info);
        }
        return resultado;
    }
}
