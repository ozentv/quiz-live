const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const THEME = process.argv[2], OUT = process.argv[3], N = +(process.argv[4] || 5), CD = +(process.argv[5] || 5);
(async () => {
  const b = await chromium.launch({ channel: 'chromium', args: ['--autoplay-policy=no-user-gesture-required'] });
  const ctx = await b.newContext({ viewport: { width: 1080, height: 1920 } }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await ctx.addInitScript(() => {
    const AC = window.AudioContext; let shared = null;
    function get() { if (!shared) { shared = new AC(); shared.__rec = shared.createMediaStreamDestination(); } return shared; }
    window.AudioContext = function () { return get(); }; window.AudioContext.prototype = AC.prototype; window.webkitAudioContext = window.AudioContext;
    const oc = AudioNode.prototype.connect; AudioNode.prototype.connect = function (t, ...a) { const r = oc.call(this, t, ...a); try { if (t && t === this.context.destination && this.context.__rec) oc.call(this, this.context.__rec); } catch (e) {} return r; };
    const op = HTMLMediaElement.prototype.play; HTMLMediaElement.prototype.play = function () { try { if (!this.__routed && !(this instanceof HTMLVideoElement)) { const c = get(); const s = c.createMediaElementSource(this); s.connect(c.destination); this.__routed = true; } } catch (e) {} return op.apply(this, arguments); };
    window.__startRec = () => { const c = get(); c.resume(); window.__chunks = []; const mr = new MediaRecorder(c.__rec.stream, { mimeType: 'audio/webm;codecs=opus', audioBitsPerSecond: 192000 }); mr.ondataavailable = e => e.data.size && window.__chunks.push(e.data); mr.start(500); window.__mr = mr; return Date.now(); };
    window.__stopRec = () => new Promise(r => { window.__mr.onstop = async () => { const u = new Uint8Array(await new Blob(window.__chunks).arrayBuffer()); let s = ''; for (let i = 0; i < u.length; i += 32768) s += String.fromCharCode.apply(null, u.subarray(i, i + 32768)); r(btoa(s)); }; window.__mr.stop(); });
  });
  await p.goto((process.env.SITE || 'http://localhost:8077') + '/index.html');
  await p.evaluate(([th, n, cd, rl, key]) => { const S = JSON.parse(localStorage.getItem('sq-set') || '{}'); Object.assign(S, { mode: 'video', themes: [th], n: n, count: cd, voiceOn: true, voiceEng: 'edge', edgeVoice: 'fr-FR-HenriNeural', relay: rl, lbKey: key, musicOn: true, musicTrack: 'tv', musicVol: 1, tvOn: true, rate: 1.05, brand: 'QUIZGAME', gameOn: false }); localStorage.setItem('sq-set', JSON.stringify(S)); }, [THEME, N, CD, process.env.RELAY || 'http://localhost:10077', process.env.ADMIN_KEY || 'k']);
  await p.reload(); await p.waitForTimeout(1500);
  const dir = OUT + '_frames'; fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  await p.evaluate(() => { const box = document.querySelector('#preroll'); let seen = false; new MutationObserver(() => { if (!box.hidden) seen = true; else if (seen && !window.__preEnd) window.__preEnd = Date.now(); }).observe(box, { attributes: true }); });
  await p.click('#go'); await p.waitForTimeout(300);
  const cdp = await ctx.newCDPSession(p); const frames = [];
  cdp.on('Page.screencastFrame', async f => { const i = frames.length; frames.push(f.metadata.timestamp); fs.writeFileSync(path.join(dir, 'f' + String(i).padStart(5, '0') + '.jpg'), Buffer.from(f.data, 'base64')); try { await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }); } catch (e) {} });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 88, maxWidth: 1080, maxHeight: 1920, everyNthFrame: 1 });
  const recT = await p.evaluate(() => window.__startRec());
  await p.waitForSelector('#endsheet:not([hidden])', { timeout: 240000 });
  await p.waitForTimeout(300);
  await cdp.send('Page.stopScreencast');
  const audio = await p.evaluate(() => window.__stopRec()); fs.writeFileSync(OUT + '.webm', Buffer.from(audio, 'base64'));
  const cap = await p.evaluate(() => document.querySelector('#cap').value);
  const preEnd = await p.evaluate(() => window.__preEnd || 0); fs.writeFileSync(OUT + '.json', JSON.stringify({ recT, frames, cap, preEnd }));
  console.log(THEME, 'frames', frames.length, 'durée', (frames[frames.length - 1] - frames[0]).toFixed(1), 's', 'ERR', errs.slice(0, 3)); await b.close();
})();
