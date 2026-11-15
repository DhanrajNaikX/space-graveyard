// ============================================================================
// SPACE GRAVEYARD - Interactive NASA Digital Space Museum
// Primary NASA sources & historical facts verified.
// ============================================================================

// --- Web Audio Synthesizer (Kid-Friendly Sound Effects, Zero External Files) ---
const Sound = (() => {
  let ctx = null;
  let muted = false;

  function getCtx() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
    return ctx;
  }

  function playTone(freq, type, duration, endFreq = null, gainVal = 0.15) {
    if (muted) return;
    try {
      const ac = getCtx();
      if (!ac) return;
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ac.currentTime);
      if (endFreq) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(10, endFreq), ac.currentTime + duration);
      }
      gain.gain.setValueAtTime(gainVal, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start();
      osc.stop(ac.currentTime + duration);
    } catch (_) {}
  }

  return {
    isMuted: () => muted,
    toggleMute: () => {
      muted = !muted;
      return muted;
    },
    click: () => playTone(520, 'sine', 0.08, 680, 0.1),
    cardFlip: () => playTone(340, 'triangle', 0.12, 480, 0.12),
    match: () => {
      playTone(523.25, 'sine', 0.14, null, 0.15); // C5
      setTimeout(() => playTone(659.25, 'sine', 0.2, null, 0.15), 90); // E5
      setTimeout(() => playTone(783.99, 'sine', 0.28, null, 0.18), 180); // G5
    },
    win: () => {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => playTone(freq, 'triangle', 0.35, null, 0.2), idx * 110);
      });
    },
    thrust: () => playTone(140, 'sawtooth', 0.15, 70, 0.08),
    gentleBeep: (f = 440) => playTone(f, 'sine', 0.1, null, 0.08),
    alert: () => playTone(280, 'square', 0.15, 200, 0.1)
  };
})();

// --- NASA Primary Mission Exhibits Data ---
const exhibitData = {
  eagle: {
    kicker: 'Moon exhibit · Apollo 11 · 1969',
    title: 'Eagle: the Moon landing craft',
    status: 'Different parts had different endings',
    badge: 'Descent Stage Remains in Sea of Tranquility',
    intro: "Apollo 11’s Lunar Module Eagle carried Neil Armstrong and Buzz Aldrin to the lunar surface. The craft was made of two stages, and each followed a different path.",
    stats: [
      { label: 'Landing Date', val: 'July 20, 1969 (20:17:40 UTC)' },
      { label: 'Landing Site', val: 'Sea of Tranquility (0.674° N, 23.473° E)' },
      { label: 'Surface Crew', val: 'Neil Armstrong & Buzz Aldrin' },
      { label: 'Surface Stay', val: '21 hours, 36 minutes' },
      { label: 'Command Module', val: 'Columbia (Michael Collins in orbit)' }
    ],
    timeline: [
      ['July 20, 1969', 'Eagle landed in the Sea of Tranquility. Armstrong and Aldrin spent about 21½ hours on the lunar surface.'],
      ['After surface activities', 'The ascent stage lifted off and rendezvoused with Columbia. The descent stage remained on the Moon as planned.'],
      ['After docking', 'The crew returned to Columbia. Eagle’s ascent stage was jettisoned in lunar orbit; NASA’s mission records describe that orbit, not a later confirmed resting place.']
    ],
    details: 'The descent stage on the Moon still bears a stainless steel plaque signed by the three astronauts and President Richard Nixon: "Here men from the planet Earth first set foot upon the Moon July 1969, A.D. We came in peace for all mankind." Because the Moon has no wind, rain, or atmosphere, the landing base and astronaut footprints remain completely undisturbed.',
    source: 'https://www.nasa.gov/missions/apollo/apollo-11-mission-overview/',
    sourceLabel: 'NASA Apollo 11 mission overview'
  },
  sojourner: {
    kicker: 'Mars exhibit · Mars Pathfinder · 1997',
    title: 'Sojourner: the little rover',
    status: 'Communication ended when its lander failed',
    badge: 'First Wheeled Rover on Mars',
    intro: 'Sojourner was the first rover to explore Mars. It worked with the Pathfinder lander, which relayed messages between the rover and Earth.',
    stats: [
      { label: 'Landing Date', val: 'July 4, 1997' },
      { label: 'Landing Site', val: 'Ares Vallis, Mars (19.13° N, 33.22° W)' },
      { label: 'Designed Life', val: '7 Martian sols' },
      { label: 'Actual Lifetime', val: '83 Martian sols (12x design life!)' },
      { label: 'Total Mass', val: '10.6 kg (23 lbs) — microwave-sized' }
    ],
    timeline: [
      ['July 4, 1997', 'Mars Pathfinder landed at Ares Vallis. Sojourner drove down a ramp onto the Martian surface the next day.'],
      ['Mission work', 'The small, six-wheeled rover examined nearby rocks and soil. The lander served as its communications relay.'],
      ['September 27, 1997', 'The mission ended after the lander’s power system failed. Without the lander relay, the team could no longer interact with the rover.']
    ],
    details: 'Named in honor of abolitionist and activist Sojourner Truth, the rover verified that Martian rocks were shaped by water-rich ancient volcanic floods, proving the value of mobile robotics.',
    source: 'https://www-robotics.jpl.nasa.gov/what-we-do/flight-projects/pathfinder/',
    sourceLabel: 'NASA JPL Robotics: Sojourner and Pathfinder'
  },
  opportunity: {
    kicker: 'Mars exhibit · Mars Exploration Rover · 2004–2018',
    title: 'Opportunity: the long-distance rover',
    status: 'Lost contact in a dust storm; NASA ended the mission later',
    badge: '45.16 km Driven Across Mars',
    intro: 'Opportunity was a solar-powered rover sent to look for signs that ancient Mars had wet environments. It far outlasted its original 90-Martian-day design mission.',
    stats: [
      { label: 'Landing Date', val: 'January 25, 2004' },
      { label: 'Landing Site', val: 'Eagle Crater, Meridiani Planum, Mars' },
      { label: 'Designed Life', val: '90 Martian sols' },
      { label: 'Actual Mission', val: '5,111 Martian sols (almost 15 years)' },
      { label: 'Total Distance', val: '45.16 km (28.06 miles)' }
    ],
    timeline: [
      ['January 24, 2004', 'Opportunity landed on Mars and began exploring Meridiani Planum.'],
      ['June 10, 2018', 'The rover sent its last signal during a planet-wide dust storm that reduced sunlight reaching its solar panels.'],
      ['February 13, 2019', 'After months of attempts to reconnect, NASA declared the mission complete. Opportunity had driven about 45.16 kilometers.']
    ],
    details: 'Opportunity discovered hematite "blueberries" and sulfate minerals, conclusively proving that liquid water once flowed across ancient Mars. It rests peacefully in Perseverance Valley at Endeavour Crater.',
    source: 'https://science.nasa.gov/mission/mer-opportunity/',
    sourceLabel: 'NASA Science: Opportunity mission'
  },
  ingenuity: {
    kicker: 'Mars exhibit · Mars 2020 · 2021–2024',
    title: 'Ingenuity: the little helicopter',
    status: 'Mission ended after rotor damage on Flight 72',
    badge: 'First Powered Flight on Another World',
    intro: 'Ingenuity was a technology demonstration that proved a powered, controlled flight could work on another planet. It rode to Mars with the Perseverance rover.',
    stats: [
      { label: 'Landing Date', val: 'February 18, 2021 (with Perseverance)' },
      { label: 'First Flight', val: 'April 19, 2021 (3m hover, 39 seconds)' },
      { label: 'Planned Flights', val: 'Up to 5 demonstration hops' },
      { label: 'Actual Flights', val: '72 flights (17.0 km total, 128.8 minutes)' },
      { label: 'Final Resting Site', val: '"Valinor Hills", Jezero Crater, Mars' }
    ],
    timeline: [
      ['April 19, 2021', 'Ingenuity completed the first powered, controlled flight on another planet. It had originally been planned for up to five test flights.'],
      ['January 18, 2024', 'During Flight 72, a navigation problem led to a hard landing and rotor damage. The helicopter could no longer fly.'],
      ['January 25, 2024', 'NASA concluded flight operations. Ingenuity had completed 72 flights and supported future aerial exploration planning.']
    ],
    details: 'Ingenuity carried a small swatch of fabric from the wing of the Wright Brothers’ 1903 Flyer under its solar panel, bridging the first flight on Earth to the first flight on Mars.',
    source: 'https://www.nasa.gov/missions/mars-2020-perseverance/ingenuity-helicopter/nasa-performs-first-aircraft-accident-investigation-on-another-world/',
    sourceLabel: 'NASA: Ingenuity Flight 72 investigation'
  },
  reflector: {
    kicker: 'Moon exhibit · Apollo 11 science · 1969–today',
    title: 'The laser reflector still at work',
    status: 'Planned to remain; still supports lunar research',
    badge: 'Active Scientific Experiment Over 50 Years Later',
    intro: 'Apollo 11 astronauts deployed a panel of corner-cube mirrors called a laser ranging retroreflector. It is passive equipment: it needs no power to reflect laser light back toward its source.',
    stats: [
      { label: 'Deployed Date', val: 'July 21, 1969' },
      { label: 'Location', val: 'Tranquility Base, Moon' },
      { label: 'Mirror Type', val: '100 Corner-Cube Fused Silica Prisms' },
      { label: 'Electricity Needed', val: '0 Watts (Completely passive)' },
      { label: 'Current Status', val: 'Still operational and active today' }
    ],
    timeline: [
      ['July 1969', 'The Apollo 11 crew placed the reflector on the Moon near the landing site.'],
      ['How it works', 'Scientists send laser pulses toward the reflector and time their return to study the Earth-Moon distance and lunar motion.'],
      ['Today', 'The Apollo 11 reflector continues to yield scientific data. This hardware is still useful equipment, not simply abandoned debris.']
    ],
    details: 'Laser ranging measurements proved that the Moon is slowly drifting away from Earth at a rate of 3.8 centimeters (1.5 inches) every year, and provided evidence that the Moon has a fluid core.',
    source: 'https://ilrs.cddis.eosdis.nasa.gov/missions/satellite_missions/current_missions/ap11_general.html',
    sourceLabel: 'NASA International Laser Ranging Service'
  }
};

// --- Dialogs & Modal Functionality ---
const exhibitDialog = document.querySelector('#exhibit-dialog');
const gameDialog = document.querySelector('#game-dialog');

function showExhibit(id) {
  const x = exhibitData[id];
  if (!x) return;
  Sound.click();

  const statsHtml = x.stats ? `
    <div class="exhibit-stats-grid">
      ${x.stats.map(s => `
        <div class="stat-box">
          <span class="stat-label">${s.label}</span>
          <span class="stat-value">${s.val}</span>
        </div>
      `).join('')}
    </div>
  ` : '';

  const timelineHtml = `
    <h3 class="modal-subheading">Mission Timeline</h3>
    <ol class="timeline">
      ${x.timeline.map(t => `
        <li>
          <strong>${t[0]}</strong>
          <p>${t[1]}</p>
        </li>
      `).join('')}
    </ol>
  `;

  document.querySelector('#exhibit-content').innerHTML = `
    <div class="modal-header">
      <p class="eyebrow">${x.kicker}</p>
      <h2>${x.title}</h2>
      <div class="modal-badge-row">
        <span class="modal-status">${x.status}</span>
        ${x.badge ? `<span class="modal-accent-badge">★ ${x.badge}</span>` : ''}
      </div>
    </div>
    <div class="modal-body">
      <p class="modal-intro">${x.intro}</p>
      ${statsHtml}
      ${timelineHtml}
      <div class="modal-facts-card">
        <h4>Did you know?</h4>
        <p>${x.details}</p>
      </div>
      <div class="modal-source-footer">
        <span class="source-tag">Official NASA Source:</span>
        <a class="source-link" href="${x.source}" target="_blank" rel="noopener">
          Read: ${x.sourceLabel} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  `;
  exhibitDialog.showModal();
}

// Bind exhibit buttons
document.querySelectorAll('[data-exhibit]').forEach(b => {
  b.addEventListener('click', () => showExhibit(b.dataset.exhibit));
});

// --- World Filter Switch (All / Moon / Mars) ---
document.querySelectorAll('.world-button').forEach(b => {
  b.addEventListener('click', () => {
    Sound.click();
    document.querySelectorAll('.world-button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    document.querySelectorAll('.exhibit-card').forEach(c => {
      const match = (b.dataset.world === 'all' || c.dataset.world === b.dataset.world);
      c.hidden = !match;
      c.style.display = match ? '' : 'none';
    });
  });
});

// Modal Close Handlers
document.querySelectorAll('.modal-close').forEach(b => {
  b.addEventListener('click', () => {
    Sound.click();
    b.closest('dialog').close();
  });
});

for (const dlg of [exhibitDialog, gameDialog]) {
  dlg.addEventListener('click', e => {
    if (e.target === dlg) {
      Sound.click();
      dlg.close();
    }
  });
}

// --- Explorer Log & Completion Tracking ---
const completed = new Set();
const totalGames = 3;

function markComplete(id) {
  if (!completed.has(id)) {
    completed.add(id);
    Sound.win();
    triggerConfetti();
  }
  const n = completed.size;
  const wonEl = document.querySelector('#games-won');
  const countEl = document.querySelector('#badge-count');
  const fillEl = document.querySelector('#progress-fill');

  if (wonEl) wonEl.textContent = n;
  if (countEl) countEl.textContent = `${n} ${n === 1 ? 'badge' : 'badges'}`;
  if (fillEl) fillEl.style.width = `${Math.min(100, (n / totalGames) * 100)}%`;

  const badgeEl = document.querySelector(`#badge-item-${id}`);
  if (badgeEl) badgeEl.classList.add('unlocked');
}

function openGame(html) {
  document.querySelector('#game-content').innerHTML = html;
  gameDialog.showModal();
}

document.querySelectorAll('[data-game]').forEach(b => {
  b.addEventListener('click', () => {
    Sound.click();
    startGame(b.dataset.game);
  });
});

function startGame(kind) {
  if (kind === 'landing') landingGame();
  if (kind === 'repair') repairGame();
  if (kind === 'memory') memoryGame();
}

// ============================================================================
// MINI-GAME 1: Land the Eagle (Landing-Site Choice Puzzle & Approach Radar)
// ============================================================================
function landingGame() {
  const landingChoices = [
    {
      id: 'ridge',
      label: 'Rocky ridge',
      safe: 'no',
      reason: 'Look for open, level ground away from rocks and crater edges. Try again!'
    },
    {
      id: 'crater',
      label: 'Crater edge',
      safe: 'no',
      reason: 'Look for open, level ground away from rocks and crater edges. Try again!'
    },
    {
      id: 'plain',
      label: 'Wide, flat clearing',
      safe: 'yes',
      reason: 'Safe landing! Clear, level ground is the best choice. Explorer badge earned ✦'
    }
  ];

  openGame(`
    <div class="game-container game-landing-container">
      <div class="game-header">
        <p class="eyebrow">Mini-game 01 · Moon</p>
        <h2>Land the Eagle</h2>
        <p class="game-instructions">
          This is a safe landing-site puzzle, not a flight simulator. Choose the clearest spot for a pretend landing.
        </p>
      </div>

      <div class="radar-display" id="radar-screen">
        <div class="radar-sweep" aria-hidden="true"></div>
        <div class="radar-lander-symbol" aria-hidden="true">
          <svg viewBox="0 0 40 40" width="40" height="40">
            <path d="M12 28h16l-3 6h-10z" fill="#f6cd75"/>
            <path d="M15 16h10l3 12H12z" fill="#d9eef0"/>
            <circle cx="20" cy="12" r="5" fill="#f6cd75"/>
            <line x1="12" y1="34" x2="6" y2="39" stroke="#cbd5e1" stroke-width="2"/>
            <line x1="28" y1="34" x2="34" y2="39" stroke="#cbd5e1" stroke-width="2"/>
          </svg>
        </div>
        <div class="radar-telemetry">
          <span>ALTITUDE: 120 FT</span>
          <span>FUEL: 34 SEC</span>
          <span>DESCENT: 2.2 FT/S</span>
        </div>
      </div>

      <p class="site-select-title">Scan the terrain and select the safest landing site:</p>
      <div class="choice-row" id="landing-choices">
        ${landingChoices.map(c => `
          <button class="choice" data-safe="${c.safe}" data-id="${c.id}">${c.label}</button>
        `).join('')}
      </div>

      <p class="game-feedback" id="landing-feedback" aria-live="polite"></p>
      <div id="landing-retry-box" style="margin-top: 14px; text-align: center;"></div>
    </div>
  `);

  const buttons = document.querySelectorAll('#landing-choices .choice');
  const feedback = document.querySelector('#landing-feedback');
  const retryBox = document.querySelector('#landing-retry-box');

  buttons.forEach(b => {
    b.onclick = () => {
      Sound.click();
      buttons.forEach(btn => btn.classList.remove('selected', 'safe-choice', 'hazard-choice'));
      const choiceObj = landingChoices.find(c => c.id === b.dataset.id);

      if (b.dataset.safe === 'yes') {
        b.classList.add('selected', 'safe-choice');
        Sound.match();
        feedback.textContent = choiceObj.reason;
        markComplete('landing');
        retryBox.innerHTML = `<button class="button button-primary" onclick="landingGame()">Play Again ↺</button>`;
      } else {
        b.classList.add('selected', 'hazard-choice');
        Sound.alert();
        feedback.textContent = choiceObj.reason;
        retryBox.innerHTML = `<button class="game-retry" onclick="landingGame()">Reset Approach ↺</button>`;
      }
    };
  });
}

// ============================================================================
// MINI-GAME 2: Repair the Rover (Mars Rover Component Matching)
// ============================================================================
const roverPairs = [
  ['Camera', 'Takes pictures of the landscape'],
  ['Solar panel', 'Turns sunlight into electrical power'],
  ['Wheels', 'Move the rover across the ground'],
  ['Antenna', 'Sends and receives radio messages'],
  ['Robotic arm', 'Reaches out with tools to inspect rocks up close'],
  ['Warm electronics box', 'Keeps computer parts warm during freezing Martian nights']
];

function repairGame() {
  const randomizedPartIndexes = [...roverPairs.keys()].sort(() => Math.random() - 0.5);

  openGame(`
    <div class="game-container game-repair-container">
      <div class="game-header">
        <p class="eyebrow">Mini-game 02 · Mars</p>
        <h2>Repair the Rover</h2>
        <p class="game-instructions">
          Match each part with its job. Drag a part to a job, or tap the part and then tap its match.
        </p>
      </div>

      <div class="repair-board-layout">
        <div class="rover-schematic-column">
          <h4 class="column-title">Rover Jobs:</h4>
          <div class="match-board">
            ${roverPairs.map((p, i) => `
              <div class="match-drop" data-match="${i}" tabindex="0" role="button" aria-label="Drop the matching rover part here">
                <span class="slot-desc">${p[1]}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="rover-parts-column">
          <h4 class="column-title">Equipment Bay (Select a Part):</h4>
          <div class="match-parts">
            ${randomizedPartIndexes.map(i => `
              <button class="part-chip" draggable="true" data-part="${i}">
                <span class="chip-name">${roverPairs[i][0]}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <p class="game-feedback" id="repair-feedback" aria-live="polite"></p>
      <div id="repair-retry-box" style="margin-top: 14px; text-align: center;"></div>
    </div>
  `);

  let selected = null;
  const solved = new Set();
  const chips = [...document.querySelectorAll('.part-chip')];
  const drops = [...document.querySelectorAll('.match-drop')];
  const feedback = document.querySelector('#repair-feedback');
  const retryBox = document.querySelector('#repair-retry-box');

  const attempt = (drop, idx) => {
    if (solved.has(Number(drop.dataset.match))) return;
    const part = idx ?? selected;
    if (part === null || part === undefined) return;
    const target = Number(drop.dataset.match);

    if (part === target) {
      solved.add(target);
      Sound.match();
      drop.classList.add('correct');
      drop.innerHTML = `<strong>${roverPairs[target][0]} ✓</strong><br><span class="slot-desc">${roverPairs[target][1]}</span>`;
      
      const foundChip = chips.find(c => Number(c.dataset.part) === part);
      if (foundChip) foundChip.hidden = true;
      selected = null;

      feedback.textContent = `Good match! ${solved.size} of ${roverPairs.length} matched.`;

      if (solved.size === roverPairs.length) {
        Sound.win();
        feedback.textContent = 'Rover repaired! Explorer badge earned ✦';
        markComplete('repair');
        retryBox.innerHTML = `<button class="button button-primary" onclick="repairGame()">Reassemble Again ↺</button>`;
      }
    } else {
      Sound.alert();
      feedback.textContent = 'That part has a different job. Try another match.';
    }
  };

  chips.forEach(c => {
    c.addEventListener('click', () => {
      Sound.click();
      selected = Number(c.dataset.part);
      chips.forEach(x => x.classList.toggle('selected', x === c));
      feedback.textContent = `${c.textContent.trim()} selected — choose its job.`;
    });

    c.addEventListener('dragstart', e => {
      selected = Number(c.dataset.part);
      e.dataTransfer.setData('text/plain', c.dataset.part);
    });
  });

  drops.forEach(d => {
    d.addEventListener('click', () => attempt(d));
    d.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        attempt(d);
      }
    });

    d.addEventListener('dragover', e => {
      e.preventDefault();
      d.classList.add('drag-over');
    });
    d.addEventListener('dragleave', () => d.classList.remove('drag-over'));
    d.addEventListener('drop', e => {
      e.preventDefault();
      d.classList.remove('drag-over');
      attempt(d, Number(e.dataTransfer.getData('text/plain')));
    });
  });
}

// ============================================================================
// MINI-GAME 3: Mission Memory Match (12 Cards, 6 Pairs)
// ============================================================================
function memoryGame() {
  const symbols = ['☾', '◉', '✦', '▤', '◇', '✧'];
  const symbolNames = {
    '☾': 'Moon Lunar Lander',
    '◉': 'Red Planet Mars',
    '✦': 'Mission Gold Star',
    '▤': 'Solar Array Wing',
    '◇': 'Retroreflector Prism',
    '✧': 'Deep Space Pioneer'
  };

  const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

  openGame(`
    <div class="game-container game-memory-container">
      <div class="game-header">
        <p class="eyebrow">Mini-game 03 · Mission mix</p>
        <h2>Mission Memory</h2>
        <p class="game-instructions">Find all six matching pairs. Turn over two cards at a time.</p>
        <p class="game-score" id="memory-score">Moves: 0</p>
      </div>

      <div class="memory-board">
        ${cards.map((s, i) => `
          <button class="memory-card" data-symbol="${s}" data-index="${i}" aria-label="Hidden memory card">?</button>
        `).join('')}
      </div>

      <p class="game-feedback" id="memory-feedback" aria-live="polite"></p>
      <div id="memory-action-box" style="margin-top: 12px; text-align: center;"></div>
    </div>
  `);

  let first = null;
  let locked = false;
  let moves = 0;
  let pairs = 0;
  const feedback = document.querySelector('#memory-feedback');
  const scoreEl = document.querySelector('#memory-score');
  const actionBox = document.querySelector('#memory-action-box');

  document.querySelectorAll('.memory-card').forEach(c => {
    c.addEventListener('click', () => {
      if (locked || c.classList.contains('revealed') || c.classList.contains('matched')) return;

      Sound.cardFlip();
      c.textContent = c.dataset.symbol;
      c.classList.add('revealed');
      c.setAttribute('aria-label', `Card ${c.dataset.symbol} - ${symbolNames[c.dataset.symbol] || ''}`);

      if (!first) {
        first = c;
        return;
      }

      moves++;
      scoreEl.textContent = `Moves: ${moves}`;

      if (first.dataset.symbol === c.dataset.symbol) {
        Sound.match();
        first.classList.replace('revealed', 'matched');
        c.classList.replace('revealed', 'matched');
        pairs++;
        first = null;

        if (pairs === 6) {
          Sound.win();
          feedback.textContent = `All pairs found in ${moves} moves! Explorer badge earned ✦`;
          markComplete('memory');
          actionBox.innerHTML = `<button class="button button-primary" onclick="memoryGame()">Play Again ↺</button>`;
        }
      } else {
        locked = true;
        const prev = first;
        first = null;
        setTimeout(() => {
          prev.classList.remove('revealed');
          c.classList.remove('revealed');
          prev.textContent = '?';
          c.textContent = '?';
          prev.setAttribute('aria-label', 'Hidden memory card');
          c.setAttribute('aria-label', 'Hidden memory card');
          locked = false;
        }, 750);
      }
    });
  });
}

// ============================================================================
// CHANDU'S CHILD-FRIENDLY APOLLO 11 STORY
// ============================================================================
const chanduStoryPages = [
  {
    chapter: 1,
    title: 'Ready for the Moon!',
    text: `<p>Chandu floated into the museum, where a silver model of Eagle waited under the lights.</p><p>"Ready to visit the Moon?" asked the museum guide.</p><p>"I packed my imaginary moon-boots!" said Chandu. Together, they followed the real Apollo 11 timeline: Eagle carried Neil Armstrong and Buzz Aldrin down to the Moon, while Michael Collins stayed aboard Columbia in lunar orbit.</p>`,
    fact: 'NASA Fact: Apollo 11 launched from Kennedy Space Center on July 16, 1969 atop the Saturn V rocket.'
  },
  {
    chapter: 2,
    title: 'Landing in Tranquility',
    text: `<p>As Eagle flew low over the Moon, Neil Armstrong saw that the automatic autopilot was heading toward a giant crater filled with boulders!</p><p>Armstrong took manual control and tilted the craft forward, searching for a clear, smooth area. With only seconds of fuel remaining, Eagle touched down safely.</p><p><strong>"Houston, Tranquility Base here. The Eagle has landed!"</strong></p>`,
    fact: 'NASA Fact: Eagle touched down in the Sea of Tranquility on July 20, 1969 with under 40 seconds of descent fuel left.'
  },
  {
    chapter: 3,
    title: 'The Magic Laser Mirror & Ascent Liftoff',
    text: `<p>They pictured the descent stage resting on the lunar ground as the ascent stage carried the astronauts back to Columbia. Chandu waved to the little laser reflector too — it was left on the Moon to help scientists measure the Earth–Moon distance.</p><p>"The adventure is pretend," Chandu smiled, "but those machines and events really happened."</p>`,
    fact: 'NASA Fact: The Apollo 11 Laser Ranging Retroreflector is still actively pinged by Earth lasers today, proving the Moon drifts 3.8 cm further each year.'
  }
];

let chanduPageIdx = 0;

function showChanduStory(pageIndex = 0) {
  chanduPageIdx = Math.max(0, Math.min(pageIndex, chanduStoryPages.length - 1));
  const page = chanduStoryPages[chanduPageIdx];
  const isLast = chanduPageIdx === chanduStoryPages.length - 1;
  const isFirst = chanduPageIdx === 0;

  openGame(`
    <div class="story-modal-container">
      <p class="story-label">FICTIONAL NARRATION · REAL MISSION FACTS</p>
      <h2>Chandu’s Moon-day: ${page.title}</h2>
      <div class="story-page">
        ${page.text}
      </div>
      <div class="story-fact-callout">
        <strong>★ Historical NASA Fact:</strong>
        <p>${page.fact}</p>
      </div>
      <div class="story-nav-buttons" style="display:flex; justify-content:space-between; align-items:center; margin-top:20px;">
        <button class="button-small" id="story-prev" ${isFirst ? 'disabled' : ''}>← Previous</button>
        <span class="story-counter" style="font: 12px var(--mono); color: var(--muted);">Part ${chanduPageIdx + 1} of ${chanduStoryPages.length}</span>
        <button class="button button-primary" id="story-next">${isLast ? 'Complete Story ✦' : 'Next Part →'}</button>
      </div>
      <div style="margin-top:16px;">
        <a class="source-link" href="https://www.nasa.gov/missions/apollo/apollo-11-mission-overview/" target="_blank" rel="noopener">
          Check the Apollo 11 facts at NASA ↗
        </a>
      </div>
    </div>
  `);

  document.querySelector('#story-prev')?.addEventListener('click', () => {
    Sound.click();
    showChanduStory(chanduPageIdx - 1);
  });

  document.querySelector('#story-next')?.addEventListener('click', () => {
    Sound.click();
    if (isLast) {
      Sound.win();
      gameDialog.close();
      markComplete('story');
    } else {
      showChanduStory(chanduPageIdx + 1);
    }
  });
}

document.querySelector('#story-button')?.addEventListener('click', () => {
  Sound.click();
  showChanduStory(0);
});

// --- Sound Toggle in Topbar ---
const soundToggle = document.querySelector('#sound-toggle');
if (soundToggle) {
  soundToggle.addEventListener('click', () => {
    const isMuted = Sound.toggleMute();
    soundToggle.textContent = isMuted ? '🔇' : '🔊';
    soundToggle.setAttribute('aria-label', isMuted ? 'Unmute Sound' : 'Mute Sound');
    if (!isMuted) Sound.gentleBeep(520);
  });
}

// --- Mobile Navigation Menu Toggle ---
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    Sound.click();
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// --- Confetti Celebration Particle Generator ---
function triggerConfetti() {
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#f6cd75', '#86dce0', '#f68469', '#aedcbc', '#ffffff'];
  const particles = Array.from({ length: 60 }, () => ({
    x: canvas.width * 0.5 + (Math.random() - 0.5) * 200,
    y: canvas.height * 0.3,
    vx: (Math.random() - 0.5) * 12,
    vy: (Math.random() - 1.5) * 9,
    size: Math.random() * 7 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * 360,
    vrot: (Math.random() - 0.5) * 10,
    opacity: 1
  }));

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.28;
      p.rot += p.vrot;
      p.opacity -= 0.012;
      if (p.opacity > 0) alive = true;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      ctx.restore();
    });

    frame++;
    if (alive && frame < 90) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }
  requestAnimationFrame(animate);
}

// --- Deep Space Canvas Starfield Animation ---
(() => {
  const canvas = document.querySelector('#starfield-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const stars = Array.from({ length: 70 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5 + 0.4,
    speed: Math.random() * 0.02 + 0.005,
    phase: Math.random() * Math.PI * 2
  }));

  function draw() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(s => {
      s.phase += s.speed;
      const flicker = (Math.sin(s.phase) + 1) * 0.5;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + flicker * 0.7})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();
