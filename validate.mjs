import fs from 'node:fs';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const js = fs.readFileSync(new URL('./app.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('./styles.css', import.meta.url), 'utf8');
const ids = new Set([...html.matchAll(/id="([^"]+)"/g)].map((match) => match[1]));
const anchorTargets = [...html.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
assert.deepEqual(anchorTargets.filter((target) => !ids.has(target)), [], 'All in-page links must target an existing section');
for (const exhibit of ['eagle', 'sojourner', 'opportunity', 'ingenuity', 'reflector']) {
  assert.ok(html.includes(`data-exhibit="${exhibit}"`) && js.includes(`${exhibit}: {`), `${exhibit} exhibit must have a matching data record`);
}
for (const game of ['landing', 'repair', 'memory']) {
  assert.ok(html.includes(`data-game="${game}"`) && js.includes(`${game}Game`), `${game} game must have a launcher and game logic`);
}
for (const status of ['Different parts had different endings', 'Lost contact in a dust storm', 'Mission ended after rotor damage']) {
  assert.ok(js.includes(status), `Mission status distinction missing: ${status}`);
}
for (const source of ['nasa.gov', 'jpl.nasa.gov', 'nasa.gov/resource/opportunity']) assert.ok(html.includes(source), `Expected NASA citation missing: ${source}`);
assert.ok(css.includes('@media(max-width:980px)') && css.includes('@media(max-width:660px)'), 'Tablet and mobile layouts must be defined');
console.log('Static prototype checks passed: navigation anchors, five exhibits, three game launchers, mission status wording, NASA references, and responsive breakpoints.');
console.log('Run `node --check app.js` separately to check JavaScript syntax.');
