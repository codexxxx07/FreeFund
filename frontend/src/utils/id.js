let counter = 0;

/** Stable-enough unique id for locally created list entries. */
export function uid() {
  counter += 1;
  return `r${Date.now().toString(36)}-${counter}`;
}
