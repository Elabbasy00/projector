import React from 'react';
import './controller.css';
import Draggable from '../../components/draggable/draggable.component';
import DragView from '../../components/drag-view/drag-view.component';
import { Button } from 'react-bootstrap';
import { Images, Videos, Pdf } from '../../image.data';
const { ipcRenderer } = window.require('electron');

function Controller() {
  function nextPage() {
    ipcRenderer.send('ChangePage', {
      type: 'next',
    });
  }
  function prevPage() {
    ipcRenderer.send('ChangePage', {
      type: 'prev',
    });
  }
  return (
    <div className="controller">
      <DragView />

      <Draggable data={Images} />
      <Draggable data={Videos} />
      <Draggable data={Pdf} />

      <button
        className="projector btn btn-success"
        onClick={() => {
          ipcRenderer.invoke('REQUEST_PROJECTOR_MODE').then((response) => {
            if (response === true) {
              alert('Projector Viwe opned');
            } else {
              alert('Projector not found');
            }
          });
        }}
      >
        Projector
      </button>
      <div className="control-pdf">
        <Button onClick={nextPage}>Next</Button>
        <Button onClick={prevPage}>Prev</Button>
      </div>
    </div>
  );
}

export default Controller;
