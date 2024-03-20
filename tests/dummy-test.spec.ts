import Ajv from "ajv";
import addFormats from "ajv-formats";

describe("JSON following the schema spec.", () => {
  let jsonValidator: Ajv;

  beforeAll(() => {
    jsonValidator = new Ajv({
      strict: false,
      verbose: true,
    });
    addFormats(jsonValidator);
  });

  it("should pass when using every TEx manifest feature", async () => {
    const useCase = (
      await import("./use-cases/full-featured--tex-manifest.json")
    ).default;

    const schema = await import("../manifest.json");

    const validate = jsonValidator.compile(schema);

    expect(validate(useCase)).toBe(true);
  });
});
