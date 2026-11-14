#!/usr/bin/env bash
# Tinye NEAR Testnet Deployment Runbook Script
# Follows docs/09-blockchain/TESTNET_DEPLOYMENT.md & CONTRACT_INTERFACE.md

set -euo pipefail

CONTRACT_DIR="contracts/tinye_vault"
NETWORK="testnet"
CONTRACT_ACCOUNT="tinye-vault.testnet"
OWNER_ACCOUNT="admin.tinye.testnet"
TREASURY_ACCOUNT="treasury.tinye.testnet"

echo "=== [1/4] Checking Rust and Cargo ==="
cargo --version

echo "=== [2/4] Building WASM artifact ==="
cd "$CONTRACT_DIR"
if command -v cargo-near &> /dev/null; then
    cargo near build
else
    cargo build --target wasm32-unknown-unknown --release
fi
cd -

echo "=== [3/4] Deploying to NEAR Testnet ==="
# near contract deploy $CONTRACT_ACCOUNT use-file $CONTRACT_DIR/target/near/tinye_vault.wasm without-init-call network-config $NETWORK sign-as $CONTRACT_ACCOUNT

echo "=== [4/4] Initialising Contract ==="
# near contract call-function as-transaction $CONTRACT_ACCOUNT initialise json-args "{\"owner_id\":\"$OWNER_ACCOUNT\",\"treasury_id\":\"$TREASURY_ACCOUNT\",\"allowed_assets\":[\"$CONTRACT_ACCOUNT\"]}" prepaid-gas "100.0 Tgas" attached-deposit "0 NEAR" sign-as $OWNER_ACCOUNT network-config $NETWORK

echo "=== Deployment preparation ready ==="

