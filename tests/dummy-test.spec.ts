import Ajv from "ajv";
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    foo: { type: "integer" },
    bar: { type: "string", nullable: true },
  },
  required: ["foo"],
  additionalProperties: false,
};

// validate is a type guard for MyData - type is inferred from schema type

describe("JSON following the schema", () => {
  it("should pass when using every TEx manifest feature", () => {
    const validate = ajv.compile(schema);

    expect(validate({ foo: 1 })).toBe(true);
  });
});
