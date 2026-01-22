export default {
  editor: {
    label: {
      en: "Particles",
    },
    icon: "particles",
    customSettingsPropertiesOrder: [
      'particlesNumber',
      'particlesDensity',
      'particlesDensityArea'
    ]
  },
  properties: {
    // The properties are hardcoded in the component for now
    // We'll expose them in the future if needed
    particlesNumber: {
      label: {
        en: "Number of particles",
      },
      type: "Number",
      section: "settings",
      bindable: true,
      defaultValue: 200,
    },
    particlesDensity: {
      label: {
        en: "Enable density",
      },
      type: "OnOff",
      section: "settings",
      bindable: true,
      defaultValue: true,
    },
    particlesDensityArea: {
      label: {
        en: "Density area",
      },
      type: "Number",
      section: "settings",
      bindable: true,
      defaultValue: 800,
    }
  },
};
