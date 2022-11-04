import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavigationBar } from "./components/NavigationBar";
import { EditingArea } from "./components/EditingArea";
import { DocumentArea } from "./components/DocumentArea";
import { useState, useLayoutEffect } from "react";
import compileService from "./service/compileService.mjs";
import documentService from "./service/documentService.mjs";
import { ResultArea } from "./components/ResultArea";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

const App = () => {
  const [code, setCode] = useState(null);
  const [compiling, setCompiling] = useState(false);
  const [xml, setXml] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [idDocument, setIdDocument] = useState(null);

  const onEditorsChange = (target, value) => {
    target === "EA" ? setCode(value) : setXml(value);
  };

  const showError = (statusCode) => {
    console.log(statusCode);
    let message = "";
    switch (statusCode) {
      case 404:
        message = "Document Not Found";
        break;
      case 500:
        message = "Prolog Connection Error";
        break;
      default:
        message = "Unkown Error";
    }
    toast.error(message);
  };

  useLayoutEffect(() => {
    //Validate is compiling

    if (compiling) {
      if (!!code) {
        compileService
          .compile(code)
          .then((response) => setResult(response.data.data))
          .then(setCompiling(false))
          .catch((err) => showError(err.response.status));
      } else {
        setCompiling(false);
        toast.error("There has to be code in Editing Area to compile");
      }
    }
  }, [compiling, code]);

  useLayoutEffect(() => {
    if (loading) {
      if (!!idDocument) {
        documentService
          .loading(idDocument)
          .then((response) => setXml(response.data))
          .then(setLoading(false))
          .catch((err) => showError(err.response.status));
      } else {
        setLoading(false);
        toast.error("You should complete Document ID field");
      }
    }
  }, [idDocument, loading, xml]);

  return (
    <div className="App">
      <NavigationBar />

      <ToastContainer />

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
                      {/* Componente Editor de Código */}
                      <DocumentArea
                        onChange={onEditorsChange}
                        documentXml={xml}
                      />

                      {/* <button
                        className="btn btn-success mb-2"
                        onClick={() => setLoading(true)}
                      >
                        {loading ? "en desarrollo" : "Load"}
                      </button>

                      <input
                        style={{ marginLeft: "30px" }}
                        type="text"
                        className="rounded-input-block"
                        onChange={(e) => setIdDocument(e.target.value)}
                        placeholder="Document ID"
                      ></input> */}

                      <div className="d-flex flex-wrap justify-content-between gap-3 mt-3">
                        <div className="flex-fill">
                          <select
                            className="form-select form-select-custom"
                            onChange={() => console.log("Select a document")}
                          >
                            <option hidden defaultValue>
                              Select a document
                            </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>

                        <div className="d-flex flex-wrap gap-2">
                          <Button
                            variant="btn btn-custom"
                            onClick={() => {
                              console.log("DA Save");
                            }}
                          >
                            Save
                          </Button>

                          <Button
                            variant="btn btn-custom"
                            onClick={() => setXml("")}
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Col>
              </Row>

              <Row>
                <Col className="p-0">
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Edition Area (EA)</Accordion.Header>
                    <Accordion.Body>
                      {/* Componente Editor de Código */}
                      <EditingArea onChange={onEditorsChange} code={code} />

                      <div className="d-flex flex-wrap justify-content-between gap-3 mt-3">
                        <div className="flex-fill">
                          <select
                            className="form-select form-select-custom"
                            onChange={() => console.log("Select a document")}
                          >
                            <option hidden defaultValue>
                              Select a script
                            </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>

                        <div className="d-flex flex-wrap gap-2">
                          <Button
                            variant="btn btn-custom"
                            onClick={() => setCompiling(true)}
                          >
                            {compiling ? "Compiling..." : "Compile"}
                          </Button>

                          <Button
                            variant="btn btn-custom"
                            onClick={() => {
                              console.log("EA Redisplay");
                            }}
                          >
                            Redisplay
                          </Button>

                          <Button
                            variant="btn btn-custom"
                            onClick={() => {
                              console.log("EA Execute");
                            }}
                          >
                            Execute
                          </Button>

                          <Button
                            variant="btn btn-custom"
                            onClick={() => {
                              console.log("EA Save");
                            }}
                          >
                            Save
                          </Button>

                          <Button
                            variant="btn btn-custom"
                            onClick={() => setCode("")}
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Col>
              </Row>
            </Col>

            <Col xl={6} className="p-0">
              <Accordion.Item eventKey="3">
                <Accordion.Header>Result Area (RA)</Accordion.Header>
                <Accordion.Body>
                  <ResultArea onChange={null} res={result} />

                  <div className="d-flex flex-wrap justify-content-end gap-2 mt-3">
                    <Button
                      variant="btn btn-custom"
                      onClick={() => setResult("")}
                    >
                      Clear
                    </Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Col>
          </Row>
        </Accordion>
      </div>
    </div>
  );
};

export default App;
