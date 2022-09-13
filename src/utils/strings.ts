export const shortAddressFormatted = (address: string) => {
  if (address.length > 20)
    return `${address?.slice(0, 6)}...${address?.slice(-4)}`;

  return address;
};

export const shortText = (text: string) => {
  if (text.length > 50) return `${text?.slice(0, 50)}...`;

  return text;
};
