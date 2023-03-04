import Ajv, { Schema, ValidateFunction } from "ajv";
const ajv: Ajv = new Ajv({ allowUnionTypes: true });

const categorySchemaValidator:Schema = {
    type:"object",
    name:{
        type:String
    },
    icon:{
        type:String
    },
    color:{
        type:String
    },
    additionalProperties: false,
    required: ["name"]
}

export const validateCategory: ValidateFunction = ajv.compile(
    categorySchemaValidator
);