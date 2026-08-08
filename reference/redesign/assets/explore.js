/* menu mobile */
var burger = document.getElementById('burger');
var menu = document.getElementById('menu-mobile');
if (burger && menu) {
  burger.addEventListener('click', function () {
    var aberto = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!aberto));
    burger.setAttribute('aria-label', aberto ? 'Abrir menu' : 'Fechar menu');
    menu.hidden = aberto;
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      burger.click(); burger.focus();
    }
  });
}

/* seleção de opção no formulário */
document.querySelectorAll('.ops').forEach(function (g) {
  g.setAttribute('role', 'radiogroup');
  g.querySelectorAll('.op').forEach(function (o) { o.setAttribute('role', 'radio'); o.setAttribute('aria-checked', 'false'); });
  g.addEventListener('click', function (e) {
    var b = e.target.closest('.op'); if (!b) return;
    g.querySelectorAll('.op').forEach(function (o) { o.classList.remove('sel'); o.setAttribute('aria-checked', 'false'); });
    b.classList.add('sel'); b.setAttribute('aria-checked', 'true');
    var av = g.parentElement.querySelector('.aviso'); if (av) av.classList.remove('on');
  });
});

/* etapas do formulário, com validação */
function vaiPara(n) {
  document.querySelectorAll('.etapa').forEach(function (s) { s.classList.toggle('on', s.dataset.e === String(n)); });
  document.querySelectorAll('.barra i').forEach(function (i) { i.classList.toggle('on', Number(i.dataset.b) <= n); });
  var atual = document.querySelector('.etapa.on h3'); if (atual) atual.setAttribute('tabindex', '-1'), atual.focus();
}
document.querySelectorAll('[data-prox]').forEach(function (b) {
  b.addEventListener('click', function () {
    var etapa = b.closest('.etapa');
    var grupo = etapa.querySelector('.ops');
    if (grupo && !grupo.querySelector('.op.sel')) {
      var av = etapa.querySelector('.aviso');
      if (av) av.classList.add('on');
      return;
    }
    vaiPara(Number(b.dataset.prox));
  });
});
document.querySelectorAll('[data-volta]').forEach(function (b) {
  b.addEventListener('click', function () { vaiPara(Number(b.dataset.volta)); });
});
var envia = document.getElementById('enviar');
if (envia) {
  envia.addEventListener('click', function () {
    var etapa = envia.closest('.etapa');
    var grupo = etapa.querySelector('.ops');
    var vazio = etapa.querySelectorAll('input[required], input');
    if (grupo && !grupo.querySelector('.op.sel')) {
      etapa.querySelector('.aviso').classList.add('on'); return;
    }
    var faltando = Array.prototype.filter.call(vazio, function (i) { return !i.value.trim(); });
    if (faltando.length) {
      etapa.querySelector('.aviso').classList.add('on');
      faltando[0].focus(); return;
    }
    document.querySelectorAll('.etapa').forEach(function (s) { s.classList.remove('on'); });
    var barra = document.querySelector('.barra'); if (barra) barra.style.display = 'none';
    document.getElementById('pronto').classList.add('on');
  });
}

/* faq */
document.querySelectorAll('.faq-cab').forEach(function (c) {
  c.setAttribute('aria-expanded', c.parentElement.classList.contains('aberto') ? 'true' : 'false');
  c.addEventListener('click', function () {
    var aberto = c.parentElement.classList.toggle('aberto');
    c.setAttribute('aria-expanded', String(aberto));
  });
});

/* filtros */
document.querySelectorAll('.filtros').forEach(function (g) {
  g.addEventListener('click', function (e) {
    var f = e.target.closest('.filtro'); if (!f) return;
    g.querySelectorAll('.filtro').forEach(function (x) { x.classList.remove('on'); x.setAttribute('aria-pressed', 'false'); });
    f.classList.add('on'); f.setAttribute('aria-pressed', 'true');
    var alvo = f.dataset.filtro;
    document.querySelectorAll('[data-setor]').forEach(function (el) {
      el.style.display = (!alvo || alvo === 'todos' || el.dataset.setor === alvo) ? '' : 'none';
    });
  });
});
