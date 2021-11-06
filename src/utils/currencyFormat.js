let currencyFormat = (x) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let numString;

  let trimmer = (n) => {
    if (n.slice(-3) === ".00") {
      n = n.slice(0, n.length - 3);
    }
    return n;
  };

  if (x >= 1000000 && x < 1000000000) {
    x = x / 1000000;

    numString = formatter.format(x);

    numString = trimmer(numString) + "M";
  } else if (x >= 1000000000) {
    x = x / 1000000000;
    numString = formatter.format(x);

    numString = trimmer(numString) + "B";
  } else {
    numString = formatter.format(x);
    numString = trimmer(numString);
  }

  return numString;
};

export default currencyFormat;
