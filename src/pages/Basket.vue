<template>
  <section id="body-basket">
    <header id="header-basket">
      <div>
        <a class="iconarrowback" href="/digital-menu/#/"> <ArrowBackIcon /></a>
        <h1>Cesta de compras <BasketIcon /></h1>
      </div>
      <nav>
        <ul>
          <li
            :class="{ active: abaAtiva === 'cesta' }"
            @click="abaAtiva = 'cesta'"
          >
            Cesta ({{ volume }})
          </li>
          <li
            :class="{ active: abaAtiva === 'sobre' }"
            @click="abaAtiva = 'sobre'"
          >
            Sobre Nos
          </li>
        </ul>
      </nav>
    </header>

    <!-- CONTEUDO DA CESTA -->
    <main v-if="abaAtiva === 'cesta'">
      <button class="btn-clear" @click="removeAll">Limpar</button>

      <ul v-if="volume" class="items-list">
        <li v-for="item in shoppingBasket" :key="item[0]">
          <div class="item-row">
            <span class="trash-icon" @click="removeItem(item[0])">
              <TrashIcon />
            </span>
            <h2>{{ item[0] }}</h2>
            <span class="item-qty">x{{ item[1].quantity }}</span>
            <span class="item-price"
              >R$ {{ (item[1].item.preco * item[1].quantity).toFixed(2) }}</span
            >
          </div>
          <hr />
        </li>
      </ul>

      <div v-if="volume" class="total-section">
        <strong>Total:</strong>
        <span>R$ {{ totalPrice.toFixed(2) }}</span>
      </div>

      <div v-if="volume" class="delivery-form">
        <h3>Dados para Entrega</h3>

        <div class="form-group">
          <label for="nome">Seu Nome *</label>
          <input
            type="text"
            id="nome"
            v-model="nome"
            placeholder="Digite seu nome"
          />
        </div>

        <div class="form-group">
          <label for="endereco">Endereco *</label>
          <input
            type="text"
            id="endereco"
            v-model="endereco"
            placeholder="Rua, numero, bairro"
          />
        </div>

        <div class="form-group">
          <label for="referencia">Ponto de Referencia</label>
          <input
            type="text"
            id="referencia"
            v-model="pontoReferencia"
            placeholder="Proximo a..."
          />
        </div>

        <div class="form-group">
          <label for="pagamento">Forma de Pagamento *</label>
          <select id="pagamento" v-model="formaPagamento">
            <option value="">Selecione...</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="PIX">PIX</option>
            <option value="Cartao de Credito">Cartao de Credito</option>
            <option value="Cartao de Debito">Cartao de Debito</option>
          </select>
        </div>

        <div class="form-group" v-if="formaPagamento === 'Dinheiro'">
          <label for="troco">Troco para:</label>
          <input
            type="text"
            id="troco"
            v-model="trocoPara"
            placeholder="Ex: R$ 50,00"
          />
        </div>
      </div>

      <div v-if="!volume" class="empty-message">
        <h3>A sua cesta esta vazia</h3>
        <h5>Adicione seu lanche favorito aqui!</h5>
      </div>

      <span
        v-show="volume && podeEnviar"
        id="send-request"
        @click="enviarPedido"
      >
        <SendIcon />
      </span>

      <div v-if="volume && !podeEnviar" class="aviso">
        Preencha nome, endereco e forma de pagamento para enviar
      </div>
    </main>

    <!-- CONTEUDO SOBRE NOS -->
    <main v-if="abaAtiva === 'sobre'" class="sobre-nos">
      <figure class="foto-local">
        <a href="https://ibb.co/gZ2bzfpJ"
          ><img
            src="https://i.ibb.co/HTSLnbsq/local-pizza.jpg"
            alt="local-pizza"
            border="0"
        /></a>
      </figure>

      <div class="info-empresa">
        <h2>Pizzaria Sabor Real</h2>

        <div class="info-item">
          <strong>Endereco</strong>
          <span>Rua Mateus de Vasconcelos, n 41</span>
        </div>

        <div class="info-item">
          <strong>Email</strong>
          <span>SaborReal2026@Gmail.com</span>
        </div>

        <div class="info-item">
          <strong>WhatsApp</strong>
          <a :href="'https://wa.me/' + phone">(31) 9731-1561</a>
        </div>

        <div class="info-item">
          <strong>Instagram</strong>
          <a :href="instagram" target="_blank">@pizzariasabor.real._</a>
        </div>

        <div class="info-item">
          <strong>Formas de Pagamento</strong>
          <span>Dinheiro, PIX, Cartao de Credito, Cartao de Debito</span>
        </div>

        <div class="info-item">
          <strong>Horario de Funcionamento</strong>
          <span>Segunda a Domingo: 18:00 - 23:00</span>
        </div>
      </div>
      <button class="btn-info" @click="mostrarInfo = !mostrarInfo">
        Informações
      </button>

      <div v-if="mostrarInfo" class="info-box">
        <h2>INFORMAÇÕES OPERACIONAIS</h2>

        <p>
          <strong>Separação dos Produtos:</strong><br />
          Os pedidos são organizados conforme os itens escolhidos pelo cliente.
          Os ingredientes são previamente armazenados e separados de forma
          padronizada, garantindo qualidade e agilidade.
        </p>

        <p>
          <strong>Preparo:</strong><br />
          Após a separação, as pizzas são montadas e levadas ao forno
          industrial, com controle de tempo e temperatura.
        </p>

        <p>
          <strong>Embalagem:</strong><br />
          As pizzas são acondicionadas em caixas térmicas de papelão, mantendo a
          temperatura e qualidade até a entrega.
        </p>

        <p>
          <strong>Emissão de Nota Fiscal:</strong><br />
          A nota fiscal é emitida digitalmente antes da saída do pedido,
          garantindo regularização da venda.
        </p>

        <p>
          <strong>Entrega:</strong><br />
          As entregas são organizadas por região, reduzindo custos com
          combustível e tempo de entrega.
        </p>

        <hr />

        <h2>DESPESAS FIXAS MENSAIS</h2>

        <p>Aluguel: R$ 1.500</p>
        <p>Energia: R$ 800</p>
        <p>Água: R$ 200</p>
        <p>Internet: R$ 100</p>
        <p>Sistema de nota fiscal: R$ 80</p>
        <p>Marketing: R$ 300</p>

        <p><strong>Total Fixas: R$ 2.980/mês</strong></p>

        <hr />

        <h2>DESPESAS VARIÁVEIS MENSAIS</h2>
        <h2>INSUMOS COMPLETOS</h2>

        <p>Molho de tomate (Pomarola): R$ 160</p>
        <p>Muçarela (Tirolez/Italac): R$ 992</p>
        <p>Calabresa (Seara/Perdigão): R$ 336</p>
        <p>Frango desfiado (Sadia/Seara): R$ 162</p>
        <p>Presunto (Seara/Perdigão): R$ 280</p>
        <p>Bacon (Seara): R$ 210</p>
        <p>Catupiry (Catupiry Original): R$ 350</p>
        <p>Cheddar (Polenghi): R$ 220</p>
        <p>Queijo prato (Italac): R$ 260</p>
        <p>Parmesão ralado (Faixa Azul): R$ 140</p>

        <p>Milho (Quero): R$ 90</p>
        <p>Ervilha (Quero): R$ 70</p>
        <p>Azeitona (Raiola): R$ 150</p>
        <p>Palmito (Olé): R$ 190</p>
        <p>Champignon (Quero): R$ 150</p>

        <p>Cebola: R$ 80</p>
        <p>Tomate: R$ 120</p>
        <p>Pimentão: R$ 90</p>
        <p>Alho: R$ 60</p>
        <p>Manjericão: R$ 50</p>
        <p>Rúcula: R$ 70</p>
        <p>Alface: R$ 65</p>

        <p>Ovos: R$ 90</p>
        <p>Carne moída: R$ 300</p>
        <p>Linguiça toscana (Seara): R$ 220</p>
        <p>Atum (Gomes da Costa): R$ 280</p>

        <p>Batata palha (Yoki): R$ 110</p>

        <p>Molho barbecue (Heinz): R$ 120</p>
        <p>Ketchup (Heinz): R$ 130</p>
        <p>Mostarda (Heinz): R$ 100</p>
        <p>Molho de pimenta (Tabasco): R$ 90</p>

        <p>Requeijão (Vigor): R$ 180</p>
        <p>Creme de leite (Nestlé): R$ 180</p>
        <p>Leite (Itambé): R$ 200</p>

        <p>Farinha de trigo (Dona Benta): R$ 235</p>
        <p>Fermento (Fleischmann): R$ 20</p>
        <p>Azeite (Gallo): R$ 90</p>
        <p>Orégano: R$ 40</p>
        <p>Sal: R$ 20</p>

        <p><strong>Total geral estimado dos insumos: R$ 3.700/mês</strong></p>

        <hr />

        <h2>RESUMO FINANCEIRO</h2>

        <p>
          <strong>Total de gastos mensais:</strong><br />
          R$ 6.099
        </p>

        <p>
          <strong>Produção:</strong><br />
          312 pizzas/mês (12 por dia)
        </p>

        <p>
          <strong>Preço médio:</strong><br />
          R$ 35 por pizza
        </p>

        <p>
          <strong>Faturamento mensal:</strong><br />
          R$ 10.920
        </p>

        <p>
          <strong>Lucro estimado:</strong><br />
          R$ 4.821/mês
        </p>

        <hr />

        <h2>DIVISÃO ENTRE OS 7 MEMBROS</h2>

        <p><strong>Investimento inicial total:</strong> R$ 30.000</p>
        <p><strong>Cada membro investe:</strong> R$ 4.285</p>

        <p>
          <strong>Lucro por pessoa:</strong><br />
          Aproximadamente R$ 688/mês
        </p>

        <p>
          <strong>Retorno do investimento:</strong><br />
          Aproximadamente 6 meses para recuperar o valor investido
        </p>

        <p>
          <strong>Início do lucro real:</strong><br />
          A partir do 2º ao 3º mês, após estabilização das vendas
        </p>
      </div>
    </main>
  </section>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { ArrowBackIcon, BasketIcon, TrashIcon, SendIcon } from "@/icons";

export default {
  components: {
    ArrowBackIcon,
    BasketIcon,
    TrashIcon,
    SendIcon,
  },

  data() {
    return {
      abaAtiva: "cesta",
      nome: "",
      endereco: "",
      pontoReferencia: "",
      formaPagamento: "",
      trocoPara: "",
      mostrarInfo: false,
    };
  },

  computed: {
    ...mapState("shoppingBasket", ["shoppingBasket", "volume"]),
    ...mapState("statics", ["phone", "instagram"]),

    totalPrice() {
      let total = 0;
      this.shoppingBasket.forEach((value) => {
        total += parseFloat(value.item.preco) * value.quantity;
      });
      return total;
    },

    podeEnviar() {
      return this.nome && this.endereco && this.formaPagamento;
    },
  },

  methods: {
    ...mapActions("shoppingBasket", ["loadShoppingBasket"]),
    ...mapMutations("shoppingBasket", ["removeAll", "removeItem"]),

    enviarPedido() {
      let mensagem = "*NOVO PEDIDO - Pizzaria Sabor Real*\n\n";
      mensagem += "*Cliente:* " + this.nome + "\n\n";
      mensagem += "*Itens do Pedido:*\n";

      this.shoppingBasket.forEach((value, key) => {
        const subtotal = parseFloat(value.item.preco) * value.quantity;
        mensagem +=
          "- " +
          value.quantity +
          "x " +
          key +
          " - R$ " +
          subtotal.toFixed(2) +
          "\n";
      });

      mensagem += "\n*Total: R$ " + this.totalPrice.toFixed(2) + "*\n\n";
      mensagem += "*Dados de Entrega:*\n";
      mensagem += "Endereco: " + this.endereco + "\n";

      if (this.pontoReferencia) {
        mensagem += "Ponto de Referencia: " + this.pontoReferencia + "\n";
      }

      mensagem += "\n*Pagamento:* " + this.formaPagamento;

      if (this.formaPagamento === "Dinheiro" && this.trocoPara) {
        mensagem += " (Troco para: " + this.trocoPara + ")";
      }

      const numero = this.phone || "553197311561";
      const url =
        "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);
      window.open(url, "_blank");

      this.removeAll();
      this.nome = "";
      this.endereco = "";
      this.pontoReferencia = "";
      this.formaPagamento = "";
      this.trocoPara = "";
    },
  },

  async mounted() {
    try {
      await this.loadShoppingBasket();
    } catch (error) {
      console.log("Erro ao carregar carrinho:", error);
    }
  },
};
</script>

<style scoped>
.btn-info {
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  border: none;
  background: black;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.info-box {
  margin-top: 15px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 10px;
  font-size: 11pt;
  line-height: 1.5;
}
#body-basket {
  max-width: 1300px;
  margin: 0 auto;
  color: var(--_color_6);
  position: relative;
  display: grid;
  height: 100vh;
  grid-template-rows: 0.11fr 1fr;
  box-sizing: border-box;
}

#body-basket main {
  overflow-y: auto;
  padding: 15px;
  padding-bottom: 100px;
}

#header-basket {
  color: var(--_color_0);
  background: var(--_color_2);
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: repeat(2, auto);
}

#header-basket div {
  display: flex;
  height: 90px;
  align-items: center;
  padding: 5px;
  border-bottom: 2px dashed var(--_color_4);
}

#header-basket div h1 {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
}

#header-basket div h1 svg {
  margin-left: 10px;
  font-size: 20pt;
}

#header-basket nav ul {
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
}

#header-basket nav ul li {
  padding: 10px 20px;
  border-radius: 5px;
  transition: 0.2s;
}

#header-basket nav ul li:hover {
  background: rgba(255, 255, 255, 0.1);
}

#header-basket nav ul li.active {
  background: rgba(255, 255, 255, 0.2);
  font-weight: bold;
}

.btn-clear {
  padding: 10px 20px;
  border: 2px solid var(--_color_6);
  background: transparent;
  color: var(--_color_6);
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 15px;
}

.btn-clear:hover {
  background: var(--_color_6);
  color: var(--_color_0);
}

.items-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.items-list li {
  position: relative;
  padding: 10px 0;
}

.item-row {
  display: flex;
  align-items: center;
  gap: 15px;
}

.item-row h2 {
  flex: 1;
  font-size: 14pt;
}

.item-qty {
  font-family: monospace;
  color: var(--_color_6);
}

.item-price {
  font-family: monospace;
  font-weight: bold;
  color: var(--_color_2);
}

.trash-icon {
  cursor: pointer;
  color: #c00;
  font-size: 16pt;
  flex-shrink: 0;
}

.trash-icon:hover {
  color: #900;
}

.total-section {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  margin: 15px 0;
  border-top: 2px solid var(--_color_2);
  border-bottom: 2px solid var(--_color_2);
  font-size: 14pt;
}

.total-section span {
  font-family: monospace;
  font-weight: bold;
  color: var(--_color_2);
}

.delivery-form {
  background: rgba(0, 0, 0, 0.05);
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
}

.delivery-form h3 {
  margin: 0 0 20px 0;
  font-size: 14pt;
  color: var(--_color_6);
  font-family: "Lobster", cursive;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  font-size: 11pt;
  color: var(--_color_6);
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  font-size: 12pt;
  background: var(--_color_0);
  color: var(--_color_3);
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus {
  border-color: var(--_color_2);
  outline: none;
}

#send-request {
  cursor: pointer;
  height: 55px;
  width: 55px;
  position: fixed;
  right: 20px;
  bottom: 30px;
  font-size: 30pt;
  background: var(--_color_2);
  color: var(--_color_0);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

#send-request svg {
  padding-left: 5px;
}

.aviso {
  text-align: center;
  padding: 15px;
  margin-top: 20px;
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 8px;
  color: #856404;
  font-size: 11pt;
}

.empty-message {
  text-align: center;
  padding: 20% 20px;
}

.empty-message h3 {
  font-size: 28pt;
}

.empty-message h5 {
  margin-top: 20px;
  font-size: 14pt;
}

.iconarrowback {
  color: var(--_color_0);
  font-weight: bold;
  font-size: 25px;
}

/* ESTILOS SOBRE NOS */
.sobre-nos {
  padding: 20px;
}

.foto-local {
  margin: 0 0 20px 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.foto-local img {
  width: 100%;
  max-width: 1000px;

  max-height: auto;
  display: block;
}
.info-empresa {
  background: rgba(0, 0, 0, 0.05);
  padding: 20px;
  border-radius: 12px;
}

.info-empresa h2 {
  margin: 0 0 20px 0;
  font-family: "Lobster", cursive;
  font-size: 22pt;
  color: var(--_color_2);
  text-align: center;
}

.info-item {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.info-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.info-item strong {
  display: block;
  color: var(--_color_2);
  font-size: 10pt;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.info-item span,
.info-item a {
  color: var(--_color_3);
  font-size: 12pt;
}

.info-item a {
  color: var(--_color_2);
  text-decoration: none;
}

.info-item a:hover {
  text-decoration: underline;
}
</style>
