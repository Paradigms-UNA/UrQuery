import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from './components/Navbar';
import { EditingArea } from './components/EditingArea';
import { DocumentArea } from './components/DocumentArea';
import {useState, useLayoutEffect, useRef} from 'react';
import compileService from './service/compileService.mjs';
import documentService from './service/documentService.mjs';
import { ResultArea } from './components/ResultArea';
import {type} from "@testing-library/user-event/dist/type";

const App = () => {

  const [code, setCode] = useState(null);
  const [compiling, setCompiling] = useState(false);
  const [xml, setXml] = useState('');
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('');
  const [idDocument,setIdDocument] = useState(null);

  const onEditorsChange = (target, value) => {
    target === 'EA' ? setCode(value) : setXml(value);
  }

  const showError = (statusCode) => {
    console.log(statusCode);
    let message = '';
    switch(statusCode)  {
      case 404: message = 'Document Not Found'; break;
      case 500: message = 'Prolog Connection Error'; break;
      default: message = 'Unkown Error';
    }
    toast.error(message);
  }

  useLayoutEffect(() => {
    //Validate is compiling

    //Change this once the SpringBoot Server is done
    if (compiling) {
      if (!!code) {
        compileService.compile(code)
          .then(response => setResult(response.data.data))
          .then(setCompiling(false))
          .catch(err => showError(err.response.status))
      } else {
        setCompiling(false);
        toast.error("There has to be code in Editing Area and XML in Document Area");
      }
    }
  }, [compiling, code])

  useLayoutEffect(() => {

    if (loading) {
      if(!!idDocument){
        documentService.loading(idDocument)
            .then(response => setXml(response.data))
            .then(setLoading(false))
            .catch(err =>  showError(err.response.status))
      }
      else {
        setLoading(false);
        toast.error("You should complete Document ID field");
      }
    }


  }, [loading, xml])


  return (
    <div className='container-fluid spa'>
      <Navbar />
      <ToastContainer />
      <div className='row h-50'>
        <div className='col lside'>
          <div>
            <DocumentArea onChange={onEditorsChange} documentXml={xml} />
            <button className='btn btn-success mb-2' onClick={() => setLoading(true)}>{loading ? 'en desarrollo' : 'Load'}</button>
            <input  style={{marginLeft: "30px"}} type="text" className="rounded-input-block"
                   onChange={(e) => setIdDocument(e.target.value)}
                   placeholder="Document ID">
            </input>
          </div>

          <div>
            <EditingArea onChange={onEditorsChange} code={code} />
            <button className='btn btn-success' onClick={() => setCompiling(true)}>{compiling ? 'Compiling...' : 'Compile'}</button>
          </div>

        </div>
        <div className='col rside d-flex align-items-center'>
          <ResultArea res={result}></ResultArea>
        </div>
      </div>
    </div>
  );
}

export default App;
