class FellOffTheCityError extends Error {
  constructor() {
    super("The robot fell off the city");
  }
}

class NoFlowerInCornerError extends Error {
  constructor() {
    super("There is no flower in this corner");
  }
}

class NoPaperInCornerError extends Error {
  constructor() {
    super("There is no paper in this corner");
  }
}

class NoFlowerInBackpackError extends Error {
  constructor() {
    super("There is no flower in the backpack");
  }
}

class NoPaperInBackpackError extends Error {
  constructor() {
    super("There is no paper in the backpack");
  }
}

export {
  FellOffTheCityError,
  NoFlowerInCornerError,
  NoPaperInCornerError,
  NoFlowerInBackpackError,
  NoPaperInBackpackError,
};
