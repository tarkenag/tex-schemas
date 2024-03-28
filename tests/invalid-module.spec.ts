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

  it("should not pass when it has an invalid module", async () => {
    const useCase = (
      await import("./use-cases/invalid-module--tex-manifest.json")
    ).default;

    const schema = await import("../manifest.json");

    const createValidator = () => jsonValidator.compile(schema);

    // Ensure that the compilation of the schema is successful
    expect(() => createValidator()).not.toThrow();

    const validate = createValidator();
    expect(validate(useCase)).toBe(false);
  });
});
