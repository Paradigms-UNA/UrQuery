import React, { useState } from "react";
import Button from "react-bootstrap/Button";
// import { toast } from "react-toastify";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { CodeEditor } from "./CodeEditor";
import { useScript } from "../hooks/useScript";

export const EditingArea = () => {
  const { code, setCode, currentScript, setCurrentScript, handleFormatXML } =
    useGlobalContext();
  const [compiling, setCompiling] = useState(false);

  const { scriptsList, editScript, saveScript } = useScript();

  const onEditorsChange = (value) => {
    setCode(value);

    setCurrentScript((prev) => ({
      ...prev,
      data: value,
    }));
  };

  const handleViewScript = (e) => {
    const id = e.target.value;

    const script = scriptsList.find((script) => script.id === id);

    if (!script) return;

    setCurrentScript(script);
    setCode(script.data);
  };

  const handleSaveScript = () => {
    if (currentScript?.id) {
      editScript();
      return;
    }

    saveScript();
  };

  const handleClearEditor = () => {
    setCurrentScript({});
    setCode("");
  };

  /*   useLayoutEffect(() => {
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
  }, [compiling, code, setResult, showError]); */

  return (
    <>
      <CodeEditor language="xml" onChange={onEditorsChange} textValue={code} />

      <div className="d-flex flex-wrap justify-content-between gap-3 mt-3">
        <div className="flex-fill">
          <select
            className="form-select form-select-custom"
            onChange={handleViewScript}
            value={currentScript?.id || "default"}
          >
            <option value="default" hidden>
              Select a script
            </option>

            {scriptsList.map((script) => (
              <option key={script.id} value={script.id}>
                {script.title}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <Button variant="btn btn-custom" onClick={() => setCompiling(true)}>
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
            onClick={() => handleFormatXML(code, setCode)}
          >
            Format
          </Button>

          <Button variant="btn btn-custom" onClick={handleSaveScript}>
            Save
          </Button>

          <Button variant="btn btn-custom" onClick={handleClearEditor}>
            Clear
          </Button>
        </div>
      </div>
    </>
  );
};
