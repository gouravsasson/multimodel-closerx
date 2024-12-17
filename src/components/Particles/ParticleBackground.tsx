import React from "react";
import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
// import type { Engine } from "tsparticles-engine";
import { particlesConfig } from "./config";

export const ParticleBackground: React.FC = () => {
  const particlesInit = React.useCallback(async () => {
    // await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesConfig}
      className="absolute inset-0 -z-10"
    />
  );
};
