import { useCallback, useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { Container, Engine, ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

export default function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    console.log('Particles loaded:', container);
  }, []);

  const options: ISourceOptions = {
    fullScreen: {
      enable: true,
      zIndex: 0
    },
    fpsLimit: 60,
    particles: {
      number: {
        value: 80,
        density: {
          enable: true
        }
      },
      color: {
        value: ['#a8d8ea', '#b3e5fc', '#81d4fa', '#4fc3f7', '#ffffff']
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: { min: 0.1, max: 0.5 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false
        }
      },
      size: {
        value: { min: 1, max: 5 },
        animation: {
          enable: true,
          speed: 2,
          sync: false
        }
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: 'none',
        random: true,
        straight: false,
        outModes: {
          default: 'out'
        }
      },
      links: {
        enable: false
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'bubble',
          parallax: {
            enable: true,
            force: 10,
            smooth: 20
          }
        },
        resize: {
          enable: true,
          delay: 0.5
        }
      },
      modes: {
        bubble: {
          distance: 150,
          size: 8,
          duration: 2,
          opacity: 0.8
        }
      }
    },
    detectRetina: true,
    responsive: [
      {
        maxWidth: 768,
        options: {
          particles: {
            number: {
              value: 40
            },
            move: {
              speed: 0.3
            }
          }
        }
      }
    ],
    background: {
      color: 'transparent'
    }
  };

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
    />
  );
}
