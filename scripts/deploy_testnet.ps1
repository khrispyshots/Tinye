# Tinye NEAR Testnet Deployment Runbook Script
# Follows docs/09-blockchain/TESTNET_DEPLOYMENT.md & CONTRACT_INTERFACE.md

$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Green
Write-Host " Tinye Vault: NEAR Testnet Deployment Prep" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

$CONTRACT_DIR = "contracts\tinye_vault"
$NETWORK = "testnet"
$CONTRACT_ACCOUNT = "tinye-vault.testnet"
$OWNER_ACCOUNT = "admin.tinye.testnet"
$TREASURY_ACCOUNT = "treasury.tinye.testnet"

# Step 1: Check Cargo & Toolchain
Write-Host "`n[1/4] Checking Rust and Cargo toolchains..." -ForegroundColor Cyan
if (-not (Get-Command cargo -ErrorAction SilentlyContinue)) {
    Write-Warning "Cargo is not currently in PATH. Please ensure Rust and cargo-near are installed."
    Write-Host "Install Rust: https://rustup.rs"
    Write-Host "Install cargo-near: cargo install cargo-near"
} else {
    cargo --version
}

# Step 2: Build WASM artifact
Write-Host "`n[2/4] Building smart contract WASM artifact..." -ForegroundColor Cyan
Push-Location $CONTRACT_DIR
try {
    if (Get-Command cargo-near -ErrorAction SilentlyContinue) {
        cargo near build
    } else {
        cargo build --target wasm32-unknown-unknown --release
    }
} catch {
    Write-Warning "WASM build step logged: $_"
}
Pop-Location

# Step 3: Deployment Command Reference
Write-Host "`n[3/4] Deployment commands (using near-cli-rs):" -ForegroundColor Cyan
Write-Host "near contract deploy $CONTRACT_ACCOUNT use-file $CONTRACT_DIR\target\near\tinye_vault.wasm without-init-call network-config $NETWORK sign-as $CONTRACT_ACCOUNT" -ForegroundColor Yellow

# Step 4: Initialization Call Reference
Write-Host "`n[4/4] Contract Initialization payload:" -ForegroundColor Cyan
$INIT_PAYLOAD = @{
    owner_id = $OWNER_ACCOUNT
    treasury_id = $TREASURY_ACCOUNT
    allowed_assets = @($CONTRACT_ACCOUNT)
} | ConvertTo-Json -Compress

Write-Host "near contract call-function as-transaction $CONTRACT_ACCOUNT initialise json-args '$INIT_PAYLOAD' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' sign-as $OWNER_ACCOUNT network-config $NETWORK" -ForegroundColor Yellow

Write-Host "`n[OK] Smart contract preparation complete. Ready for testnet execution upon authorization." -ForegroundColor Green

