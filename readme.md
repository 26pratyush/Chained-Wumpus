## 🧠 Wumpus World NFT Game

A Web3 twist on the classic logic puzzle **Wumpus World**, where you dodge pits and a lurking Wumpus to grab gold. If you win, a **unique NFT** gets minted to your wallet.

## 🚀 Tech Stack

| Layer          | Tech Used                    |
| -------------- | ---------------------------- |
| **Frontend**   | React.js, Web3.js, Bootstrap |
| **Backend**    | Solidity (ERC-721 NFT)       |
| **Blockchain** | Ganache (local), Truffle     |
| **Wallet**     | MetaMask                     |
| **Styling**    | Dark mode custom CSS 🎨      |

---

## 📦 Features

* 🧭 4x4 logic grid with player, pits, Wumpus, and gold
* 🎯 Joystick control layout
* 🌬️ Perception system (breeze/stench)
* 💀 Death by pit or Wumpus ends the game
* 🪙 Reach gold = NFT minted to your wallet
* 🧠 Built-in Web3 interaction using MetaMask

---

## 🔧 How to Run Locally

### Prerequisites

* Node.js + npm
* Ganache (desktop app or CLI)
* MetaMask (browser extension)
* Git Bash or Terminal

---

### 1. **Clone the repo**

```bash
git clone https://github.com/26pratyush/Chained-Wumpus
cd Chained-Wumpus
```

---

### 2. **Install dependencies**

```bash
npm install
```

---

### 3. **Start Ganache**

* Open Ganache
* Make sure it runs on `http://127.0.0.1:7545`
* Copy one of the private keys into MetaMask → “Import Account”

---

### 4. **Compile and migrate smart contracts**

```bash
truffle compile
truffle migrate --reset
```

---

### 5. **Start the React app**

```bash
npm start
```

---

### 6. **Connect MetaMask**

* Visit `http://localhost:3000`
* MetaMask will pop up to connect
* Use an imported Ganache account

---

### ✅ You're In!

* Use the joystick to navigate
* Look for clues: breeze = pit nearby, stench = Wumpus nearby
* Find the gold and mint your NFT!

---

## 🖼 NFT Details

* The smart contract mints a **custom ERC-721 NFT** when the player wins
* Metadata is static (for demo): `/images/gold.png`
* Uses the local blockchain (Ganache) for all transactions

---

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── App.js         # Game logic
│   │   ├── App.css        # UI styling
│   ├── abis/              # Contract ABI
├── contracts/
│   └── MemoryToken.sol    # ERC-721 Smart Contract
├── migrations/
│   └── 2_deploy_contracts.js
├── truffle-config.js      # Truffle blockchain config
```

---

## 🚀 Future Upgrades

* Deploy to Polygon Mumbai or Sepolia testnet
* Use IPFS for off-chain NFT metadata
* Add multiple Wumpus and more pits
* Leaderboard and score tracking via smart contracts
* Sound FX, animations, mobile support

---
## Snapshots
![Screenshot (47)](https://github.com/user-attachments/assets/7a71d75a-3ea0-4623-90fe-5c245113c79d)

![Screenshot (48)](https://github.com/user-attachments/assets/7034f235-88c4-47f0-ac93-466ccc6fad85)

![Screenshot (49)](https://github.com/user-attachments/assets/7f1cc4d5-0f09-49bb-b57f-bb08cfd5190e)

![Screenshot (50)](https://github.com/user-attachments/assets/3fcbf5d3-c04e-4df8-880a-375204732661)





## 🧑‍💻 Credits

👤 **Built on top of Memory Tokens**
📫 [Divyank](https://github.com/singhdivyank)
