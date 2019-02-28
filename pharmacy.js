export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      const drug = this.drugs[i];

      // "Magic Pill" never expires nor decreases in Benefit.
      if (drug.name === "Magic Pill") return this.drugs;

      // Drugs that increase in benefit
      if (drug.name === "Herbal Tea" || drug.name === "Fervex") {
        if (drug.benefit < 50) {
          drug.benefit++;
          if (drug.name === "Fervex" && drug.benefit < 50) {
            if (drug.expiresIn <= 10) {
              drug.benefit++;
            }
            if (drug.expiresIn <= 5) {
              drug.benefit += 2;
            }
          }
        }
        // Drugs that decrease in benefit
      } else {
        if (drug.benefit > 0) {
          if (drug.name === "Dafalgan") {
            drug.benefit -= 2;
          } else {
            drug.benefit--;
          }
        }
      }

      drug.expiresIn--;

      if (drug.expiresIn < 0) {
        if (drug.name === "Herbal Tea") {
          if (drug.benefit < 50) {
            drug.benefit++;
          }
        } else if (drug.name === "Fervex") {
          drug.benefit = 0;
        } else if (drug.benefit > 0) {
          drug.benefit--;
        }
      }
    }

    return this.drugs;
  }
}
