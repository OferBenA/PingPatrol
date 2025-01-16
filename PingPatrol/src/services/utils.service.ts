

export const specialCharacters = '!@#$%^&*()_+}{=~<>';

export function parseJwt (token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}
export function timestampToTime(timeStamp: number | undefined):string{
  return String(new Date(timeStamp ?? "0").toLocaleTimeString("en-GB"))
}
export function timestampToDataAndTime(timeStamp: number | undefined):string{
  const time = new Date(timeStamp ?? "0").toLocaleTimeString("en-GB");
  const day = new Date(timeStamp ?? "0").getDate();
  const month = new Date(timeStamp ?? '0').getMonth()
  const year = new Date(timeStamp ?? '0').getFullYear()
  return `${time}, ${day}-${month +1}-${year}`
}
