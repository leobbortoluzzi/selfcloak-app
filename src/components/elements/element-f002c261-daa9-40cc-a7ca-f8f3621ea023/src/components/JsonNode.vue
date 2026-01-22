<template>
  <div class="json-node" :style="{ marginLeft: depth > 0 ? `${indentSize}px` : '0' }">
    <div class="json-line">
      <span 
        v-if="isExpandable" 
        class="json-toggle" 
        @click="toggleExpand"
        :class="{ 'expanded': isExpanded }"
      >
        {{ isExpanded ? '▼' : '►' }}
      </span>
      
      <template v-if="isObject">
        <span class="json-key" :style="keyStyle">{{ nodeKey }}</span>
        <span class="json-punctuation">: </span>
        <span class="json-bracket" :style="bracketStyle">{{ isArray ? '[' : '{' }}</span>
        <span v-if="!isExpanded" class="json-preview" :style="previewStyle">
          {{ getCollapsedPreview() }}
        </span>
        <span v-if="!isExpanded" class="json-bracket" :style="bracketStyle">{{ isArray ? ']' : '}' }}</span>
      </template>
      
      <template v-else>
        <span class="json-key" :style="keyStyle">{{ nodeKey }}</span>
        <span class="json-punctuation">: </span>
        <span :class="valueClass" :style="valueStyle">{{ formattedValue }}</span>
      </template>
    </div>
    
    <div v-if="isExpanded && isObject" class="json-children">
      <json-node
        v-for="(value, key) in data"
        :key="key"
        :data="value"
        :node-key="key"
        :depth="depth + 1"
        :indent-size="indentSize"
        :initial-expanded="initialExpanded && depth < 1"
        :theme="theme"
      />
      <div class="json-line" :style="{ marginLeft: '0px' }">
        <span class="json-bracket" :style="bracketStyle">{{ isArray ? ']' : '}' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'JsonNode',
  props: {
    data: {
      type: [Object, Array, String, Number, Boolean],
      required: true
    },
    nodeKey: {
      type: [String, Number],
      default: ''
    },
    depth: {
      type: Number,
      default: 0
    },
    indentSize: {
      type: Number,
      default: 20
    },
    initialExpanded: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      default: 'default'
    }
  },
  setup(props) {
    const isExpanded = ref(props.initialExpanded && props.depth < 2);
    
    const isObject = computed(() => 
      props.data !== null && 
      typeof props.data === 'object'
    );
    
    const isArray = computed(() => 
      Array.isArray(props.data)
    );
    
    const isExpandable = computed(() => 
      isObject.value && Object.keys(props.data || {}).length > 0
    );
    
    const formattedValue = computed(() => {
      if (props.data === null) return 'null';
      if (props.data === undefined) return 'undefined';
      
      switch (typeof props.data) {
        case 'string':
          return `"${props.data}"`;
        case 'number':
        case 'boolean':
          return String(props.data);
        default:
          return isArray.value ? '[]' : '{}';
      }
    });
    
    const valueClass = computed(() => {
      if (props.data === null) return 'json-null';
      
      switch (typeof props.data) {
        case 'string':
          return 'json-string';
        case 'number':
          return 'json-number';
        case 'boolean':
          return 'json-boolean';
        default:
          return '';
      }
    });
    
    // Theme styles
    const themeStyles = computed(() => {
      const themes = {
        default: {
          key: { color: '#8A6B99' },
          string: { color: '#CB7676' },
          number: { color: '#6994BF' },
          boolean: { color: '#B58451' },
          null: { color: '#B58451' },
          bracket: { color: '#8A6B99' },
          preview: { color: '#AAAAAA' }
        },
        dark: {
          key: { color: '#F8C555' },
          string: { color: '#F08D49' },
          number: { color: '#6994BF' },
          boolean: { color: '#FF8C00' },
          null: { color: '#FF8C00' },
          bracket: { color: '#F8C555' },
          preview: { color: '#777777' }
        },
        light: {
          key: { color: '#116329' },
          string: { color: '#0550AE' },
          number: { color: '#0550AE' },
          boolean: { color: '#CF222E' },
          null: { color: '#CF222E' },
          bracket: { color: '#24292F' },
          preview: { color: '#6E7781' }
        }
      };
      
      return themes[props.theme] || themes.default;
    });
    
    const keyStyle = computed(() => themeStyles.value.key);
    const valueStyle = computed(() => {
      if (props.data === null) return themeStyles.value.null;
      
      switch (typeof props.data) {
        case 'string':
          return themeStyles.value.string;
        case 'number':
          return themeStyles.value.number;
        case 'boolean':
          return themeStyles.value.boolean;
        default:
          return {};
      }
    });
    const bracketStyle = computed(() => themeStyles.value.bracket);
    const previewStyle = computed(() => themeStyles.value.preview);
    
    const toggleExpand = () => {
      isExpanded.value = !isExpanded.value;
    };
    
    const getCollapsedPreview = () => {
      if (!isObject.value) return '';
      
      const keys = Object.keys(props.data || {});
      if (keys.length === 0) return '';
      
      if (isArray.value) {
        return `${keys.length} ${keys.length === 1 ? 'item' : 'items'}`;
      } else {
        if (keys.length === 1) {
          return `1 property`;
        } else {
          return `${keys.length} properties`;
        }
      }
    };
    
    // Global expand/collapse handlers
    const handleExpandAll = () => {
      isExpanded.value = true;
    };
    
    const handleCollapseAll = () => {
      isExpanded.value = false;
    };
    
    onMounted(() => {
      document.addEventListener('json-viewer-expand-all', handleExpandAll);
      document.addEventListener('json-viewer-collapse-all', handleCollapseAll);
    });
    
    onBeforeUnmount(() => {
      document.removeEventListener('json-viewer-expand-all', handleExpandAll);
      document.removeEventListener('json-viewer-collapse-all', handleCollapseAll);
    });
    
    return {
      isExpanded,
      isObject,
      isArray,
      isExpandable,
      formattedValue,
      valueClass,
      toggleExpand,
      getCollapsedPreview,
      keyStyle,
      valueStyle,
      bracketStyle,
      previewStyle
    };
  }
};
</script>

<style lang="scss" scoped>
.json-node {
  position: relative;
}

.json-line {
  display: flex;
  align-items: center;
  min-height: 22px;
  white-space: nowrap;
}

.json-toggle {
  cursor: pointer;
  font-size: 10px;
  margin-right: 4px;
  user-select: none;
  width: 12px;
  display: inline-block;
  
  &.expanded {
    transform: rotate(0deg);
  }
}

.json-key {
  margin-right: 4px;
}

.json-punctuation {
  margin-right: 4px;
}

.json-string, .json-number, .json-boolean, .json-null {
  margin-right: 4px;
}

.json-preview {
  margin: 0 4px;
  opacity: 0.7;
  font-style: italic;
}

.json-children {
  position: relative;
}
</style>