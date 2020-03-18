/**
 * ************************************
 *
 * @module  D3Wrapper.tsx
 * @author
 * @date 3/11/20
 * @description Container to hold all the d3 visualation components
 *
 * ************************************
 */
import React from 'react';
import ServicesWrapper from './ServicesWrapper';
import FileSelector from './FileUpload';
import VolumesWrapper from './VolumesWrapper';

//type import
import { FileUpload, Services, SetSelectedContainer } from '../App.d';

type Props = {
  fileUpload: FileUpload;
  setSelectedContainer: SetSelectedContainer;
  fileUploaded: boolean;
  services: Services;
};

const D3Wrapper: React.FC<Props> = ({
  fileUploaded,
  fileUpload,
  services,
  setSelectedContainer,
}) => {
  return (
    <div className="d3-wrapper">
      {!fileUploaded ? (
        <FileSelector fileUpload={fileUpload} locatedWithinVisualizer={true} />
      ) : (
        <>
          <ServicesWrapper
            services={services}
            setSelectedContainer={setSelectedContainer}
          />
          <VolumesWrapper />
        </>
      )}
    </div>
  );
};

export default D3Wrapper;
