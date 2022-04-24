import React from 'react';
import ImageUploadContainer from './components/ImageUploadContainer';
import ImageUpload from './components/ImageUpload';
import GuitarColumnContainer from './components/GuitarColumnContainer';
import GuitarColumn from './components/GuitarColumn';
import GuitarImg from './components/GuitarImg';
import Loader from './components/Loader';
import { useGuitarState, useGuitarDispatch, Guitar } from './contexts/GuitarContext';
import * as tf from '@tensorflow/tfjs';
import curry from './util/curry';

export default function App() {
  const state = useGuitarState();
  const dispatch = useGuitarDispatch();
  const [model, setModel] = React.useState<tf.LayersModel>();
  
  React.useEffect(() => {
    (async () => {
      const res = await (await fetch('/get/model')).json()
      const createdModel = await tf.models.modelFromJSON(res);
      setModel(createdModel);
      console.log(createdModel.summary());
    })();
  }, []);
  
  function handleLoad(cb?: Function){
    return (e: ProgressEvent<FileReader>) => {
      const img = new Image();
      img.src = e?.target?.result as any;
      if (img.src){
        img.onload = ev => {
          const tensor = tf.browser.fromPixels(img)
                                    .resizeBilinear([180, 180])
                                    .mean(2)
                                    .div(255)
                                    .toFloat()
                                    .expandDims(0)
                                    .expandDims(-1);
          const predicted = model?.predict(tensor) as tf.Tensor;
          predicted.print();
          
          const classes = ['lespaul', 'sg', 'strat', 'tele'];
          const predictedIdx = predicted.as1D().argMax().dataSync()[0];
          console.log(classes[predictedIdx]);
          dispatch({type: 'push', target: classes[predictedIdx] as Guitar, element: img.src})
          if (cb) cb();
        };
      }
    };
  }

  const reader = new FileReader();
  function _handleChange(files: File[]){
    if (files.length === 0) return;

    reader.onload = reader.onload || handleLoad(() => _handleChange(files));
    reader.readAsDataURL(files.pop() as Blob);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    if (e.target.files) {
      const files = Array.from(e.target.files);
      _handleChange(files);
    }
  }

  return (
    <ImageUploadContainer>
      {model ? 
        <>
          <ImageUpload onChange={handleChange}/>
          <GuitarColumnContainer> 
            {Object.keys(Guitar).map(guitarType => 
              curry(() => GuitarColumn)
                ({head: <GuitarImg alt={guitarType} src={`/images/guitar-classes/${guitarType}.jpg`}/>})
                ({children: state[guitarType as Guitar].map(x => <GuitarImg src={x}/>)})
            )}
          </GuitarColumnContainer>
        </> : <Loader/>
      }
    </ImageUploadContainer>
  );
}
