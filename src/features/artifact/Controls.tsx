import { ComponentProps } from 'react';
import { PresentationControls } from '@react-three/drei';

/**
 * Controls for making artifact spinnable on drag
 */
export const Controls = ({ children, rotation, ...props }: ComponentProps<typeof PresentationControls>) => (
  <PresentationControls
    config={{ mass: 1, tension: 80, friction: 12 }}
    cursor={false}
    speed={1.5}
    global
    polar={[0, 0]}
    rotation={rotation}
    {...props}>
    {children}
  </PresentationControls>
);
