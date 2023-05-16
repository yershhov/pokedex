import { RefObject } from "react";

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function addZerosAtTheBeginning(num: string) {
  if (num.length < 3) {
    let zeros = "";
    for (let i = 0; i < 3 - num.length; i++) {
      zeros += 0;
    }
    return zeros + num;
  }
  return num;
}
