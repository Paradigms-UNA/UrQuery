/*

UrQuery

Autores:
  Elias Arias Muñoz
  Jose Andres Lopez Cruz
  Carlos Albornoz Rondon
  Jose Joaquin Garcia Ramirez
  Julissa Seas Segura

Curso:
  Universidad Nacional
  Facultad de Ciencias Exactas y Naturales
  Escuela de Informática
  EIF-400 Paradigmas de Programación
  II ciclo, 2022
  
*/

import React from "react";

import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DocumentArea } from "./DocumentArea";
import { EditingArea } from "./EditingArea";
import { ResultArea } from "./ResultArea";

export const MainContainer = () => {
  return (
    <div className="container-fluid">
      <Accordion defaultActiveKey={["0", "1", "3"]} alwaysOpen>
        <Row>
          <Col xl={6}>
            <Row>
              <Col className="p-0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="accordion-custom-header">
                    Document Area (DA)
                  </Accordion.Header>
                  <Accordion.Body>
                    {/* Document Area Component */}
                    <DocumentArea />
                  </Accordion.Body>
                </Accordion.Item>
              </Col>
            </Row>

            <Row>
              <Col className="p-0">
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Editing Area (EA)</Accordion.Header>
                  <Accordion.Body>
                    {/* Editing Area Component */}
                    <EditingArea />
                  </Accordion.Body>
                </Accordion.Item>
              </Col>
            </Row>
          </Col>

          <Col xl={6} className="p-0">
            <Accordion.Item eventKey="3">
              <Accordion.Header>Result Area (RA)</Accordion.Header>
              <Accordion.Body>
                {/* Result Area Component */}
                <ResultArea />
              </Accordion.Body>
            </Accordion.Item>
          </Col>
        </Row>
      </Accordion>
    </div>
  );
};
