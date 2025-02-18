"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Importação do módulo prompt-sync
var promptSync = require("prompt-sync");
//Variável que armazena a função promptSync
var getInput = promptSync();
//Classe abstrata Veiculo
var Veiculo = /** @class */ (function () {
    function Veiculo(_marca, _modelo, _ano, _preco) {
        this._marca = _marca;
        this._modelo = _modelo;
        this._ano = _ano;
        this._preco = _preco;
    }
    Object.defineProperty(Veiculo.prototype, "marca", {
        //Função para obter a marca do veículo
        get: function () {
            return this._marca;
        },
        //Função para definir a marca do veículo
        set: function (value) {
            if (!value)
                throw new Error("Marca não pode ser vazia.");
            this._marca = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Veiculo.prototype, "modelo", {
        //Função para obter o modelo do veículo
        get: function () {
            return this._modelo;
        },
        //Função para definir o modelo do veículo
        set: function (value) {
            if (!value)
                throw new Error("Modelo não pode ser vazio.");
            this._modelo = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Veiculo.prototype, "ano", {
        //Função para obter o ano do veículo
        get: function () {
            return this._ano;
        },
        //Função para definir o ano do veículo
        set: function (value) {
            if (value < 1886 || value > new Date().getFullYear())
                throw new Error("Ano inválido.");
            this._ano = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Veiculo.prototype, "preco", {
        //Função para obter o preço do veículo
        get: function () {
            return this._preco;
        },
        //Função para definir o preço do veículo
        set: function (value) {
            if (value <= 0)
                throw new Error("Preço deve ser maior que zero.");
            this._preco = value;
        },
        enumerable: false,
        configurable: true
    });
    return Veiculo;
}());
//Classe Carro que herda de Veiculo
var Carro = /** @class */ (function (_super) {
    __extends(Carro, _super);
    function Carro(marca, modelo, ano, preco, _portas) {
        var _this = _super.call(this, marca, modelo, ano, preco) || this;
        _this._portas = _portas;
        _this.portas = _portas;
        return _this;
    }
    Object.defineProperty(Carro.prototype, "portas", {
        //Função para obter o número de portas do carro
        get: function () {
            return this._portas;
        },
        //Função para definir o número de portas do carro
        set: function (value) {
            if (value < 2)
                throw new Error("O carro deve ter pelo menos 2 portas.");
            this._portas = value;
        },
        enumerable: false,
        configurable: true
    });
    //Função para exibir informações do carro
    Carro.prototype.exibirInformacoes = function () {
        console.log("Carro: ".concat(this.marca, " ").concat(this.modelo, ", ").concat(this.ano, ", R$").concat(this.preco, ", ").concat(this.portas, " portas."));
    };
    return Carro;
}(Veiculo));
//Classe Moto que herda de Veiculo
var Moto = /** @class */ (function (_super) {
    __extends(Moto, _super);
    function Moto(marca, modelo, ano, preco, _cilindrada) {
        var _this = _super.call(this, marca, modelo, ano, preco) || this;
        _this._cilindrada = _cilindrada;
        _this.cilindrada = _cilindrada;
        return _this;
    }
    Object.defineProperty(Moto.prototype, "cilindrada", {
        //Função para obter a cilindrada da moto
        get: function () {
            return this._cilindrada;
        },
        //Função para definir a cilindrada da moto
        set: function (value) {
            if (value <= 0)
                throw new Error("Cilindrada deve ser maior que zero.");
            this._cilindrada = value;
        },
        enumerable: false,
        configurable: true
    });
    //Função para exibir informações da moto
    Moto.prototype.exibirInformacoes = function () {
        console.log("Moto: ".concat(this.marca, " ").concat(this.modelo, ", ").concat(this.ano, ", R$").concat(this.preco, ", ").concat(this.cilindrada, "cc."));
    };
    return Moto;
}(Veiculo));
//Classe que implementa a interface IVeiculoCRUD
var VeiculoRepositorio = /** @class */ (function () {
    function VeiculoRepositorio() {
        this.veiculos = [];
    }
    //Função para adicionar veículos
    VeiculoRepositorio.prototype.adicionar = function (veiculo) {
        this.veiculos.push(veiculo);
        console.log("Veículo adicionado com sucesso!");
    };
    //Função para listar veículos
    VeiculoRepositorio.prototype.listar = function () {
        if (this.veiculos.length === 0) {
            console.log("Nenhum veículo cadastrado.");
            return;
        }
        this.veiculos.forEach(function (veiculo) { return veiculo.exibirInformacoes(); });
    };
    //Função para buscar veículos por modelo
    VeiculoRepositorio.prototype.buscarPorModelo = function (modelo) {
        return this.veiculos.find(function (v) { return v.modelo.toLowerCase() === modelo.toLowerCase(); });
    };
    //Função para buscar veículos por marca
    VeiculoRepositorio.prototype.buscarPorMarca = function (marca) {
        return this.veiculos.filter(function (v) { return v.marca.toLowerCase() === marca.toLowerCase(); });
    };
    //Função para buscar veículos por preço
    VeiculoRepositorio.prototype.buscarPorPreco = function (min, max) {
        return this.veiculos.filter(function (v) { return v.preco >= min && v.preco <= max; });
    };
    //Função para ordenar veículos por preço
    VeiculoRepositorio.prototype.ordenarPorPreco = function () {
        this.veiculos.sort(function (a, b) { return a.preco - b.preco; });
    };
    //Função para atualizar veículo
    VeiculoRepositorio.prototype.atualizar = function (modelo, novosDados) {
        var veiculo = this.buscarPorModelo(modelo);
        if (!veiculo) {
            console.log("Veículo não encontrado.");
            return;
        }
        if (novosDados.marca)
            veiculo.marca = novosDados.marca;
        if (novosDados.modelo)
            veiculo.modelo = novosDados.modelo;
        if (novosDados.ano !== undefined)
            veiculo.ano = novosDados.ano;
        if (novosDados.preco !== undefined)
            veiculo.preco = novosDados.preco;
        console.log("Veículo atualizado com sucesso!");
    };
    //Função para remover veículo
    VeiculoRepositorio.prototype.remover = function (modelo) {
        var index = this.veiculos.findIndex(function (veiculo) { return veiculo.modelo.toLowerCase() === modelo.toLowerCase(); });
        if (index === -1) {
            console.log("Veículo não encontrado.");
            return;
        }
        this.veiculos.splice(index, 1);
        console.log("Veículo removido com sucesso!");
    };
    return VeiculoRepositorio;
}());
//Variável que armazena o repositório de veículos
var repositorio = new VeiculoRepositorio();
console.log("------Bem-vindo ao ConSystem, o melhor Sistema para Concessionárias!------");
// Função principal que exibe o menu e interage com o usuário
function menu() {
    var opcao;
    do {
        console.log("\n1. Adicionar Veículo");
        console.log("2. Listar Veículos");
        console.log("3. Buscar por Modelo");
        console.log("4. Buscar por Marca");
        console.log("5. Buscar por Preço");
        console.log("6. Ordenar por Preço");
        console.log("7. Atualizar Veículo");
        console.log("8. Remover Veículo");
        console.log("9. Sair");
        opcao = getInput("Escolha uma opção: ");
        // Switch case para as opções do menu
        switch (opcao) {
            case "1":
                try {
                    var marca = getInput("Marca: ");
                    var modelo = getInput("Modelo: ");
                    var anoInput = getInput("Ano: ");
                    var ano = anoInput ? parseInt(anoInput) : 0;
                    var precoInput = getInput("Preço: ");
                    var preco = precoInput ? parseFloat(precoInput) : 0;
                    var tipo = getInput("Tipo (Carro/Moto): ");
                    if (tipo.toLowerCase() === "carro") {
                        var portasInput = getInput("Número de portas: ");
                        var portas = portasInput ? parseInt(portasInput) : 0;
                        repositorio.adicionar(new Carro(marca, modelo, ano, preco, portas));
                    }
                    else {
                        var cilindradasInput = getInput("Cilindradas: ");
                        var cilindradas = cilindradasInput ? parseInt(cilindradasInput) : 0;
                        repositorio.adicionar(new Moto(marca, modelo, ano, preco, cilindradas));
                    }
                }
                catch (error) {
                    console.log("Erro ao adicionar veículo: ", error.message);
                }
                break;
            case "2":
                repositorio.listar();
                break;
            case "3":
                var modeloBusca = getInput("Modelo: ");
                var veiculo = repositorio.buscarPorModelo(modeloBusca);
                veiculo ? veiculo.exibirInformacoes() : console.log("Veículo não encontrado.");
                break;
            case "4":
                var marcaBusca = getInput("Marca: ");
                repositorio.buscarPorMarca(marcaBusca).forEach(function (v) { return v.exibirInformacoes(); });
                break;
            case "5":
                var minInput = getInput("Preço mínimo: ");
                var min = minInput ? parseFloat(minInput) : 0;
                var maxInput = getInput("Preço máximo: ");
                var max = maxInput ? parseFloat(maxInput) : Infinity;
                repositorio.buscarPorPreco(min, max).forEach(function (v) { return v.exibirInformacoes(); });
                break;
            case "6":
                repositorio.ordenarPorPreco();
                repositorio.listar();
                break;
            case "7":
                var modeloAtualizar = getInput("Modelo do veículo a ser atualizado: ");
                var novosDados = {};
                var novoMarca = getInput("Nova marca: ");
                if (novoMarca)
                    novosDados.marca = novoMarca;
                var novoModelo = getInput("Novo modelo: ");
                if (novoModelo)
                    novosDados.modelo = novoModelo;
                var novoAnoInput = getInput("Novo ano: ");
                if (novoAnoInput)
                    novosDados.ano = parseInt(novoAnoInput);
                var novoPrecoInput = getInput("Novo preço: ");
                if (novoPrecoInput)
                    novosDados.preco = parseFloat(novoPrecoInput);
                repositorio.atualizar(modeloAtualizar, novosDados);
                break;
            case "8":
                var modeloRemover = getInput("Modelo do veículo a ser removido: ");
                repositorio.remover(modeloRemover);
                break;
            case "9":
                console.log("Obrigada por usar o ConSystem, até breve...");
                break;
            default:
                console.log("Opção inválida! Tente novamente.");
                break;
        }
    } while (opcao !== "9");
}
// Chamada da função menu
menu();
