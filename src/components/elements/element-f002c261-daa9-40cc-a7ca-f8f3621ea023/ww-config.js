export default {
  editor: {
    label: {
      en: 'JSON Viewer'
    },
    icon: 'code'
  },
  properties: {
    jsonData: {
      label: { en: 'JSON Data' },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: '{\n  "name": "John Doe",\n  "age": 30,\n  "isActive": true,\n  "address": {\n    "street": "123 Main St",\n    "city": "New York",\n    "country": "USA"\n  },\n  "tags": ["developer", "designer", "manager"],\n  "projects": [\n    {\n      "id": 1,\n      "name": "Website Redesign",\n      "completed": true\n    },\n    {\n      "id": 2,\n      "name": "Mobile App",\n      "completed": false\n    }\n  ]\n}',
    },
    theme: {
      label: { en: 'Color Theme' },
      type: 'TextSelect',
      section: 'settings',
      bindable: true,
      defaultValue: 'default',
      options: {
        options: [
          { value: 'default', label: 'Default' },
          { value: 'dark', label: 'Dark' },
          { value: 'light', label: 'Light' }
        ]
      },
    },
    initiallyExpanded: {
      label: { en: 'Initially Expanded' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
    },
    indentSize: {
      label: { en: 'Indent Size' },
      type: 'Number',
      section: 'settings',
      bindable: true,
      defaultValue: 20,
      options: {
        min: 10,
        max: 50,
        step: 2
      },
    },
    showControls: {
      label: { en: 'Show Controls' },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
    },
    backgroundColor: {
      label: { en: 'Background Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#ffffff',
    },
    textColor: {
      label: { en: 'Text Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#333333',
    },
    fontSize: {
      label: { en: 'Font Size' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '14px',
    },
    borderRadius: {
      label: { en: 'Border Radius' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '4px',
    },
    padding: {
      label: { en: 'Padding' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '16px',
    },
    showBorder: {
      label: { en: 'Show Border' },
      type: 'OnOff',
      section: 'style',
      bindable: true,
      defaultValue: true,
    },
    borderColor: {
      label: { en: 'Border Color' },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#e0e0e0',
      hidden: content => !content.showBorder,
    },
    maxHeight: {
      label: { en: 'Max Height' },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '',
    }
  },
  triggerEvents: [
    {
      name: 'expandAll',
      label: { en: 'On expand all' },
      event: {}
    },
    {
      name: 'collapseAll',
      label: { en: 'On collapse all' },
      event: {}
    },
    {
      name: 'copy',
      label: { en: 'On copy' },
      event: { success: true }
    }
  ],
  actions: [
    {
      action: 'expandAll',
      label: { en: 'Expand all' }
    },
    {
      action: 'collapseAll',
      label: { en: 'Collapse all' }
    },
    {
      action: 'copyToClipboard',
      label: { en: 'Copy to clipboard' }
    }
  ]
};