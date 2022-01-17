export function parseDurationToTimeString(duration: number): string {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  const parsedSeconds = String(seconds).padStart(2, '0');

  const parsedMinutes = hours
    ? String(minutes).padStart(2, '0')
    : String(minutes);

  let timeValues = [parsedMinutes, parsedSeconds];

  if (hours) {
    timeValues = [String(hours), ...timeValues];
  }

  const timeString = timeValues.join(':');

  return timeString;
}
