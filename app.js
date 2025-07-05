// Dataset: 49 collectible cans in Stellar Blade
const cansData = [
    {"id":1,"name":"Cryo Original","region":"Eidos 7"},
    {"id":2,"name":"Cryo Zero","region":"Wasteland"},
    {"id":3,"name":"Pixie","region":"Xion"},
    {"id":4,"name":"Pixie Zero","region":"Wasteland"},
    {"id":5,"name":"Newfoundland Dry","region":"Matrix 11"},
    {"id":6,"name":"Newfoundland Dry Zero","region":"Great Desert"},
    {"id":7,"name":"Milky Pop","region":"Spire 4"},
    {"id":8,"name":"Milky Pop Zero","region":"Great Desert"},
    {"id":9,"name":"The Machinetta Americano","region":"Xion"},
    {"id":10,"name":"The Machinetta Cafe Latte","region":"Wasteland"},
    {"id":11,"name":"The Machinetta Caramel Macchiato","region":"Xion"},
    {"id":12,"name":"Cryo Cafe Original","region":"Wasteland"},
    {"id":13,"name":"Cryo Cafe Vanilla","region":"Matrix 11"},
    {"id":14,"name":"Cryo Cafe Mocha","region":"Great Desert"},
    {"id":15,"name":"The Haven Earl Grey","region":"Great Desert"},
    {"id":16,"name":"The Haven Milk Tea","region":"Great Desert"},
    {"id":17,"name":"The Haven Green Tea","region":"Wasteland"},
    {"id":18,"name":"GrainT Barley","region":"Wasteland"},
    {"id":19,"name":"GrainT Oolong","region":"Xion"},
    {"id":20,"name":"GrainT Corn","region":"Wasteland"},
    {"id":21,"name":"Nectar Orange","region":"Wasteland"},
    {"id":22,"name":"Nectar Grape","region":"Great Desert"},
    {"id":23,"name":"Nectar Apple","region":"Spire 4"},
    {"id":24,"name":"Nectar Cranberry","region":"Great Desert"},
    {"id":25,"name":"Elixir Carrot","region":"Eidos 7"},
    {"id":26,"name":"Elixir Green","region":"Wasteland"},
    {"id":27,"name":"Behemoth Red","region":"Xion"},
    {"id":28,"name":"Behemoth Green","region":"Wasteland"},
    {"id":29,"name":"Behemoth Black","region":"Great Desert"},
    {"id":30,"name":"Liquid Fire","region":"Great Desert"},
    {"id":31,"name":"Liquid Lightning","region":"Spire 4"},
    {"id":32,"name":"Liquid Nuclear","region":"Great Desert"},
    {"id":33,"name":"Potential Blast","region":"Eidos 7"},
    {"id":34,"name":"Potential Tempest","region":"Wasteland"},
    {"id":35,"name":"Potential Frost","region":"Great Desert"},
    {"id":36,"name":"Dionysus C","region":"Xion"},
    {"id":37,"name":"Moonwell","region":"Spire 4"},
    {"id":38,"name":"Starwell","region":"Great Desert"},
    {"id":39,"name":"Mountain Sparkle Mont Blanc","region":"Xion"},
    {"id":40,"name":"Mountain Sparkle Everest","region":"Great Desert"},
    {"id":41,"name":"Mountain Sparkle Halla","region":"Wasteland"},
    {"id":42,"name":"Cryo the Clear","region":"Wasteland"},
    {"id":43,"name":"Cryo the Malt","region":"Great Desert"},
    {"id":44,"name":"Bayern Hefe Weissbier","region":"Wasteland"},
    {"id":45,"name":"Bayern Weissbier Dunkel","region":"Xion"},
    {"id":46,"name":"Corsair Lager","region":"Wasteland"},
    {"id":47,"name":"Corsair Ale","region":"Matrix 11"},
    {"id":48,"name":"Johnson's Highball Lemon","region":"Great Desert"},
    {"id":49,"name":"Johnson's Highball Ginger","region":"Great Desert"}
];

// Global state management
let currentSave = {
    collected: new Set() // Use Set for efficient lookup and storage
};

let currentFilter = 'All'; // Current active filter

// DOM elements
const cardsGrid = document.getElementById('cardsGrid');
const counter = document.getElementById('counter');
const filterButtons = document.querySelectorAll('.filter-btn');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const fileInput = document.getElementById('fileInput');
const toast = document.getElementById('toast');

// Initialize the application
function init() {
    setupEventListeners();
    renderCards();
    updateCounter();
}

// Set up all event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilterChange);
    });
    
    // Export/Import buttons
    exportBtn.addEventListener('click', exportSave);
    importBtn.addEventListener('click', triggerFileInput);
    fileInput.addEventListener('change', importSave);
}

// Handle filter changes
function handleFilterChange(e) {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    e.target.classList.add('active');
    
    // Update current filter
    currentFilter = e.target.dataset.region;
    
    // Re-render cards with new filter
    renderCards();
}

// Render cards based on current filter
function renderCards() {
    const filteredCans = currentFilter === 'All' 
        ? cansData 
        : cansData.filter(can => can.region === currentFilter);
    
    cardsGrid.innerHTML = '';
    
    filteredCans.forEach(can => {
        const card = createCard(can);
        cardsGrid.appendChild(card);
    });
}

// Create individual card element
function createCard(can) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.canId = can.id;
    
    // Check if can is collected
    const isCollected = currentSave.collected.has(can.id);
    if (isCollected) {
        card.classList.add('collected');
    }
    
    card.innerHTML = `
        <h3>${can.name}</h3>
        <div class="region">${can.region}</div>
        <div class="checkbox-container">
            <input 
                type="checkbox" 
                id="can-${can.id}"
                ${isCollected ? 'checked' : ''}
                aria-label="Checkbox raccolta ${can.name}"
            >
            <label for="can-${can.id}">Raccolta</label>
        </div>
    `;
    
    // Add event listener to checkbox
    const checkbox = card.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', (e) => handleCheckboxChange(e, can.id));
    
    return card;
}

// Handle checkbox state changes
function handleCheckboxChange(e, canId) {
    const isChecked = e.target.checked;
    const card = e.target.closest('.card');
    
    if (isChecked) {
        // Add to collected set
        currentSave.collected.add(canId);
        card.classList.add('collected');
    } else {
        // Remove from collected set
        currentSave.collected.delete(canId);
        card.classList.remove('collected');
    }
    
    // Update counter
    updateCounter();
    
    // Auto-save (in-memory only, as per requirements)
    console.log('Auto-saved:', currentSave);
}

// Update the counter display
function updateCounter() {
    const collectedCount = currentSave.collected.size;
    counter.textContent = collectedCount;
}

// Trigger file input for import
function triggerFileInput(e) {
    e.preventDefault();
    fileInput.click();
}

// Export save data as JSON
function exportSave(e) {
    e.preventDefault();
    
    try {
        const saveData = {
            collected: Array.from(currentSave.collected) // Convert Set to Array for JSON
        };
        
        const jsonString = JSON.stringify(saveData, null, 2);
        const blob = new Blob([jsonString], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'stellar-blade-cans-save.json';
        a.style.display = 'none';
        
        // Trigger download
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
        
        // Show success toast
        showToast('Salvataggio esportato con successo!', 'success');
        
    } catch (error) {
        console.error('Error exporting save:', error);
        showToast('Errore durante l\'esportazione: ' + error.message, 'error');
    }
}

// Import save data from JSON file
function importSave(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const saveData = JSON.parse(event.target.result);
            
            // Validate save data structure
            if (!saveData || !Array.isArray(saveData.collected)) {
                throw new Error('Formato file non valido');
            }
            
            // Validate that all IDs are valid
            const validIds = saveData.collected.filter(id => 
                cansData.some(can => can.id === id)
            );
            
            // Update current save
            currentSave.collected = new Set(validIds);
            
            // Re-render cards to reflect loaded state
            renderCards();
            updateCounter();
            
            // Show success toast
            showToast('Salvataggio caricato con successo!', 'success');
            
        } catch (error) {
            console.error('Error importing save:', error);
            showToast('Errore nel caricamento del file: ' + error.message, 'error');
        }
    };
    
    reader.onerror = function() {
        showToast('Errore nella lettura del file', 'error');
    };
    
    reader.readAsText(file);
    
    // Clear file input for future imports
    fileInput.value = '';
}

// Show toast notification
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);