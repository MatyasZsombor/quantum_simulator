import { Lexer, TokenType } from "./lexer"

describe("Lexer", () => {
  test("test a simple create qubit statement", () => {
    const lexer = new Lexer("create qubit q1 = [1 + 2i, 2 - 3i];");
    const tokens = lexer.tokenize();

    expect(tokens).toEqual([
      { type: TokenType.CREATE, value: "create" },
      { type: TokenType.QUBIT, value: "qubit" },
      { type: TokenType.IDENTIFIER, value: "q1" },
      { type: TokenType.EQUALS, value: "=" },
      { type: TokenType.LBRACKET, value: "[" },
      { type: TokenType.NUMBER, value: "1" },
      { type: TokenType.PLUS, value: "+" },
      { type: TokenType.NUMBER, value: "2" },
      { type: TokenType.IMAGINARY_UNIT, value: "i" },
      { type: TokenType.COMMA, value: "," },
      { type: TokenType.NUMBER, value: "2" },
      { type: TokenType.MINUS, value: "-" },
      { type: TokenType.NUMBER, value: "3" },
      { type: TokenType.IMAGINARY_UNIT, value: "i" },
      { type: TokenType.RBRACKET, value: "]" },
      { type: TokenType.SEMICOLON, value: ";" },
    ]);
  });

  test("test numbers with floating points", () => {
    const lexer = new Lexer("create qubit q2 = [1.5 + 2.3i, -3.1 - 4.0i];");
    const tokens = lexer.tokenize();

    expect(tokens).toEqual([
      { type: TokenType.CREATE, value: "create" },
      { type: TokenType.QUBIT, value: "qubit" },
      { type: TokenType.IDENTIFIER, value: "q2" },
      { type: TokenType.EQUALS, value: "=" },
      { type: TokenType.LBRACKET, value: "[" },
      { type: TokenType.NUMBER, value: "1.5" },
      { type: TokenType.PLUS, value: "+" },
      { type: TokenType.NUMBER, value: "2.3" },
      { type: TokenType.IMAGINARY_UNIT, value: "i" },
      { type: TokenType.COMMA, value: "," },
      { type: TokenType.MINUS, value: "-" },
      { type: TokenType.NUMBER, value: "3.1" },
      { type: TokenType.MINUS, value: "-" },
      { type: TokenType.NUMBER, value: "4.0" },
      { type: TokenType.IMAGINARY_UNIT, value: "i" },
      { type: TokenType.RBRACKET, value: "]" },
      { type: TokenType.SEMICOLON, value: ";" },
    ]);
  });

  test("test identifier with i", () => {
    const lexer = new Lexer("create qubit i = [1 + 2i, -3 - 4i];");
    const tokens = lexer.tokenize();

    expect(tokens).toEqual([
      { type: TokenType.CREATE, value: "create" },
      { type: TokenType.QUBIT, value: "qubit" },
      { type: TokenType.IDENTIFIER, value: "i" },
      { type: TokenType.EQUALS, value: "=" },
      { type: TokenType.LBRACKET, value: "[" },
      { type: TokenType.NUMBER, value: "1" },
      { type: TokenType.PLUS, value: "+" },
      { type: TokenType.NUMBER, value: "2" },
      { type: TokenType.IMAGINARY_UNIT, value: "i" },
      { type: TokenType.COMMA, value: "," },
      { type: TokenType.MINUS, value: "-" },
      { type: TokenType.NUMBER, value: "3" },
      { type: TokenType.MINUS, value: "-" },
      { type: TokenType.NUMBER, value: "4" },
      { type: TokenType.IMAGINARY_UNIT, value: "i" },
      { type: TokenType.RBRACKET, value: "]" },
      { type: TokenType.SEMICOLON, value: ";" },

    ]);
  });

  test("test for unexpected tokens", () => {
    const lexer = new Lexer("create unknown@");
    expect(() => lexer.tokenize()).toThrowError("Unexpected token: @");
  });
})
