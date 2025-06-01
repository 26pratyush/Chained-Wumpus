// Wumpus World NFT Game (4x4 grid, with breeze/stench hints and covered cells)

import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import MemoryToken from "../abis/MemoryToken.json";

const CELL_IMAGES = {
  covered: "/images/covered.png", // new default tile for all hidden cells
  empty: "/images/empty.png",
  player: "/images/player.png",
  pit: "/images/pit.png",
  wumpus: "/images/wumpus.png",
  gold: "/images/gold.png",
  dead: "/images/dead.png",
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      token: null,
      totalSupply: 0,
      tokenURIs: [],
      grid: [],
      playerPos: [0, 0],
      gameStatus: "playing",
      perception: ""
    };
  }

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    this.initGame();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        alert("User denied account access");
      }
    } else {
      alert("Non-Ethereum browser detected. Please install MetaMask!");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    const networkData = MemoryToken.networks[networkId];
    if (networkData) {
      const token = new web3.eth.Contract(MemoryToken.abi, networkData.address);
      this.setState({ token });

      const totalSupply = await token.methods.totalSupply().call();
      this.setState({ totalSupply });

      const tokenURIs = [];
      const balanceOf = await token.methods.balanceOf(accounts[0]).call();
      for (let i = 0; i < balanceOf; i++) {
        const id = await token.methods.tokenOfOwnerByIndex(accounts[0], i).call();
        const tokenURI = await token.methods.tokenURI(id).call();
        tokenURIs.push(tokenURI);
      }
      this.setState({ tokenURIs });
    } else {
      alert("Smart contract not deployed to detected network.");
    }
  }

  initGame = () => {
    const getRandomPos = () => [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
    let grid = Array(4).fill(null).map(() => Array(4).fill("empty"));
    const used = new Set();

    const mark = (label) => {
      let [x, y] = getRandomPos();
      while (used.has(`${x},${y}`)) {
        [x, y] = getRandomPos();
      }
      used.add(`${x},${y}`);
      grid[x][y] = label;
      return [x, y];
    };

    const playerPos = mark("player");
    mark("pit");
    mark("wumpus");
    mark("gold");

    const perception = this.getPerception(playerPos, grid);
    const tokenURIs = [];
    this.setState({ grid, playerPos, gameStatus: "playing", perception, tokenURIs });
  };

  getPerception = ([x, y], grid) => {
    const directions = [[-1,0], [1,0], [0,-1], [0,1]];
    let breeze = false, stench = false;

    directions.forEach(([dx, dy]) => {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < 4 && ny < 4) {
        const cell = grid[nx][ny];
        if (cell === "pit") breeze = true;
        if (cell === "wumpus") stench = true;
      }
    });

    if (breeze && stench) return "You feel a breeze and a stench nearby...";
    if (breeze) return "You feel a breeze nearby...";
    if (stench) return "You smell something foul nearby...";
    return "All seems calm...";
  };

  move = (dx, dy) => {
    if (this.state.gameStatus !== "playing") return;

    let [x, y] = this.state.playerPos;
    const newX = x + dx;
    const newY = y + dy;
    if (newX < 0 || newY < 0 || newX > 3 || newY > 3) return;

    const grid = this.state.grid.map(row => row.slice());
    grid[x][y] = "empty";
    const cell = grid[newX][newY];

    let status = "playing";
     if (cell === "pit"){
	grid[newX][newY] = "pit";
	status="dead";
    }

    if (cell === "wumpus") {
      grid[newX][newY] = "wumpus";
      status = "dead";
    }else if (cell === "gold") {
      status = "won";
    }
    if (status !== "dead") grid[newX][newY] = "player";

    const perception =
      status === "dead"
        ? "You have met a terrible fate..."
        : status === "won"
        ? "You found the gold! You win!"
        : this.getPerception([newX, newY], grid);
    this.setState({ grid, playerPos: [newX, newY], gameStatus: status, perception }, () => {
      if (status === "won") this.mintNFT("/images/gold.png");
    });
  };

  async mintNFT(uri) {
    try {
      await this.state.token.methods
        .mint(this.state.account, uri)
        .send({ from: this.state.account })
        .on("transactionHash", hash => {
          this.setState({ tokenURIs: [...this.state.tokenURIs, uri] });
        });
    } catch (err) {
      console.error("Minting failed", err);
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark p-2">
          <span className="navbar-brand">Wumpus World NFT</span>
          <small className="text-light">{this.state.account}</small>
        </nav>

        <div className="container mt-5 pt-4 text-center">
          <h3>{this.state.perception}</h3>
          <div className="d-flex justify-content-center align-items-start flex-wrap mt-4">
  <div className="grid me-4">
    {this.state.grid.map((row, i) => (
      <div key={i} className="row d-flex justify-content-center">
        {row.map((cell, j) => {
          const isPlayer = this.state.playerPos[0] === i && this.state.playerPos[1] === j;
          const visible = isPlayer || this.state.gameStatus !== "playing";
          const img = visible ? CELL_IMAGES[cell] : CELL_IMAGES.covered;
          return (
            <img
  key={`${i}-${j}`}
  src={img}
  alt={cell}
  width="64"
  height="64"
  className="grid-tile"
/>

          );
        })}
      </div>
    ))}
  </div>

  <div className="joystick">
    <div className="empty"></div>
    <button onClick={() => this.move(-1, 0)} className="btn btn-primary">⬆️</button>
    <div className="empty"></div>
    <button onClick={() => this.move(0, -1)} className="btn btn-primary">⬅️</button>
    <div className="empty"></div>
    <button onClick={() => this.move(0, 1)} className="btn btn-primary">➡️</button>
    <div className="empty"></div>
    <button onClick={() => this.move(1, 0)} className="btn btn-primary">⬇️</button>
    <div className="empty"></div>
  </div>
</div>

          <div className="mt-4">
            <h5>NFT Tokens Collected: {this.state.tokenURIs.length}</h5>
            <div className="grid">
              {this.state.tokenURIs.map((uri, idx) => (
                <img key={idx} src={uri} alt="token" width="85" height="85" className="m-1" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
