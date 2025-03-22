 // Format card number with spaces
 export const formatCardNumber = (value:string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };


 // Detect card type based on number
 export const detectCardType = (number: string) => {
    const cardNum = number.replace(/\s+/g, '');
    
    if (/^4/.test(cardNum)) return 'Visa';
    if (/^5[1-5]/.test(cardNum)) return 'Mastercard';
    if (/^3[47]/.test(cardNum)) return 'Amex';
    if (/^(6011|65|64[4-9])/.test(cardNum)) return 'Discover';
    if (/^3(?:0[0-5]|[68])/.test(cardNum)) return 'Dinersclub';
    if (/^(?:2131|1800|35)/.test(cardNum)) return 'Jcb';
    
    return '';
};

 // Format expiry date (MM/YY)
export const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 3) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    
    return v;
  };