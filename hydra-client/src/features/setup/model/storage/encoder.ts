export function uint8ToBase64(
  data: Uint8Array
): string {
  let binary = "";

  data.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}


export function base64ToUint8(
  data: string
): Uint8Array {

  const binary = atob(data);

  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}