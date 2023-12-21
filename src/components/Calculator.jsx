// Calculator.js
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleCalculate = () => {
    try {
      const result = Function(`'use strict'; return (${input})`)();
      setInput(isFinite(result) ? result.toString() : "Error");
    } catch (error) {
      setInput("Error");
    }
  };

  const handleScientificFunction = (func) => {
    setInput((prevInput) => prevInput + func + "(");
  };

  const renderButton = (value, variant, onClick) => (
    <Col xs={6} sm={3} md={2} key={value}>
      <Button variant={variant} onClick={onClick} block size="lg">
        {value}
      </Button>
    </Col>
  );

  return (
    <Container className="calculator1">
      <Container className="calculator">
        <Row>
          <Col xs={12}>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                value={input}
                readOnly
                className="form-control"
                aria-label="Calculator Input"
              />
            </InputGroup>
          </Col>
        </Row>
        {[
          ["7", "8", "9", "/"],
          ["4", "5", "6", "*"],
          ["1", "2", "3", "-"],
          ["0", ".", "+", "="],
        ].map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((value, colIndex) =>
              renderButton(
                value,
                rowIndex === 3 && colIndex === 3 ? "success" : "light",
                rowIndex === 3 && colIndex === 3
                  ? handleCalculate
                  : () => handleClick(value)
              )
            )}
          </Row>
        ))}
        <Row>
          {["sin", "cos", "tan", "sqrt", "(", ")", "C"].map((value) =>
            renderButton(value, value === "C" ? "danger" : "light", () => {
              if (value === "C") {
                handleClear();
              } else {
                handleScientificFunction(value);
              }
            })
          )}
        </Row>
      </Container>
    </Container>
  );
};

export default Calculator;
