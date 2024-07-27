class FellOffTheCityError extends Error {
  constructor() {
    super('The robot fell off the city');
    this.name = 'FellOffTheCityError';
  }
}

class NoFlowerInCornerError extends Error {
  constructor() {
    super('There is no flower in this corner');
    this.message = 'NoFlowerInCornerError';
  }
}

class NoPaperInCornerError extends Error {
  constructor() {
    super('There is no paper in this corner');
    this.message = 'NoPaperInCornerError';
  }
}

class NoFlowerInBackpackError extends Error {
  constructor() {
    super('There is no flower in the backpack');
    this.name = 'NoFlowerInBackpackError';
  }
}

class NoPaperInBackpackError extends Error {
  constructor() {
    super('There is no paper in the backpack');
    this.name = 'NoPaperInBackpackError';
  }
}

export {
  FellOffTheCityError,
  NoFlowerInCornerError,
  NoPaperInCornerError,
  NoFlowerInBackpackError,
  NoPaperInBackpackError
};
