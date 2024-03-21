import Ajv from "ajv";
import addFormats from "ajv-formats";

describe("JSON following the schema spec but changing query parameters.", () => {
  let jsonValidator: Ajv;

  beforeAll(() => {
    jsonValidator = new Ajv({
      strict: false,
      verbose: true,
    });

    addFormats(jsonValidator);
  });

  it("should error when using empty query parameter", async () => {
    const useCase = (
      await import("./use-cases/full-featured--tex-manifest.json")
    ).default;

    const schema = await import("../manifest.json");

    const validate = jsonValidator.compile(schema);

    useCase.modules[0].queryParameters = {
      ava: "{{  }}",
    } as any;

    expect(validate(useCase)).toBe(false);
  });

  it("should error when using a non existing query parameter", async () => {
    const useCase = (
      await import("./use-cases/full-featured--tex-manifest.json")
    ).default;

    const schema = await import("../manifest.json");

    const validate = jsonValidator.compile(schema);

    useCase.modules[0].queryParameters = {
      ava: "{{ organizationid }}",
    } as any;

    expect(validate(useCase)).toBe(false);
  });

  it("should be valid when using organizationId", async () => {
    const useCase = (
      await import("./use-cases/full-featured--tex-manifest.json")
    ).default;

    const schema = await import("../manifest.json");

    const validate = jsonValidator.compile(schema);

    useCase.modules[0].queryParameters = {
      ava: "{{ organizationId }}",
    } as any;

    expect(validate(useCase)).toBe(true);
  });

  it("should be valid when using customerId", async () => {
    const useCase = (
      await import("./use-cases/full-featured--tex-manifest.json")
    ).default;

    const schema = await import("../manifest.json");

    const validate = jsonValidator.compile(schema);

    useCase.modules[0].queryParameters = {
      ava: "{{ customerId }}",
    } as any;

    expect(validate(useCase)).toBe(true);
  });

  it("should be valid when using ticketId", async () => {
    const useCase = (
      await import("./use-cases/full-featured--tex-manifest.json")
    ).default;

    const schema = await import("../manifest.json");

    const validate = jsonValidator.compile(schema);

    useCase.modules[0].queryParameters = {
      ava: "{{ ticketId }}",
    } as any;

    expect(validate(useCase)).toBe(true);
  });

  it("should be valid when using accessToken", async () => {
    const useCase = (
      await import("./use-cases/full-featured--tex-manifest.json")
    ).default;

    const schema = await import("../manifest.json");

    const validate = jsonValidator.compile(schema);

    useCase.modules[0].queryParameters = {
      ava: "{{ accessToken }}",
    } as any;

    expect(validate(useCase)).toBe(true);
  });

  it("should be valid when using literal values", async () => {
    const useCase = (
      await import("./use-cases/full-featured--tex-manifest.json")
    ).default;

    const schema = await import("../manifest.json");

    const validate = jsonValidator.compile(schema);

    useCase.modules[0].queryParameters = {
      q1: "literal",
      q2: "{{ literal_estranho }",
      q3: "{ literal_estranho }}",
      q4: "{literal_estranho}",
      q5: "{literal_estranho",
      q6: "literal_estranho}",
    } as any;

    expect(validate(useCase)).toBe(true);
  });
});
