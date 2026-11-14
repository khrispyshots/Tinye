import { chromium } from '@playwright/test';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const origin = process.env.TINYE_TEST_URL || 'http://127.0.0.1:3010';
const chrome = ['C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find(existsSync);
const browser = await chromium.launch({headless:true,...(chrome ? {executablePath:chrome} : {})});
const results = [];
mkdirSync('test-results/screenshots',{recursive:true});
try {
  for (const width of [360,390,768,1440]) {
    const context = await browser.newContext({viewport:{width,height:900}});
    const page = await context.newPage();
    const errors=[]; page.on('pageerror',e=>errors.push(e.message));
    await page.goto(origin,{waitUntil:'networkidle',timeout:120000});
    await page.getByRole('button',{name:/explore|look around|preview/i}).click();
    await page.getByRole('heading',{name:'Make room for tomorrow.'}).waitFor();
    const overflow = async () => page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    assert.equal(await overflow(),false,`dashboard overflow ${width}`);
    await page.screenshot({path:`test-results/screenshots/home-${width}.png`,fullPage:true});
    await page.getByRole('button',{name:'Open wallet',exact:true}).click();
    await page.getByRole('heading',{name:'My Wallet',exact:true}).waitFor();
    assert.equal(await overflow(),false,`wallet overflow ${width}`);
    assert.equal(await page.getByRole('button',{name:/Send Coming soon/i}).isDisabled(),true);
    await page.screenshot({path:`test-results/screenshots/wallet-${width}.png`,fullPage:true});
    const nav = page.getByRole('navigation',{name:width<768?'Mobile navigation':'Main navigation'});
    await nav.getByRole('button',{name:'Goals',exact:true}).click();
    await page.getByRole('heading',{name:'Savings Goals'}).waitFor();
    await page.getByRole('button',{name:'New Goal',exact:true}).click();
    await page.getByRole('dialog').waitFor();
    await page.keyboard.press('Escape');
    await page.getByRole('dialog').waitFor({state:'hidden'});
    await page.getByRole('button',{name:'Profile',exact:true}).filter({visible:true}).first().click();
    await page.getByRole('heading',{name:'Your profile'}).waitFor();
    assert.equal(await overflow(),false,`profile overflow ${width}`);
    await page.screenshot({path:`test-results/screenshots/profile-${width}.png`,fullPage:true});
    assert.deepEqual(errors,[],`browser errors ${width}`);
    results.push({width,status:'passed',checks:['dashboard','wallet','goals','goal dialog Escape','profile','no horizontal overflow','no fabricated send success','no browser page errors']});
    await context.close();
  }
} finally { await browser.close(); writeFileSync('test-results/browser-check.json',JSON.stringify({origin,results,limits:'Read-only disconnected UI checks. Does not claim authenticated wallet signing or financial execution.'},null,2)); }
console.log(JSON.stringify(results,null,2));
