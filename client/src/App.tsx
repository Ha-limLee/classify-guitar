import React from 'react';
import ImageUploadContainer from './components/ImageUploadContainer';
import ImageUpload from './components/ImageUpload';
import GuitarColumnContainer from './components/GuitarColumnContainer';
import GuitarColumn from './components/GuitarColumn';
import GuitarImg from './components/GuitarImg';
import { useGuitarState } from './contexts/GuitarContext';

export default function App() {
  const state = useGuitarState();
  return (
    <>
      <ImageUploadContainer>
        <ImageUpload/>
      </ImageUploadContainer>

      <GuitarColumnContainer>
        <GuitarColumn head={
          <GuitarImg alt='stratocaster'src='/images/guitar-classes/stratocaster.jpg'/>
        }>{state.strat}</GuitarColumn>
        <GuitarColumn head={
          <GuitarImg alt='telecaster' src='/images/guitar-classes/telecaster.jpg'/>
        }>{state.tele}</GuitarColumn>
        <GuitarColumn head={
          <GuitarImg alt='les-paul' src='/images/guitar-classes/lespaul.jpg'/>
        }>{state.lespaul}</GuitarColumn>
        <GuitarColumn head={
          <GuitarImg alt='SG' src='/images/guitar-classes/sg.jpg'/>
        }>{state.sg}</GuitarColumn>
      </GuitarColumnContainer>
    </>
  );
}
