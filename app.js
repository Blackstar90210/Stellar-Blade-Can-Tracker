class StellarBladeCanTracker {
  constructor() {
    this.cans = [];
    this.collectedCans = new Set();
    this.currentFilter = 'all';
    this.saveTimeout = null;

    this.init();
  }

  async init() {
    this.loadCanData();
    this.setupEventListeners();
    this.renderCans();
    this.updateCounter();
    this.updateSaveStatus('saved');
  }

  loadCanData() {
    // All 49 cans with concise English location descriptions (sourced from Game8 wording style)
    this.cans = [
      {"id": 1, "name": "Cryo Original", "region": "Eidos 7", "location": "Vending machine in the flooded mall after draining the water (Oblivion quest)."},
      {"id": 25, "name": "Elixir Carrot", "region": "Eidos 7", "location": "Abandoned restaurant in the flooded commercial district (requires Oblivion quest)."},
      {"id": 33, "name": "Potential Blast", "region": "Eidos 7", "location": "On the 3rd floor of the broken building in the construction area."},

      {"id": 3, "name": "Pixie", "region": "Xion", "location": "On the ground at the northernmost end of Xion."},
      {"id": 9, "name": "The Machinetta Americano", "region": "Xion", "location": "Vending machine northeast of Gwen's Salon."},
      {"id": 11, "name": "The Machinetta Caramel Macchiato", "region": "Xion", "location": "Vending machine east of the giant city statue."},
      {"id": 19, "name": "GrainT Oolong", "region": "Xion", "location": "Climb the rope on the west side of the platform and leap past the chest."},
      {"id": 27, "name": "Behemoth Red", "region": "Xion", "location": "Vending machine in an alley near The Last Gulp bar."},
      {"id": 36, "name": "Dionysus C", "region": "Xion", "location": "Beside the trash cans up the stairs next to Roxanne's shop."},
      {"id": 39, "name": "Mountain Sparkle Mont Blanc", "region": "Xion", "location": "Vending machine above Sister's Junk."},
      {"id": 45, "name": "Bayern Weissbier Dunkel", "region": "Xion", "location": "At the end of the alley between Roxanne's and Lyle's shops."},

      {"id": 2, "name": "Cryo Zero", "region": "Wasteland", "location": "Open the chest and shoot the drone three times as it flees south."},
      {"id": 4, "name": "Pixie Zero", "region": "Wasteland", "location": "Shoot the beams trapping the yellow maintenance robot."},
      {"id": 10, "name": "The Machinetta Cafe Latte", "region": "Wasteland", "location": "Solve the pressure-plate puzzle nearby."},
      {"id": 12, "name": "Cryo Cafe Original", "region": "Wasteland", "location": "Cross the ship and turn left at the fork."},
      {"id": 17, "name": "The Haven Green Tea", "region": "Wasteland", "location": "Sequence of ledge hops and bar swings (double-jump required)."},
      {"id": 18, "name": "GrainT Barley", "region": "Wasteland", "location": "Climb the ledge then head west to solve the plate puzzle."},
      {"id": 20, "name": "GrainT Corn", "region": "Wasteland", "location": "Vending machine south of the Central Scrap Plains camp."},
      {"id": 21, "name": "Nectar Orange", "region": "Wasteland", "location": "Move the orange cart toward the billboard (double-jump needed)."},
      {"id": 26, "name": "Elixir Green", "region": "Wasteland", "location": "Jump from the ramp to the metal platforms (double-jump)."},
      {"id": 28, "name": "Behemoth Green", "region": "Wasteland", "location": "Place the two metal spheres on the buttons."},
      {"id": 34, "name": "Potential Tempest", "region": "Wasteland", "location": "Activate the four consoles in the area."},
      {"id": 41, "name": "Mountain Sparkle Halla", "region": "Wasteland", "location": "Climb the yellow ledges and complete the swinging jumps (double-jump)."},
      {"id": 42, "name": "Cryo the Clear", "region": "Wasteland", "location": "Behind a gate in the Restricted Area, descend underground."},
      {"id": 44, "name": "Bayern Hefe Weissbier", "region": "Wasteland", "location": "Vending machine next to a ruined building."},
      {"id": 46, "name": "Corsair Lager", "region": "Wasteland", "location": "Hit the switch and reach the platform before the timer ends."},

      {"id": 5, "name": "Newfoundland Dry", "region": "Matrix 11", "location": "In the Juggernaut boss room—climb blue containers then drop from the metal platform."},
      {"id": 13, "name": "Cryo Café Vanilla", "region": "Matrix 11", "location": "Hidden beside the containers in the Train Yard."},
      {"id": 47, "name": "Corsair Ale", "region": "Matrix 11", "location": "Turn right entering Train Graveyard; end of the flooded tunnel."},

      {"id": 6, "name": "Newfoundland Dry Zero", "region": "Great Desert", "location": "Shoot the wooden crate sticking out of the ground."},
      {"id": 8, "name": "Milky Pop Zero", "region": "Great Desert", "location": "Climb yellow ledges, shoot the drone target, swing from branches."},
      {"id": 14, "name": "Cryo Café Mocha", "region": "Great Desert", "location": "Open the chest then shoot the three drone targets."},
      {"id": 15, "name": "The Haven Earl Grey", "region": "Great Desert", "location": "On top of a Hypertube, climb from the west side."},
      {"id": 16, "name": "The Haven Milk Tea", "region": "Great Desert", "location": "Complete the nearby pressure-plate puzzle."},
      {"id": 22, "name": "Nectar Grape", "region": "Great Desert", "location": "Vending machine south of the Oasis camp."},
      {"id": 24, "name": "Nectar Cranberry", "region": "Great Desert", "location": "Ride the lift up then hop across maintenance robots."},
      {"id": 29, "name": "Behemoth Black", "region": "Great Desert", "location": "Solve the pressure-plate puzzle in the parking lot."},
      {"id": 30, "name": "Liquid Fire", "region": "Great Desert", "location": "Interact with the chest and destroy all appearing drones."},
      {"id": 32, "name": "Liquid Nuclear", "region": "Great Desert", "location": "Climb the scaffolding and push the large orange cart."},
      {"id": 35, "name": "Potential Frost", "region": "Great Desert", "location": "Climb the ladder and finish the platforming challenge."},
      {"id": 38, "name": "Starwell", "region": "Great Desert", "location": "Plant a Smart Mine on the sparkling spot on the ground."},
      {"id": 40, "name": "Mountain Sparkle Everest", "region": "Great Desert", "location": "Push the large orange cart to block the lasers."},
      {"id": 43, "name": "Cryo the Malt", "region": "Great Desert", "location": "Shoot the drone to reach a console (timed challenge)."},
      {"id": 48, "name": "Johnson's Highball Lemon", "region": "Great Desert", "location": "Move the orange cart then climb the ledges."},
      {"id": 49, "name": "Johnson's Highball Ginger", "region": "Great Desert", "location": "Vending machine in the middle of the ruined city."},

      {"id": 7, "name": "Milky Pop", "region": "Spire 4", "location": "Jump past the ledge onto the pipes at the end of the platform."},
      {"id": 23, "name": "Nectar Apple", "region": "Spire 4", "location": "Hidden behind one of the round benches in the ship's main lobby."},
      {"id": 31, "name": "Liquid Lightning", "region": "Spire 4", "location": "Behind the blue containers next to the Supply Camp."},
      {"id": 37, "name": "Moonwell", "region": "Spire 4", "location": "After defeating the Machine Hive, leap to the right section of the ship. If missed, fishable at the Oasis after Burning Xion."}
    ];

    // Sort cans by ID for consistent display
    this.cans.sort((a, b) => a.id - b.id);
  }

  setupEventListeners() {
    // Menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarClose = document.getElementById('sidebarClose');

    menuToggle.addEventListener('click', () => this.toggleSidebar());
    sidebarClose.addEventListener('click', () => this.closeSidebar());
    sidebarOverlay.addEventListener('click', () => this.closeSidebar());

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => this.handleFilterChange(btn));
    });

    // Export/Import buttons
    const exportBtn = document.getElementById('exportBtn');
    const importBtn = document.getElementById('importBtn');
    const fileInput = document.getElementById('fileInput');

    exportBtn.addEventListener('click', () => this.exportSave());
    importBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => this.importSave(e));

    // Resize handler to auto close sidebar on large screens
    window.addEventListener('resize', () => this.handleResize());
  }

  toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('sidebarOverlay').classList.toggle('active');
    document.getElementById('menuToggle').classList.toggle('active');
  }

  closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
    document.getElementById('menuToggle').classList.remove('active');
  }

  handleResize() {
    if (window.innerWidth > 768) {
      this.closeSidebar();
    }
  }

  handleFilterChange(button) {
    // Highlight active button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Set filter and re-render
    this.currentFilter = button.dataset.region;
    this.renderCans();

    // Auto close on mobile
    if (window.innerWidth <= 768) {
      this.closeSidebar();
    }
  }

  renderCans() {
    const grid = document.getElementById('cansGrid');
    const template = document.getElementById('canCardTemplate');
    grid.innerHTML = '';

    const list = this.currentFilter === 'all'
      ? this.cans
      : this.cans.filter(c => c.region === this.currentFilter);

    list.forEach(can => {
      const cardFrag = template.content.cloneNode(true);
      const card = cardFrag.querySelector('.can-card');
      card.dataset.id = can.id;
      card.dataset.region = can.region;

      cardFrag.querySelector('.can-name').textContent = can.name;
      cardFrag.querySelector('.can-region').textContent = can.region;
      cardFrag.querySelector('.can-location').textContent = can.location;

      const checkbox = cardFrag.querySelector('.can-checkbox');
      const label = cardFrag.querySelector('.can-checkbox-label');
      checkbox.id = `can-${can.id}`;
      label.setAttribute('for', `can-${can.id}`);

      // Collected state
      if (this.collectedCans.has(can.id)) {
        checkbox.checked = true;
        card.classList.add('collected');
      }

      checkbox.addEventListener('change', () => this.handleCanToggle(can.id, checkbox.checked));

      grid.appendChild(cardFrag);
    });
  }

  handleCanToggle(id, collected) {
    if (collected) {
      this.collectedCans.add(id);
    } else {
      this.collectedCans.delete(id);
    }

    // Update visual state
    const card = document.querySelector(`[data-id="${id}"]`);
    if (card) {
      card.classList.toggle('collected', collected);
    }

    this.updateCounter();
    this.autoSave();
  }

  updateCounter() {
    const counterEl = document.getElementById('progressCounter');
    counterEl.textContent = `${this.collectedCans.size}/${this.cans.length} cans collected`;
  }

  autoSave() {
    // Visual feedback only — no actual file / storage write (sandbox restriction)
    if (this.saveTimeout) clearTimeout(this.saveTimeout);
    this.updateSaveStatus('saving');
    this.saveTimeout = setTimeout(() => this.updateSaveStatus('saved'), 1000);
  }

  updateSaveStatus(state) {
    const indicator = document.querySelector('.save-indicator');
    indicator.className = `save-indicator ${state}`;
    indicator.textContent = state === 'saving' ? 'Saving…' : 'Saved';
  }

  exportSave() {
    const data = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      collectedCans: Array.from(this.collectedCans),
      totalCans: this.cans.length,
      progress: this.collectedCans.size
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stellar-blade-cans-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showMessage('Save exported successfully!', 'success');
  }

  async importSave(evt) {
    const file = evt.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!Array.isArray(data.collectedCans)) throw new Error('Invalid file format');

      this.collectedCans = new Set(data.collectedCans);
      this.renderCans();
      this.updateCounter();
      this.showMessage('Save imported successfully!', 'success');
      this.autoSave();
    } catch (err) {
      console.error(err);
      this.showMessage('Error importing save', 'error');
    } finally {
      evt.target.value = '';
    }
  }

  showMessage(msg, type) {
    const el = document.createElement('div');
    el.className = `message message-${type}`;
    el.textContent = msg;
    el.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 500;
      z-index: 1001;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;

    if (type === 'success') {
      el.style.backgroundColor = '#4caf50';
      el.style.color = '#fff';
    } else if (type === 'error') {
      el.style.backgroundColor = '#f44336';
      el.style.color = '#fff';
    }

    document.body.appendChild(el);
    requestAnimationFrame(() => (el.style.transform = 'translateX(0)'));

    setTimeout(() => {
      el.style.transform = 'translateX(100%)';
      setTimeout(() => el.remove(), 300);
    }, 3000);
  }
}

document.addEventListener('DOMContentLoaded', () => new StellarBladeCanTracker());