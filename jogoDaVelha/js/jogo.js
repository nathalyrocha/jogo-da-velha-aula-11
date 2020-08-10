var rodada = 1;
var matrizJogo = Array(3); // [[a1, a2, a3], [b1, b2, b3], [c1, c2, c3]]

matrizJogo["a"] = Array(3);
matrizJogo["b"] = Array(3);
matrizJogo["c"] = Array(3);

matrizJogo["a"][1] = 0;
matrizJogo["a"][2] = 0;
matrizJogo["a"][3] = 0;

matrizJogo["b"][1] = 0;
matrizJogo["b"][2] = 0;
matrizJogo["b"][3] = 0;

matrizJogo["c"][1] = 0;
matrizJogo["c"][2] = 0;
matrizJogo["c"][3] = 0;


$(document).ready(function(){
  
  // Validar a digitação dos apelidos dos jogadores
  $("#btn-iniciar-jogo").click(function(){

    if($("#apelido-jogador-1").val() == "") {
      alert("Apelido do jogador 1 não foi preenchido");
      return false;
    }

    if($("#apelido-jogador-2").val() == "") {
      alert("Apelido do jogador 2 não foi preenchido");
      return false;
    }

    // Exibir os apelidos, criar os spans
    $("#nome-jogador-1").html($("#apelido-jogador-1").val());
    $("#nome-jogador-2").html($("#apelido-jogador-2").val());

    // Controlar visualização das divs
    $("#pagina-inicial").hide();
    $("#palco-do-jogo").show();
  });

  // Adicionar class jogada em cada div do jogo

  $(".jogada").click(function() {

    // Criar id em cada div do jogo
    var idCampoClicado = this.id;

    $("#"+idCampoClicado).off();

    jogada(idCampoClicado);
  });

  function jogada(id) {

    // Criar variável rodada
    var icone = '';
    var ponto = 0;

    // A cada rodada verifica que jogador está jogando (par ou ímpar)
    if((rodada % 2) == 1) {
      icone = 'url("../imagens/marcacao_1.png")';
      ponto = -1;

    } else {
      icone = 'url("../imagens/marcacao_2.png")';
      ponto = 1;
    }

    rodada++;

    $("#"+id).css("background-image", icone);

    // Criar arrays globalmente
    // Quebrar o id para pegar linha e coluna
    var linhaColuna = id.split("-");

    matrizJogo[linhaColuna[0]][linhaColuna[1]] = ponto;

    // Verifica se houve vencedor
    verificaCombinacao();
  }

  function verificaCombinacao() {
    // Verifica na horizontal linha A
    var pontos = 0;

    for(var i = 1; i <= 3; i++) {
      pontos = pontos + matrizJogo["a"][i];
    }
    ganhador(pontos);

    // Verifica na horizontal linha B
    var pontos = 0;

    for(var i = 1; i <= 3; i++) {
      pontos = pontos + matrizJogo["b"][i];
    }
    ganhador(pontos);

    // Verifica na horizontal linha C
    var pontos = 0;

    for(var i = 1; i <= 3; i++) {
      pontos = pontos + matrizJogo["c"][i];
    }
    ganhador(pontos);

    // Verifica na vertical linha A
    for(var l = 1; l <= 3; l++) {
      pontos = 0;
      pontos += matrizJogo["a"][l];
      pontos += matrizJogo["b"][l];
      pontos += matrizJogo["c"][l];

      ganhador(pontos);
    }
    
    // Verifica na diagonal
    pontos = 0;
    pontos = matrizJogo["a"][1] + matrizJogo[ "b"][2] + matrizJogo["c"][3];
    ganhador(pontos);

    pontos = 0;
    pontos = matrizJogo["a"][3] + matrizJogo[ "b"][2] + matrizJogo["c"][1];
    ganhador(pontos);
  }

  function ganhador(pontos){
    if(pontos == -3){
      var jogada1 = $('#apelido-jogador-1').val();

      alert(jogada1 + ' é o vencedor');
      $('.jogada').off();

    } else if(pontos == 3){
      var jogada2 = $('#apelido-jogador-2').val();

      alert(jogada2 + ' é o vencedor');
      $('.jogada').off();
    }
  }
});