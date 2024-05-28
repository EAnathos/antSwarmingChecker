import { CommandInteraction } from "discord.js";
import {
  predictSwarmingByMonthAndArea,
  predictSwarmingByMonth,
  predictSwarmingByArea,
} from "../../src/slashCommands/essaimage";

describe("testing predictSwarmingByMonthAndArea function", () => {
  test("predictSwarmingByMonthAndArea()", () => {
    const month: string = "Kisaragi";
    const area: string = "01";

    expect(predictSwarmingByMonthAndArea(month, area)).toBe(
      `Aucun essaimage n'est prévu pour le département \`${area}\` au mois de \`${month}\`.`
    );
  });
});
