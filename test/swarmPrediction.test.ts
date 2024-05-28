import { predictSwarming } from "../src/utils/swarmPrediction";

describe("testing predictSwarming function", () => {
  test("predictSwarmingWithIncorrectMonth", () => {
    const month: string = "Kisaragi";
    const area: string = "01";

    expect(predictSwarming(month, area)).toBe(
      `Aucun essaimage n'est prévu pour le département \`${area}\` au mois de \`${month}\`.`
    );
  });

  test("predictSwarmingWithIncorrectArea", () => {
    const month: string = "janvier";
    const area: string = "011";

    expect(predictSwarming(month, area)).toBe(
      `Aucun essaimage n'est prévu pour le département \`${area}\` au mois de \`${month}\`.`
    );
  });
});
