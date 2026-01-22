<template>
  <div class="json-viewer" :style="containerStyle">
    <div v-if="!isValidJson && jsonString" class="json-error">
      Invalid JSON format
    </div>
    <div v-else-if="!jsonString" class="json-empty">
      No JSON data provided
    </div>
    <div v-else class="json-content">
      <div class="json-controls" v-if="showControls">
        <button class="json-control-btn" @click="expandAll" :disabled="isEditing">Expand All</button>
        <button class="json-control-btn" @click="collapseAll" :disabled="isEditing">Collapse All</button>
        <button class="json-control-btn" @click="copyToClipboard" :disabled="isEditing">
          {{ copyButtonText }}
        </button>
      </div>
      <div class="json-tree-container" :style="{ fontSize: fontSize }">
        <json-node
          :data="parsedJson"
          :initial-expanded="initiallyExpanded"
          :indent-size="indentSize"
          :depth="0"
          :theme="theme"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, defineComponent } from 'vue';
import JsonNode from './components/JsonNode.vue';

export default defineComponent({
  name: 'JsonViewer',
  components: {
    JsonNode
  },
  props: {
    content: {
      type: Object,
      required: true
    },
    uid: {
      type: String,
      required: true
    },
  },
  setup(props) {
    // Editor state
    const isEditing = computed(() => {
      // eslint-disable-next-line no-unreachable
      return false;
    });

    // Parse JSON data
    const jsonString = computed(() => props.content?.jsonData || '');
    const parsedJson = ref(null);
    const isValidJson = ref(true);

    // Copy to clipboard functionality
    const copyButtonText = ref('Copy');
    const copyToClipboard = () => {
      if (isEditing.value) return;
      
      try {
        const textToCopy = typeof props.content?.jsonData === 'string' 
          ? props.content.jsonData 
          : JSON.stringify(props.content?.jsonData || {}, null, 2);
        
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        copyButtonText.value = 'Copied!';
        setTimeout(() => {
          copyButtonText.value = 'Copy';
        }, 2000);
      } catch (error) {
        copyButtonText.value = 'Failed to copy';
        setTimeout(() => {
          copyButtonText.value = 'Copy';
        }, 2000);
      }
    };

    // Expand/collapse functionality
    const expandAll = () => {
      if (isEditing.value) return;
      const event = new CustomEvent('json-viewer-expand-all');
      document.dispatchEvent(event);
    };

    const collapseAll = () => {
      if (isEditing.value) return;
      const event = new CustomEvent('json-viewer-collapse-all');
      document.dispatchEvent(event);
    };

    // Parse JSON when data changes
    const parseJson = () => {
      try {
        if (!jsonString.value) {
          parsedJson.value = null;
          isValidJson.value = true;
          return;
        }

        if (typeof jsonString.value === 'object') {
          parsedJson.value = jsonString.value;
          isValidJson.value = true;
          return;
        }

        parsedJson.value = JSON.parse(jsonString.value);
        isValidJson.value = true;
      } catch (error) {
        parsedJson.value = null;
        isValidJson.value = false;
      }
    };

    watch(() => props.content?.jsonData, parseJson, { immediate: true });

    // Styling
    const containerStyle = computed(() => ({
      backgroundColor: props.content?.backgroundColor || '#ffffff',
      color: props.content?.textColor || '#333333',
      borderRadius: props.content?.borderRadius || '4px',
      padding: props.content?.padding || '16px',
      border: props.content?.showBorder ? `1px solid ${props.content?.borderColor || '#e0e0e0'}` : 'none',
      maxHeight: props.content?.maxHeight || 'auto',
      overflow: props.content?.maxHeight ? 'auto' : 'visible'
    }));

    return {
      isEditing,
      parsedJson,
      isValidJson,
      jsonString,
      copyButtonText,
      copyToClipboard,
      expandAll,
      collapseAll,
      containerStyle,
      showControls: computed(() => props.content?.showControls !== false),
      initiallyExpanded: computed(() => props.content?.initiallyExpanded !== false),
      indentSize: computed(() => props.content?.indentSize || 20),
      fontSize: computed(() => props.content?.fontSize || '14px'),
      theme: computed(() => props.content?.theme || 'default')
    };
  }
});
</script>

<style lang="scss" scoped>
.json-viewer {
  font-family: 'Monaco', 'Menlo', 'Consolas', 'Courier New', monospace;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
}

.json-error {
  color: #e53935;
  padding: 10px;
  border: 1px dashed #e53935;
  border-radius: 4px;
}

.json-empty {
  color: #9e9e9e;
  padding: 10px;
  font-style: italic;
}

.json-controls {
  margin-bottom: 10px;
  display: flex;
  gap: 8px;
}

.json-control-btn {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #e0e0e0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.json-tree-container {
  overflow: auto;
}
</style>