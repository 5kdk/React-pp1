const shuffle = unshuffled => {
  const shuffled = [...unshuffled];
  let randomNum = Math.floor(Math.random() * shuffled.length);
  let randomized = [];

  while (shuffled.length) {
    randomized = [...randomized, shuffled.splice(randomNum, 1)[0]];
    randomNum += 1;
    if (randomNum >= shuffled.length) randomNum = 0;
  }

  return randomized;
};

export default shuffle;
