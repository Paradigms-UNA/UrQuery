import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Navbar } from './components/Navbar';
import { EditingArea } from './components/EditingArea';
import { DocumentArea } from './components/DocumentArea';
import { useState, useLayoutEffect } from 'react';
import compileService from './service/compileService.mjs';
import documentService from './service/documentService.mjs';
import { ResultArea } from './components/ResultArea';

/**
 * TODO Components to program:
 * -> Navbar exists but, we have to do the click button logic (the aboutService.js)
 * -> DA make from 0, also do the documentService.js, which should connect with the /document/DDDD service 
 *    -- Must render the load button which triggers the call to the service
 * 
 * -> EA make from 0, also do the compileService.js file.
 *     --- must render the compile button, which triggers logic
 *  
 * -> RA make from 0, must listen to the change of the value in EA. 
 *    -- Probably using "useContext" hook
 *    -- After EA and DA are complete
 * 
 */

const App = () => {

  const [code, setCode] = useState(null);
  const [compiling, setCompiling] = useState(false);
  const [xml, setXml] = useState('');
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('');

  const onEditorsChange = (target, value) => {
    target === 'EA' ? setCode(value) : setXml(value);
  }


  useLayoutEffect(() => {
    //Validate is compiling

    // Validate there's something in DA - Sprint 2

    // Validate if the script is compiled - Sprint 2


    //Change this once the SpringBoot Server is done
    if (compiling) {
      compileService.compile(code)
        .then(response => setResult(response.data.data))
        .then(setCompiling(false))
        .catch(err => console.log(err))
    }
  }, [compiling, code])

  useLayoutEffect(() => {

    if (loading) {
      // TODO Change to get from an input
      documentService.loading("1")
        .then(response => setXml(response.data))
        .then(setLoading(false))
        .catch(err => console.log(err))
    }
    //loading ? setTimeout(() => {setXml(documentService.loading(xml)); setLoading(false);}, 3000) : setResult('');

    //console.log(xml)
  }, [loading])


  return (
    <div className='container-fluid spa'>
      <Navbar />
      <div className='row h-50'>
        <div className='col lside'>

          <div>
            <DocumentArea onChange={onEditorsChange} documentXml={xml} />
            <button className='btn btn-success mb-2' onClick={() => setLoading(true)}>{loading ? 'en desarrollo' : 'Load'}</button>
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
