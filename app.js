/* ============================================================
   APP.JS — Guía Interactiva de Cintas del Violín · Musicala
   ============================================================ */

// Selección rápida de elementos
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

// Referencias del DOM
const scaleInput = $('#scaleLength');
const fb = $('#fingerboard');
const cmCellsBody = $('#cmTable');

// Definición de las cintas sobre la cuerda de La (A)
const TAPES = [
  { label: '1ª cinta', note: 'Si',   semis: 2, sel: '.tape.t1' },
  { label: '2ª cinta', note: 'Do♯',  semis: 4, sel: '.tape.t2' },
  { label: '3ª cinta', note: 'Re',   semis: 5, sel: '.tape.t3' },
  { label: '4ª cinta', note: 'Mi',   semis: 7, sel: '.tape.t4' }
];

// Fórmula para calcular distancia (en cm) desde la cejilla
// usando temperamento igual
function cmForSemis(L, n) {
  return L - (L / Math.pow(2, n / 12));
}

// Render principal
function render() {
  const L = parseFloat(scaleInput.value) || 32.5;

  TAPES.forEach(t => {
    const cm = cmForSemis(L, t.semis);
    const g = fb.querySelector(t.sel);
    const textCm = g.querySelector('text.cm');
    const bar = g.querySelector('rect.bar');
    const textPill = g.querySelector('text.pill');
    const textNote = g.querySelector('text.note');

    // Actualiza el texto de medida
    textCm.textContent = `${cm.toFixed(1)} cm`;

    // Calcula posición vertical (y)
    const y = 60 + (cm / L) * 430;

    // Movimiento suave gracias a CSS transition
    bar.setAttribute('y', y);
    textPill.setAttribute('y', y - 8);
    textNote.setAttribute('y', y + 24);
    textCm.setAttribute('y', y - 8);
  });

  // Actualiza la tabla
  cmCellsBody.innerHTML = TAPES.map(t => {
    const cm = cmForSemis(L, t.semis).toFixed(1);
    return `
      <tr>
        <td>${t.label}</td>
        <td>${t.note}</td>
        <td style="text-align:center">${t.semis}</td>
        <td style="font-weight:600">${cm}</td>
      </tr>
    `;
  }).join('');
}

// Evento: cuando cambia la longitud
scaleInput.addEventListener('input', render);

// Interacciones visuales al pasar el cursor
$$('g.tape').forEach(g => {
  g.addEventListener('mouseenter', () => {
    g.querySelector('rect.bar').style.opacity = '0.85';
    g.querySelector('text.note').style.fill = '#fffbe8';
  });
  g.addEventListener('mouseleave', () => {
    g.querySelector('rect.bar').style.opacity = '1';
    g.querySelector('text.note').style.fill = '#ffffff';
  });
});

// Inicialización
render();
