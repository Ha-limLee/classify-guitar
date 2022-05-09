import React from 'react';
import ImageUploadContainer from './components/ImageUploadContainer';
import ImageUpload from './components/ImageUpload';
import GuitarColumnContainer from './components/GuitarColumnContainer';
import GuitarColumn from './components/GuitarColumn';
import GuitarImg from './components/GuitarImg';
import Loader from './components/Loader';

import { useGuitarState, useGuitarDispatch, Guitar, GuitarDispatch } from './contexts/GuitarContext';
import * as tf from '@tensorflow/tfjs';
import { curryNode, curry, toGenerator } from './util';

const reader = new FileReader();

/**
 * the reader executes this function when onload event occured;
 * @param model 
 * @param dispatch 
 * @param e 
 * @returns 
 */
function handleLoad (model: tf.LayersModel, dispatch: GuitarDispatch, e: ProgressEvent<FileReader>) {
  const img = new Image();
  img.src = e.target?.result as any;
  if (!img.src)
    return;
  img.onload = ev => {
    const tensor = tf.browser.fromPixels(img)
                              .resizeBilinear([180, 180])
                              .mean(2)
                              .div(255)
                              .toFloat()
                              .expandDims(0)
                              .expandDims(-1);
    const predicted = model.predict(tensor) as tf.Tensor;
    predicted.print();
    
    const classes = ['lespaul', 'sg', 'strat', 'tele'];
    const predictedIdx = predicted.as1D().argMax().dataSync()[0];
    console.log(classes[predictedIdx]);
    dispatch({type: 'push', target: classes[predictedIdx] as Guitar, element: img.src});
  };
}

function _handleChange(files: Generator<File>){
  const {value, done} = files.next();
  if (done)
    return;
  reader.onloadend = () => _handleChange(files);
  reader.readAsDataURL(value);
}

function handleChange(e: React.ChangeEvent<HTMLInputElement>){
  if (e.target.files) {
    const files = Array.from(e.target.files);
    _handleChange(toGenerator(files));
  }
}

export default function App() {
  const state = useGuitarState();
  const dispatch = useGuitarDispatch();
  const [model, setModel] = React.useState<tf.LayersModel>();
  
  React.useEffect(() => {
    (async () => {
      const res = await (await fetch('/get/model.json')).json()
      const createdModel = await tf.models.modelFromJSON(res);
      setModel(createdModel);
      reader.onload = curry(handleLoad)(createdModel)(dispatch);
      console.log(createdModel.summary());
    })();
  }, []);

  return (
    <ImageUploadContainer>
          {model ? <ImageUpload onChange={handleChange}/> : <Loader/>}
          <GuitarColumnContainer> 
            {Object.keys(Guitar).map(guitarType => 
              curryNode(() => GuitarColumn, 2)
                ({head: <GuitarImg alt={guitarType} src={`/images/guitar-classes/${guitarType}.jpg`}/>})
                ({children: state[guitarType as Guitar].map(x => <GuitarImg src={x}/>)})
            )}
          </GuitarColumnContainer>
    </ImageUploadContainer>
  );
}
