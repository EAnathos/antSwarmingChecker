import { predictSwarming } from "../../src/utils/swarmPrediction";

describe("testing predictSwarmingByMonthAndArea function", () => {
  test("predictSwarmingByMonthAndArea()", () => {
    const month: string = "Kisaragi";
    const area: string = "01";

    expect(predictSwarming(month, area)).toBe(
      `Aucun essaimage n'est prévu pour le département \`${area}\` au mois de \`${month}\`.`
    );
  });
});
