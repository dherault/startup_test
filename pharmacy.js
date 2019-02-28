const minBenefit = 0;
const maxBenefit = 50;

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    // NOTE: I did alter the Drug class to update how benefit is handled
    this.benefit = Math.max(minBenefit, Math.min(benefit, maxBenefit));
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
      if (drug.name === "Magic Pill") continue;

      // Drugs that increase in benefit
      if (drug.name === "Herbal Tea" || drug.name === "Fervex") {
        if (drug.name === "Fervex") {
          if (drug.expiresIn <= 5) {
            drug.benefit = Math.min(maxBenefit, drug.benefit + 3);
          } else if (drug.expiresIn <= 10) {
            drug.benefit = Math.min(maxBenefit, drug.benefit + 2);
          } else {
            drug.benefit = Math.min(maxBenefit, drug.benefit + 1);
          }
        } else {
          drug.benefit = Math.min(maxBenefit, drug.benefit + 1);
        }
        // Drugs that decrease in benefit
      } else {
        if (drug.name === "Dafalgan") {
          drug.benefit = Math.max(minBenefit, drug.benefit - 2);
        } else {
          drug.benefit = Math.max(minBenefit, drug.benefit - 1);
        }
      }

      drug.expiresIn--;

      // "Herbal Tea" actually increases in Benefit the older it gets
      if (drug.name === "Herbal Tea") continue;

      if (drug.expiresIn < 0) {
        if (drug.name === "Fervex") {
          drug.benefit = 0;
        } else if (drug.benefit > minBenefit) {
          drug.benefit--;
        }
      }
    }

    return this.drugs;
  }
}
