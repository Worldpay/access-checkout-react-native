import type CardDetails from "../src/CardDetails";

describe("CardDetails", () => {
  it("can be used to build an object with a pan, an expiry date and a cvv", () => {
    const cardDetails: CardDetails = {
      pan: "4444",
      expiryDate: "12/21",
      cvv: "123",
    };

    expect(cardDetails.pan).toEqual("4444");
    expect(cardDetails.expiryDate).toEqual("12/21");
    expect(cardDetails.cvv).toEqual("123");
  });

  it("can be used to build an object with just a cvv", () => {
    const cardDetails: CardDetails = {
      cvv: "123",
    };

    expect(cardDetails.cvv).toEqual("123");
  });
});
