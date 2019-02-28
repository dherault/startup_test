import { Drug, Pharmacy } from "./pharmacy";
import assert from "assert";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)]
    );

    expect(new Pharmacy([new Drug("test", 1, 2)]).updateBenefitValue()).toEqual(
      [new Drug("test", 0, 1)]
    );
  });

  it("should once the expiration date has passed degrade benefit twice as fast", () => {
    expect(new Pharmacy([new Drug("test", 0, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", -1, 1)]
    );

    expect(
      new Pharmacy([new Drug("test", -1, 1)]).updateBenefitValue()
    ).toEqual([new Drug("test", -2, 0)]);
  });

  it("should never have a negative benefit and a benefit over 50", () => {
    const drugs = [];
    const drugNames = [
      "Doliprane",
      "Herbal Tea",
      "Fervex",
      "Magic Pill",
      "Dafalgan",
      "test"
    ];

    drugNames.forEach(drugName => {
      for (let expiresIn = -10; expiresIn <= 10; expiresIn++) {
        for (let benefit = 0; benefit <= 60; benefit++) {
          drugs.push(new Drug(drugName, expiresIn, benefit));
        }
      }
    });

    drugs.forEach(drug => {
      const pharmacy = new Pharmacy([drug]);

      for (let i = 0; i < 60; i++) {
        const updatedDrug = pharmacy.updateBenefitValue()[0];

        assert(updatedDrug.benefit >= 0);
        assert(updatedDrug.benefit <= 50);
      }
    });
  });

  it("should increase Herbal Tea's benefit the older it gets", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 2, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", 1, 4)]);

    expect(
      new Pharmacy([new Drug("Herbal Tea", -1, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", -2, 4)]);
  });

  it("should never expire of decrease in benefit Magic Pill", () => {
    expect(
      new Pharmacy([new Drug("Magic Pill", 2, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Magic Pill", 2, 3)]);
  });

  it("should increase Fervex's benefit appropriately ", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 20, 30)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 19, 31)]);

    expect(
      new Pharmacy([new Drug("Fervex", 10, 30)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 9, 32)]);

    expect(
      new Pharmacy([new Drug("Fervex", 6, 30)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 5, 32)]);

    expect(
      new Pharmacy([new Drug("Fervex", 5, 30)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 4, 33)]);

    expect(
      new Pharmacy([new Drug("Fervex", 4, 30)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 3, 33)]);

    expect(
      new Pharmacy([new Drug("Fervex", 0, 30)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", -1, 0)]);
  });

  it("should decrease Dafalgan's benefit twice as fast", () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", 20, 20)]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", 19, 18)]);

    expect(
      new Pharmacy([new Drug("Dafalgan", 19, 18)]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", 18, 16)]);
  });
});
