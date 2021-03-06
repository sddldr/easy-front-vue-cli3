// 自动加载 global 目录下的 .js 结尾的文件（全局组件）

import Vue from 'vue';
import { upperFirst, camelCase } from 'lodash-es';

const requireComponent = require.context('./global', true, /[\w-]+\.(vue|js)$/);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName),
    // Get the PascalCase version of the component name
    componentName = upperFirst(
      camelCase(
        fileName
          // Remove the "./_" from the beginning
          .replace(/^\.\/_/, '')
          // Remove the file extension from the end
          .replace(/\.\w+$/, '')
      )
    );
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  // Globally register the component
  console.log('component name: ', componentName);
  Vue.component(componentName, componentConfig.default || componentConfig);
});
