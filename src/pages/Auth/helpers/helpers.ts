export const filterPhoneNumber = (str: string) => // +70000000000
  "+" +
  str
    .split("")
    .filter((num) => num === "0" || Number(num))
    .join("");
    
export const filterOtp = (str: string) => // 000000
  str
    .split("")
    .filter((num) => num === "0" || Number(num))
    .join("");
