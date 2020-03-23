/**
 * ************************************
 *
 * @module  Ports.tsx
 * @author
 * @date 3/23/20
 * @description Appending volumes to nodes in d3
 * @note Doesn't add a react elemnt to dom
 *
 * ************************************
 */
import React, { useEffect } from 'react';
import * as d3 from 'd3';
// IMPORT HELPERS
import { colorSchemeHash } from '../helpers/colorSchemeHash';

// IMPORT TYPES
import { SNode } from '../App.d';

type Props = {
  volumesOn: boolean;
};

const NodeVolumes: React.FC<Props> = ({ volumesOn }) => {
  useEffect(() => {
    // VOLUMES LOCATION
    const x = 8;
    const y = 20;
    const width = 10;
    const height = 10;
    // VOLUMES VARIABLES
    let nodesWithVolumes: d3.Selection<SVGGElement, SNode, any, any>;
    const volumes: d3.Selection<SVGRectElement, SNode, any, any>[] = [];
    const volumeText: d3.Selection<SVGTextElement, SNode, any, any>[] = [];
    if (volumesOn) {
      // select all nodes with volumes
      nodesWithVolumes = d3
        .select('.nodes')
        .selectAll<SVGGElement, SNode>('g')
        .filter((d: SNode) => d.volumes.length > 0);

      // iterate through all nodes with volumes
      nodesWithVolumes.each(function(d: SNode) {
        const node = this;
        // iterate through all volumes of node
        d.volumes.forEach((vString, i) => {
          let onClick = false;
          let onceClicked = false;
          // add svg volume
          const volume = d3
            .select<SVGElement, SNode>(node)
            .append('rect')
            .attr('class', 'volumeSVG')
            .attr('fill', () => {
              let slicedVString = colorSchemeHash(
                vString.slice(0, vString.indexOf(':')),
              );
              return slicedVString;
            })
            .attr('width', width)
            .attr('height', height)
            .attr('x', x)
            .attr('y', y + i * 12)
            .on('mouseover', () => {
              return vText.style('visibility', 'visible');
            })
            .on('mouseout', () => {
              !onClick
                ? vText.style('visibility', 'hidden')
                : vText.style('visibility', 'visible');
            })
            .on('click', () => {
              onceClicked = !onceClicked;
              onClick = onceClicked;
            });
          // store d3 object in volumes array
          volumes.push(volume);
          // add svg volume text
          const vText = d3
            .select<SVGElement, SNode>(node)
            .append('text')
            .text(vString)
            .attr('class', 'volume-text')
            .attr('fill', 'black')
            .attr('text-anchor', 'end')
            .attr('dx', x - 5)
            .attr('dy', y + (i + 1) * 11)
            .style('visibility', 'hidden');
          // store d3 object in volumes text array
          volumeText.push(vText);
        });
      });
    }

    return () => {
      // before unmounting, if volumes option was on, remove the volumes
      if (volumesOn) {
        volumes.forEach(node => node.remove());
        volumeText.forEach(node => node.remove());
      }
    };
    // only fire when options.volumes changes
  }, [volumesOn]);
  return <></>;
};

export default NodeVolumes;
