// Array delle lattine con tutti i 49 record
const cans = [
  {"id":1, "name":"Cryo Original", "region":"Eidos 7", "collected":false},
  {"id":25, "name":"Elixir Carrot", "region":"Eidos 7", "collected":false},
  {"id":33, "name":"Potential Blast", "region":"Eidos 7", "collected":false},
  {"id":3, "name":"Pixie", "region":"Xion", "collected":false},
  {"id":9, "name":"The Machinetta Americano", "region":"Xion", "collected":false},
  {"id":11, "name":"The Machinetta Caramel Macchiato", "region":"Xion", "collected":false},
  {"id":19, "name":"GrainT Oolong", "region":"Xion", "collected":false},
  {"id":27, "name":"Behemoth Red", "region":"Xion", "collected":false},
  {"id":36, "name":"Dionysus C", "region":"Xion", "collected":false},
  {"id":39, "name":"Mountain Sparkle Mont Blanc", "region":"Xion", "collected":false},
  {"id":45, "name":"Bayern Weissbier Dunkel", "region":"Xion", "collected":false},
  {"id":2, "name":"Cryo Zero", "region":"Wasteland", "collected":false},
  {"id":4, "name":"Pixie Zero", "region":"Wasteland", "collected":false},
  {"id":10, "name":"The Machinetta Cafe Latte", "region":"Wasteland", "collected":false},
  {"id":12, "name":"Cryo Cafe Original", "region":"Wasteland", "collected":false},
  {"id":17, "name":"The Haven Green Tea", "region":"Wasteland", "collected":false},
  {"id":18, "name":"GrainT Barley", "region":"Wasteland", "collected":false},
  {"id":20, "name":"GrainT Corn", "region":"Wasteland", "collected":false},
  {"id":21, "name":"Nectar Orange", "region":"Wasteland", "collected":false},
  {"id":26, "name":"Elixir Green", "region":"Wasteland", "collected":false},
  {"id":28, "name":"Behemoth Green", "region":"Wasteland", "collected":false},
  {"id":34, "name":"Potential Tempest", "region":"Wasteland", "collected":false},
  {"id":41, "name":"Mountain Sparkle Halla", "region":"Wasteland", "collected":false},
  {"id":42, "name":"Cryo the Clear", "region":"Wasteland", "collected":false},
  {"id":44, "name":"Bayern Hefe Weissbier", "region":"Wasteland", "collected":false},
  {"id":46, "name":"Corsair Lager", "region":"Wasteland", "collected":false},
  {"id":5, "name":"Newfoundland Dry", "region":"Matrix 11", "collected":false},
  {"id":13, "name":"Cryo Cafe Vanilla", "region":"Matrix 11", "collected":false},
  {"id":47, "name":"Corsair Ale", "region":"Matrix 11", "collected":false},
  {"id":6, "name":"Newfoundland Dry Zero", "region":"Great Desert", "collected":false},
  {"id":8, "name":"Milky Pop Zero", "region":"Great Desert", "collected":false},
  {"id":14, "name":"Cryo Cafe Mocha", "region":"Great Desert", "collected":false},
  {"id":15, "name":"The Haven Earl Grey", "region":"Great Desert", "collected":false},
  {"id":16, "name":"The Haven Milk Tea", "region":"Great Desert", "collected":false},
  {"id":22, "name":"Nectar Grape", "region":"Great Desert", "collected":false},
  {"id":24, "name":"Nectar Cranberry", "region":"Great Desert", "collected":false},
  {"id":29, "name":"Behemoth Black", "region":"Great Desert", "collected":false},
  {"id":30, "name":"Liquid Fire", "region":"Great Desert", "collected":false},
  {"id":32, "name":"Liquid Nuclear", "region":"Great Desert", "collected":false},
  {"id":35, "name":"Potential Frost", "region":"Great Desert", "collected":false},
  {"id":38, "name":"Starwell", "region":"Great Desert", "collected":false},
  {"id":40, "name":"Mountain Sparkle Everest", "region":"Great Desert", "collected":false},
  {"id":43, "name":"Cryo the Malt", "region":"Great Desert", "collected":false},
  {"id":48, "name":"Johnson's Highball Lemon", "region":"Great Desert", "collected":false},
  {"id":49, "name":"Johnson's Highball Ginger", "region":"Great Desert", "collected":false},
  {"id":7, "name":"Milky Pop", "region":"Spire 4", "collected":false},
  {"id":23, "name":"Nectar Apple", "region":"Spire 4", "collected":false},
  {"id":31, "name":"Liquid Lightning", "region":"Spire 4", "collected":false},
  {"id":37, "name":"Moonwell", "region":"Spire 4", "collected":false}
];

// Stato dell'applicazione
let currentFilter = 'all';
let filteredCans = [...cans];

// Elementi DOM
const cansGrid = document.getElementById('cans-grid');
const collectedCount = document.getElementById('collected-count');
const visibleCount = document.getElementById('visible-count');
const filterTitle = document.getElementById('filter-title');
const filterButtons = document.querySelectorAll('.filter-btn');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

// Funzione per renderizzare le card delle lattine
function renderCans(cansToRender = filteredCans) {
  cansGrid.innerHTML = '';
  
  cansToRender.forEach(can => {
    const cardElement = document.createElement('div');
    cardElement.className = `can-card ${can.collected ? 'collected' : ''}`;
    cardElement.innerHTML = `
      <div class="can-name">${can.name}</div>
      <div class="can-region">${can.region}</div>
      <div class="can-checkbox">
        <input type="checkbox" id="can-${can.id}" ${can.collected ? 'checked' : ''}>
        <label for="can-${can.id}">Raccolta</label>
      </div>
    `;
    
    // Aggiungere event listener al checkbox
    const checkbox = cardElement.querySelector(`#can-${can.id}`);
    checkbox.addEventListener('change', (e) => handleCheckboxChange(can.id, e.target.checked));
    
    cansGrid.appendChild(cardElement);
  });
  
  updateCounters();
}

// Funzione per gestire il cambio di stato del checkbox
function handleCheckboxChange(canId, isChecked) {
  const canIndex = cans.findIndex(can => can.id === canId);
  if (canIndex !== -1) {
    cans[canIndex].collected = isChecked;
    
    // Aggiornare la card visivamente
    const cardElement = document.querySelector(`#can-${canId}`).closest('.can-card');
    if (isChecked) {
      cardElement.classList.add('collected');
    } else {
      cardElement.classList.remove('collected');
    }
    
    updateCounters();
  }
}

// Funzione per aggiornare i contatori
function updateCounters() {
  const totalCollected = cans.filter(can => can.collected).length;
  const visibleCans = filteredCans.length;
  
  collectedCount.textContent = totalCollected;
  visibleCount.textContent = visibleCans;
}

// Funzione per filtrare le lattine per regione
function filterCansByRegion(region) {
  currentFilter = region;
  
  if (region === 'all') {
    filteredCans = [...cans];
    filterTitle.textContent = 'Tutte le lattine';
  } else {
    filteredCans = cans.filter(can => can.region === region);
    filterTitle.textContent = `Lattine - ${region}`;
  }
  
  renderCans(filteredCans);
}

// Funzione per gestire il toggle del menu mobile
function toggleMenu() {
  sidebar.classList.toggle('open');
  menuToggle.classList.toggle('active');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Renderizzare inizialmente tutte le lattine
  renderCans();
  
  // Event listeners per i filtri
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const region = this.dataset.region;
      
      // Aggiornare stato attivo del pulsante
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filtrare le lattine
      filterCansByRegion(region);
      
      // Chiudere il menu su mobile dopo la selezione
      if (window.innerWidth < 1024) {
        sidebar.classList.remove('open');
        menuToggle.classList.remove('active');
      }
    });
  });
  
  // Event listener per il toggle del menu
  menuToggle.addEventListener('click', toggleMenu);
  
  // Chiudere il menu quando si clicca fuori su mobile
  document.addEventListener('click', function(e) {
    if (window.innerWidth < 1024 && 
        !sidebar.contains(e.target) && 
        !menuToggle.contains(e.target) && 
        sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
      menuToggle.classList.remove('active');
    }
  });
  
  // Gestire il ridimensionamento della finestra
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 1024) {
      sidebar.classList.remove('open');
      menuToggle.classList.remove('active');
    }
  });
});

// Funzioni di utilità per debugging (opzionali)
function resetAllCans() {
  cans.forEach(can => can.collected = false);
  renderCans();
}

function collectAllCans() {
  cans.forEach(can => can.collected = true);
  renderCans();
}

function getCollectionStats() {
  const stats = {};
  const regions = [...new Set(cans.map(can => can.region))];
  
  regions.forEach(region => {
    const regionCans = cans.filter(can => can.region === region);
    const collected = regionCans.filter(can => can.collected).length;
    stats[region] = {
      total: regionCans.length,
      collected: collected,
      percentage: Math.round((collected / regionCans.length) * 100)
    };
  });
  
  return stats;
}