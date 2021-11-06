let commaFormat = (x) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
  });

  let numString;

  let trimmer = (n) => {
    if (n.slice(-3) === ".00") {
      n = n.slice(0, n.length - 3);
    }
    return n;
  };

  if (x >= 1000000) {
    x = x / 1000000;

    numString = formatter.format(x);

    numString = trimmer(numString) + "M";
  } else {
    numString = formatter.format(x);
    numString = trimmer(numString);
  }

  return numString;
};

export default commaFormat;
