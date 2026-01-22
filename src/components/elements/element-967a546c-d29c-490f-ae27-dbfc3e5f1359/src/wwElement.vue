<template>
  <div class="ww-particles-container" ref="particlesContainer">
    <!-- Particles will be rendered here -->
  </div>
</template>

<script>
export default {
  props: {
    content: { type: Object, required: true },
    uid: { type: String, required: true },
  },
  emits: ['trigger-event'],
  data() {
    return {
      particlesLoaded: false,
      scriptLoaded: false
    };
  },
  computed: {
    isEditing() {
      // eslint-disable-next-line no-unreachable
      return false;
    },
    containerId() {
      return `particles-js-${this.uid.replace(/[^a-z0-9]/gi, '')}`;
    },
    particlesConfig() {
      return {
        particles: {
          number: { 
            value: this.content.particlesNumber !== undefined ? this.content.particlesNumber : 200, 
            density: { 
              enable: this.content.particlesDensity !== undefined ? this.content.particlesDensity : true, 
              value_area: this.content.particlesDensityArea !== undefined ? this.content.particlesDensityArea : 800 
            } 
          },
          color: { value: "#FFFFFF" },
          shape: { type: "circle" },
          opacity: { value: 1, random: false },
          size: {
            value: 1,
            random: true,
            anim: { enable: false }
          },
          line_linked: {
            enable: false
          },
          move: {
            enable: true,
            speed: 0.21,
            direction: "bottom-left",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false },
            gravity: {
              enable: true,
              acceleration: 0,
              maxSpeed: 0
            },
            trail: { enable: false },
            vibrate: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: false },
            onclick: { enable: false },
            resize: true
          },
          modes: {
            grab: {
              distance: 100,
              line_linked: { opacity: 0.2 }
            },
            bubble: {
              distance: 100,
              size: 40,
              duration: 0.4
            },
            repulse: {
              distance: 200,
              duration: 1.2
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 4
            },
            trail: {
              delay: 0.1,
              quantity: 10
            }
          }
        },
        retina_detect: true,
        fps_limit: 120
      };
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadParticlesScript();
    });
  },
  beforeDestroy() {
    this.cleanup();
  },
  destroyed() {
    this.cleanup();
  },
  watch: {
    // Watch the entire content object for changes
    content: {
      handler() {
        if (this.particlesLoaded) {
          this.updateParticles();
        }
      },
      deep: true,
      immediate: true
    },
    // Watch specific properties for immediate reaction
    'content.particlesNumber': {
      handler() {
        if (this.particlesLoaded) {
          this.updateParticles();
        }
      },
      immediate: true
    },
    'content.particlesDensity': {
      handler() {
        if (this.particlesLoaded) {
          this.updateParticles();
        }
      },
      immediate: true
    },
    'content.particlesDensityArea': {
      handler() {
        if (this.particlesLoaded) {
          this.updateParticles();
        }
      },
      immediate: true
    },
    // Watch the computed config to update when it changes
    particlesConfig: {
      handler() {
        if (this.particlesLoaded) {
          this.updateParticles();
        }
      },
      deep: true
    }
  },
  methods: {
    loadParticlesScript() {
      // Check if script is already loaded
      if (window.particlesJS && this.scriptLoaded) {
        this.initParticles();
        return;
      }

      // Check if script is already being loaded by another instance
      const existingScript = document.querySelector('script[src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"]');
      if (existingScript) {
        if (window.particlesJS) {
          this.scriptLoaded = true;
          this.initParticles();
        } else {
          existingScript.addEventListener('load', () => {
            this.scriptLoaded = true;
            this.initParticles();
          });
        }
        return;
      }

      // Load the script
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
      script.async = true;
      script.onload = () => {
        this.scriptLoaded = true;
        this.$nextTick(() => {
          this.initParticles();
        });
      };
      script.onerror = (error) => {
        console.error('Failed to load particles.js script:', error);
      };
      document.head.appendChild(script);
    },
    initParticles() {
      // Safety checks
      if (!window.particlesJS) {
        console.warn('particles.js not loaded yet');
        return;
      }
      
      if (!this.$refs.particlesContainer) {
        console.warn('Particles container ref not available yet');
        return;
      }
      
      try {
        // Set ID on the container
        this.$refs.particlesContainer.id = this.containerId;
        
        // Initialize particles
        window.particlesJS(this.containerId, this.particlesConfig);
        
        this.particlesLoaded = true;
      } catch (err) {
        console.error('Error initializing particles:', err);
      }
    },
    updateParticles() {
      if (!this.$refs.particlesContainer) return;
      
      // Try to update the particles in place if possible
      if (window.pJSDom && Array.isArray(window.pJSDom)) {
        const instance = window.pJSDom.find(dom => dom.pJS.canvas.el.id === this.containerId);
        if (instance && instance.pJS) {
          try {
            // Direct update of particles number and density
            instance.pJS.particles.number.value = this.particlesConfig.particles.number.value;
            instance.pJS.particles.number.density.enable = this.particlesConfig.particles.number.density.enable;
            instance.pJS.particles.number.density.value_area = this.particlesConfig.particles.number.density.value_area;
            
            // Destroy and recreate particles
            instance.pJS.fn.particlesEmpty();
            instance.pJS.fn.particlesCreate();
            instance.pJS.fn.particlesDraw();
            
            return; // Successfully updated
          } catch (err) {
            console.error('Error updating particles:', err);
            // Fall back to full recreation if direct update fails
          }
        }
      }
      
      // Full recreation if update fails or instance not found
      this.cleanup();
      this.$nextTick(() => {
        this.initParticles();
      });
    },
    cleanup() {
      try {
        if (this.$refs.particlesContainer) {
          this.$refs.particlesContainer.innerHTML = '';
        }
        
        // Try to destroy particles instance if it exists
        if (window.pJSDom && Array.isArray(window.pJSDom)) {
          const instance = window.pJSDom.find(dom => dom.pJS.canvas.el.id === this.containerId);
          if (instance && instance.pJS) {
            instance.pJS.fn.vendors.destroypJS();
            window.pJSDom = window.pJSDom.filter(dom => dom.pJS.canvas.el.id !== this.containerId);
          }
        }
      } catch (err) {
        console.error('Error during cleanup:', err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.ww-particles-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
}
</style>
