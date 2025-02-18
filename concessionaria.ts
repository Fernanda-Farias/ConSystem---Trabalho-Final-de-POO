// Importação do módulo prompt-sync
import * as promptSync from "prompt-sync";

//Variável que armazena a função promptSync
const getInput = promptSync();

//Interface para CRUD de veículos
interface IVeiculoCRUD {
    adicionar(veiculo: Veiculo): void;
    listar(): void;
    buscarPorModelo(modelo: string): Veiculo | undefined;
    buscarPorMarca(marca: string): Veiculo[];
    buscarPorPreco(min: number, max: number): Veiculo[];
    atualizar(modelo: string, novosDados: Partial<Veiculo>): void;
    remover(modelo: string): void;
}

//Classe abstrata Veiculo
abstract class Veiculo {
    constructor(
        private _marca: string,
        private _modelo: string,
        private _ano: number,
        private _preco: number
    ) {}

//Função para obter a marca do veículo
    get marca(): string {
        return this._marca;
    }

//Função para definir a marca do veículo
    set marca(value: string) {
        if (!value) throw new Error("Marca não pode ser vazia.");
        this._marca = value;
    }

//Função para obter o modelo do veículo
    get modelo(): string {
        return this._modelo;
    }

//Função para definir o modelo do veículo
    set modelo(value: string) {
        if (!value) throw new Error("Modelo não pode ser vazio.");
        this._modelo = value;
    }

//Função para obter o ano do veículo
    get ano(): number {
        return this._ano;
    }

//Função para definir o ano do veículo
    set ano(value: number) {
        if (value < 1886 || value > new Date().getFullYear())
            throw new Error("Ano inválido.");
        this._ano = value;
    }

//Função para obter o preço do veículo
    get preco(): number {
        return this._preco;
    }

//Função para definir o preço do veículo
    set preco(value: number) {
        if (value <= 0) throw new Error("Preço deve ser maior que zero.");
        this._preco = value;
    }

//Função abstrata para exibir informações do veículo
    abstract exibirInformacoes(): void;
}

//Classe Carro que herda de Veiculo
class Carro extends Veiculo {
    constructor(marca: string, modelo: string, ano: number, preco: number, private _portas: number) {
        super(marca, modelo, ano, preco);
        this.portas = _portas;
    }

//Função para obter o número de portas do carro
    get portas(): number {
        return this._portas;
    }

//Função para definir o número de portas do carro
    set portas(value: number) {
        if (value < 2) throw new Error("O carro deve ter pelo menos 2 portas.");
        this._portas = value;
    }

//Função para exibir informações do carro
    exibirInformacoes(): void {
        console.log(`Carro: ${this.marca} ${this.modelo}, ${this.ano}, R$${this.preco}, ${this.portas} portas.`);
    }
}

//Classe Moto que herda de Veiculo
class Moto extends Veiculo {
    constructor(marca: string, modelo: string, ano: number, preco: number, private _cilindrada: number) {
        super(marca, modelo, ano, preco);
        this.cilindrada = _cilindrada;
    }

//Função para obter a cilindrada da moto
    get cilindrada(): number {
        return this._cilindrada;
    }

//Função para definir a cilindrada da moto
    set cilindrada(value: number) {
        if (value <= 0) throw new Error("Cilindrada deve ser maior que zero.");
        this._cilindrada = value;
    }

//Função para exibir informações da moto
    exibirInformacoes(): void {
        console.log(`Moto: ${this.marca} ${this.modelo}, ${this.ano}, R$${this.preco}, ${this.cilindrada}cc.`);
    }
}

//Classe que implementa a interface IVeiculoCRUD
class VeiculoRepositorio implements IVeiculoCRUD {
    private veiculos: Veiculo[] = [];

//Função para adicionar veículos
    adicionar(veiculo: Veiculo): void {
        this.veiculos.push(veiculo);
        console.log("Veículo adicionado com sucesso!");
    }

//Função para listar veículos
    listar(): void {
        if (this.veiculos.length === 0) {
            console.log("Nenhum veículo cadastrado.");
            return;
        }
        this.veiculos.forEach(veiculo => veiculo.exibirInformacoes());
    }

//Função para buscar veículos por modelo
    buscarPorModelo(modelo: string): Veiculo | undefined {
        return this.veiculos.find(v => v.modelo.toLowerCase() === modelo.toLowerCase());
    }

//Função para buscar veículos por marca
    buscarPorMarca(marca: string): Veiculo[] {
        return this.veiculos.filter(v => v.marca.toLowerCase() === marca.toLowerCase());
    }

//Função para buscar veículos por preço
    buscarPorPreco(min: number, max: number): Veiculo[] {
        return this.veiculos.filter(v => v.preco >= min && v.preco <= max);
    }

//Função para ordenar veículos por preço
    ordenarPorPreco(): void {
        this.veiculos.sort((a, b) => a.preco - b.preco);
    }

//Função para atualizar veículo
    atualizar(modelo: string, novosDados: Partial<Veiculo>): void {
        const veiculo = this.buscarPorModelo(modelo);
        if (!veiculo) {
            console.log("Veículo não encontrado.");
            return;
        }

        if (novosDados.marca) veiculo.marca = novosDados.marca;
        if (novosDados.modelo) veiculo.modelo = novosDados.modelo;
        if (novosDados.ano !== undefined) veiculo.ano = novosDados.ano;
        if (novosDados.preco !== undefined) veiculo.preco = novosDados.preco;

        console.log("Veículo atualizado com sucesso!");
    }

//Função para remover veículo
    remover(modelo: string): void {
        const index = this.veiculos.findIndex(veiculo => veiculo.modelo.toLowerCase() === modelo.toLowerCase());
        if (index === -1) {
            console.log("Veículo não encontrado.");
            return;
        }
        this.veiculos.splice(index, 1);
        console.log("Veículo removido com sucesso!");
    }
}

//Variável que armazena o repositório de veículos
const repositorio = new VeiculoRepositorio();
console.log("------Bem-vindo ao ConSystem, o melhor Sistema para Concessionárias!------");

// Função principal que exibe o menu e interage com o usuário
function menu(): void {
    let opcao: string;
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
                    const marca = getInput("Marca: ");
                    const modelo = getInput("Modelo: ");
                    const anoInput = getInput("Ano: ");
                    const ano = anoInput ? parseInt(anoInput) : 0;
                    const precoInput = getInput("Preço: ");
                    const preco = precoInput ? parseFloat(precoInput) : 0;
                    const tipo = getInput("Tipo (Carro/Moto): ");
        
                    if (tipo.toLowerCase() === "carro") {
                        const portasInput = getInput("Número de portas: ");
                        const portas = portasInput ? parseInt(portasInput) : 0;
                        repositorio.adicionar(new Carro(marca, modelo, ano, preco, portas));
                    } else {
                        const cilindradasInput = getInput("Cilindradas: ");
                        const cilindradas = cilindradasInput ? parseInt(cilindradasInput) : 0;
                        repositorio.adicionar(new Moto(marca, modelo, ano, preco, cilindradas));
                    }
                } catch (error) {
                    console.log("Erro ao adicionar veículo: ", error.message);
                }
                break;
            case "2":
                repositorio.listar();
                break;
            case "3":
                const modeloBusca = getInput("Modelo: ");
                const veiculo = repositorio.buscarPorModelo(modeloBusca);
                veiculo ? veiculo.exibirInformacoes() : console.log("Veículo não encontrado.");
                break;
            case "4":
                const marcaBusca = getInput("Marca: ");
                repositorio.buscarPorMarca(marcaBusca).forEach(v => v.exibirInformacoes());
                break;
            case "5":
                const minInput = getInput("Preço mínimo: ");
                const min = minInput ? parseFloat(minInput) : 0;
                const maxInput = getInput("Preço máximo: ");
                const max = maxInput ? parseFloat(maxInput) : Infinity;
                repositorio.buscarPorPreco(min, max).forEach(v => v.exibirInformacoes());
                break;
            case "6":
                repositorio.ordenarPorPreco();
                repositorio.listar();
                break;
            case "7":
                const modeloAtualizar = getInput("Modelo do veículo a ser atualizado: ");
                const novosDados: Partial<Veiculo> = {};
                const novoMarca = getInput("Nova marca: ");
                if (novoMarca) novosDados.marca = novoMarca;
                const novoModelo = getInput("Novo modelo: ");
                if (novoModelo) novosDados.modelo = novoModelo;
                const novoAnoInput = getInput("Novo ano: ");
                if (novoAnoInput) novosDados.ano = parseInt(novoAnoInput);
                const novoPrecoInput = getInput("Novo preço: ");
                if (novoPrecoInput) novosDados.preco = parseFloat(novoPrecoInput);
                repositorio.atualizar(modeloAtualizar, novosDados);
                break;
            case "8":
                const modeloRemover = getInput("Modelo do veículo a ser removido: ");
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
