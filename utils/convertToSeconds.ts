const convertToSeconds = (time: string) => {
  const timeString = time; // input string
  const arr = timeString.split(':'); // splitting the string by colon

  const seconds = +arr[0] * 3600 + +arr[1] * 60; // converting

  return seconds ?? 0;
};

export { convertToSeconds };
