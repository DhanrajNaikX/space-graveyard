# SPACE GRAVEYARD

A responsive, child-friendly interactive digital space museum prototype about real NASA equipment left behind on the Moon and Mars. This is a standalone static website built with pure HTML, CSS, and modern JavaScript with no build step, external dependencies, or package installation required.

## Quick Start / Run It Locally

1. Open `index.html` directly in any modern desktop or mobile web browser, or serve this folder using Python:
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.
2. Filter exhibits by world (**All**, **Moon**, **Mars**) and tap any exhibit to explore detailed mission timelines, specifications, and primary NASA records.
3. Compare planetary preservation conditions in the **Moon vs. Mars** science section.
4. Read **Chandu’s Apollo 11 Story** with kid-friendly narration and NASA fact-checks.
5. Play all three interactive mini-games to earn explorer badges:
   - **Land the Eagle**: A safe landing-site choice puzzle with animated radar telemetry.
   - **Repair the Rover**: Drag-and-drop & tap-to-match Mars rover assembly bay with 6 scientific systems.
   - **Mission Memory**: A 12-card matching game with mission emblems and star ratings.
6. Toggle kid-friendly synthesized audio sound effects using the topbar sound button (🔊 / 🔇).

## Key Features

- **Space-Themed Interactive Homepage**: Twinkling deep space starfield canvas, friendly rover mascot, and quick planetary distance counters.
- **Planetary Science Comparison**: Clear breakdown comparing why hardware lasts indefinitely on the airless Moon vs. weathering under Mars's dust storms and thin carbon-dioxide atmosphere.
- **Five Primary Equipment Exhibits**:
  1. *Apollo 11 Lunar Module Eagle* (Descent Stage resting in Sea of Tranquility)
  2. *Sojourner Rover* (First wheeled robot on Mars; Mars Pathfinder)
  3. *Opportunity Rover* (15-year marathon explorer in Perseverance Valley)
  4. *Ingenuity Mars Helicopter* (First powered flight on another planet; 72 flights)
  5. *Apollo 11 Laser Ranging Retroreflector* (Active passive science experiment over 50 years later)
- **Nuanced Historical Status Distinctions**: Accurately distinguishes between hardware left intentionally as landing platforms or ongoing experiments, communication loss following lander battery depletion or global dust storms, and mechanical retirement following rotor tip damage.
- **Chandu’s Child-Friendly Story**: A clearly labeled fictional narrative accompanied by primary historical mission records.
- **Synthesized Web Audio Sound Engine**: Clean, kid-friendly sound effects (button clicks, card flips, thruster rumble, victory fanfares) synthesized entirely through the browser's Web Audio API with zero external audio assets required.
- **Responsive Layout**: Designed for seamless accessibility across mobile phones (320px–480px), tablets (768px–980px), and wide desktop screens (1200px+).

## Verified NASA Fact References & Primary Sources

- Apollo 11 Mission Overview: https://www.nasa.gov/missions/apollo/apollo-11-mission-overview/
- Mars Pathfinder Mission and Sojourner: https://science.nasa.gov/mission/mars-pathfinder/
- Sojourner Rover Details and Mission End: https://www-robotics.jpl.nasa.gov/what-we-do/flight-projects/pathfinder/
- Opportunity Mission Overview: https://science.nasa.gov/mission/mer-opportunity/
- Opportunity’s Last Transmission: https://science.nasa.gov/resource/opportunitys-last-message/
- Ingenuity Flight 72 Accident Investigation: https://www.nasa.gov/missions/mars-2020-perseverance/ingenuity-helicopter/nasa-performs-first-aircraft-accident-investigation-on-another-world/
- Apollo 11 Laser Ranging Retroreflector (ILRS): https://ilrs.cddis.eosdis.nasa.gov/missions/satellite_missions/current_missions/ap11_general.html

NASA's historical archives serve as the authoritative record for all dates, technical specifications, and mission timelines.
