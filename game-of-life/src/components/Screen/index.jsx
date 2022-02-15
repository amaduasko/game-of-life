import React, { createRef } from 'react';

import Controls from '../Controls';
import styled from 'styled-components';

const ScreenContainer = styled.canvas`
  display: flex;
  width: 80vw;
  height: 65vh;
  border: 2px solid black;
`;

// cell neighbors coordinates
const cellNeighBors = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [0, -1],
];

class Screen extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = createRef();
  }

  cellSize = 2;
  deadColor = `red`;
  aliveColor = `green`;

  setPoints = () => {
    this.width = this.canvas?.current.width;
    this.height = this.canvas?.current.height;
    this.x = Math.round(this.canvas?.current.width / this.cellSize);
    this.y = Math.round(this.canvas?.current.height / this.cellSize);
  };

  //Paint cells
  fillRect = (x, y) => {
    this.ctx.fillRect(
      x * this.cellSize,
      y * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  };

  // draw field
  draw = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.area.forEach(
      (line, y) => line.forEach((cell, x) => cell && this.fillRect(x, y), this),
      this
    );
  };

  // check cell state
  isAlive = (pointX, pointY) => {
    const count = cellNeighBors.reduce((sum, diff) => {
      const x = pointX - diff[0];
      const y = pointY - diff[1];

      return x < 0 || x >= this.area[0].length || y < 0 || y >= this.area.length
        ? sum
        : sum + this.area[y][x];
    }, 0);

    return this.area[pointY][pointX] ? count === 2 || count === 3 : count === 3;
  };

  // add figures
  addFigure = () => {
    const matrix = Array(this.y)
      .fill(Array(this.x).fill(0))
      .map((line) =>
        line.map(() => (Math.random() / Math.random() > 0.3 ? 0 : 1))
      );
    if (matrix[0].length > this.x || matrix.length > this.y) return;

    for (let index = 0; index < matrix.length; index++) {
      this.area[index] = this.area[index]
        .slice(0, 0)
        .concat(
          matrix[index],
          this.area[index].slice(matrix[index].length, this.x)
        );
    }

    this.draw();
  };

  handleStartGame = () => {
    if (this.gameInterval) return;

    // update interval - time in ms
    this.gameInterval = setInterval(
      (self) => {
        self.area = self.area.map((row, y) =>
          row.map((cell, x) => self.isAlive(x, y))
        );
        self.draw();
      },
      300,
      this
    );
    this.addFigure();
  };

  handleStopGame = () => {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
      this.gameInterval = null;
      this.clearScreen();
    }
  };

  // clear game screen
  clearScreen = () => {
    this.area = Array(this.y)
      .fill(0)
      .map(() => Array(this.x).fill(0));
    this.draw();
  };

  //initialize game
  initialize = () => {
    this.ctx = this.canvas?.current.getContext('2d');
    this.ctx.fillStyle = this.aliveColor;
    this.setPoints();
    this.clearScreen();
  };

  componentDidMount = () => {
    this.initialize();
  };

  componentWillUnmount = () => {
    clearInterval(this.gameInterval);
  };

  render() {
    return (
      <>
        <ScreenContainer ref={this.canvas} />
        <Controls onStart={this.handleStartGame} onStop={this.handleStopGame} />
      </>
    );
  }
}

export default Screen;
