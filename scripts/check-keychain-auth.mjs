// Positive local acceptance test. Signs a fresh NEP-413 challenge through the OS
// keychain; never exports a signing key or writes authentication cookies to disk.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { join } from 'node:path';
import { chromium } from '@playwright/test';
import { existsSync, mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';
const origin = process.argv.find(value=>value.startsWith('--origin='))?.slice(9) || process.env.TINYE_TEST_URL || 'http://localhost:3000';
if (!/^http:\/\/(localhost|127\.0\.0\.1):(3000|3005|3010)$/.test(origin)) throw new Error('Only local testnet previews are permitted.');
const accountId='tinye.testnet';
const screenshots=process.argv.includes('--screenshots');
const screenshotDir='docs/02-design/submission';
const binary=process.env.TINYE_NEAR_CLI_PATH || join(process.env.LOCALAPPDATA,'Tinye','near-cli','node_modules','near-cli-rs','node_modules','.bin_real','near.exe');
const challengeResponse=await fetch(origin+'/api/auth/challenge',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({accountId}),signal:AbortSignal.timeout(90000)});
assert.equal(challengeResponse.status,200); const challenge=await challengeResponse.json();
const cookie=challengeResponse.headers.get('set-cookie').split(';')[0];
const {stdout,stderr}=await promisify(execFile)(binary,['--quiet','message','sign-nep413','utf8',challenge.message,'nonce',challenge.nonce,'recipient',challenge.recipient,'sign-as',accountId,'sign-with-keychain','network-config','testnet'],{windowsHide:true,timeout:90000,maxBuffer:1024*1024});
const output=stdout+'\n'+stderr;
const match=output.match(/\{[\s\S]*\}/); if(!match)throw new Error('CLI did not return a public signature result.');
const proof=JSON.parse(match[0]);
let signature=proof.signature;
if(typeof signature==='string' && (signature.startsWith('ed25519:') || /^[1-9A-HJ-NP-Za-km-z]{85,90}$/.test(signature))) {
  const { utils } = await import('near-api-legacy');
  signature=Buffer.from(utils.serialize.base_decode(signature.replace(/^ed25519:/,''))).toString('base64');
}
const body={id:challenge.id,accountId,publicKey:proof.publicKey||proof.public_key,signature};
if(!body.publicKey||!body.signature) throw new Error('Unsupported public signature result fields: '+Object.keys(proof).join(','));
const response=await fetch(origin+'/api/auth/verify',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json',Cookie:cookie},body:JSON.stringify(body),signal:AbortSignal.timeout(90000)});
assert.equal(response.status,200,'Genuine keychain proof must authenticate (CLI signature encoding normalised)');
const verified=await response.json(); assert.equal(verified.accountId,accountId);assert.equal(verified.network,'testnet');
if(screenshots)console.log('Verified testnet account; capturing production screens.');
const sessionCookie=response.headers.getSetCookie().find(value=>value.startsWith('tinye_session='))?.split(';')[0]; assert.ok(sessionCookie);
let browser;
try {
  const chrome=['C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find(existsSync);
  browser=await chromium.launch({headless:true,...(chrome?{executablePath:chrome}:{})});
  const context=await browser.newContext({viewport:screenshots?{width:430,height:1050}:{width:390,height:844},deviceScaleFactor:screenshots?2:1,colorScheme:'light'});
  await context.addCookies([{name:'tinye_session',value:sessionCookie.slice('tinye_session='.length),url:origin,httpOnly:true,sameSite:'Strict'}]);
  const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
  // This machine's browser DNS cannot reach the remote font hosts. Fail those
  // requests immediately so the existing system-font fallback can render.
  if(screenshots)await page.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//,route=>route.abort());
  await page.goto(origin,{waitUntil:'domcontentloaded',timeout:120000});
  await page.getByRole('heading',{name:'Hello, tinye.'}).waitFor({timeout:90000});
  if(screenshots){
    mkdirSync(screenshotDir,{recursive:true});
    await page.getByText('Verified on testnet',{exact:true}).waitFor({timeout:90000});
    await page.evaluate(()=>Promise.race([document.fonts.ready,new Promise(resolve=>setTimeout(resolve,5000))]));
    await page.screenshot({path:screenshotDir+'/01-dashboard.png',animations:'disabled'});
    const nav=page.getByRole('navigation',{name:'Mobile navigation'});
    await nav.getByRole('button',{name:'Goals',exact:true}).click();
    await page.getByRole('heading',{name:'Savings Goals'}).waitFor();
    await page.screenshot({path:screenshotDir+'/02-goals.png',animations:'disabled'});
    await page.getByRole('button',{name:'New Goal',exact:true}).click();
    await page.getByLabel('Goal Name',{exact:true}).fill('Emergency reserve');
    await page.getByLabel('Target Amount (NEAR)',{exact:true}).fill('5.00');
    await page.getByRole('button',{name:'Review goal',exact:true}).click();
    await page.getByRole('heading',{name:'Review your goal'}).waitFor();
    await page.screenshot({path:screenshotDir+'/03-goal-review.png',animations:'disabled'});
    await page.keyboard.press('Escape');
    await nav.getByRole('button',{name:'Home',exact:true}).click();
  }
  await page.getByRole('button',{name:'Open wallet',exact:true}).click();
  await page.getByRole('heading',{name:'My Wallet',exact:true}).waitFor();
  if(screenshots)await page.screenshot({path:screenshotDir+'/04-wallet.png',animations:'disabled'});
  await page.getByRole('button',{name:'Receive',exact:true}).click();
  await page.getByRole('dialog').waitFor();
  assert.ok(await page.getByRole('dialog').getByText(accountId,{exact:true}).isVisible());
  await page.getByRole('dialog').locator('img').waitFor();
  mkdirSync('test-results/screenshots',{recursive:true});
  await page.screenshot({path:screenshots?screenshotDir+'/05-receive-near.png':'test-results/screenshots/verified-receive-390.png',animations:'disabled'});
  await page.keyboard.press('Escape');assert.deepEqual(errors,[]);
  console.log('PASS: real keychain NEP-413 proof, testnet session, authenticated dashboard, actual account Receive QR, no browser page errors.');
  console.log('Scope: read-only authenticated browser acceptance; external-provider financial signing is not claimed by this test.');
  if(screenshots)console.log('Five authentic app screenshots saved in '+screenshotDir+'. Goal review is an unsigned draft; no transaction submitted.');
} finally {
  if(browser)await browser.close();
  const logout=await fetch(origin+'/api/auth/logout',{method:'POST',headers:{Origin:origin,Cookie:sessionCookie}});
  assert.equal(logout.status,200);
}
